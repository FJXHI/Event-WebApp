<!-- MapItem.vue -->
<!-- View for displaying a map with stages and points of interest (POIs) -->
<!-- ERROR-FIX 
      -Auto height of map not really work.
      -Button Design with theme color, maybe use Btn Design from other components.
      -->
<!-- NO scrolling allowed --> 

<template>
  <div class="map-view full-height">
    <div class="filter-buttons">
      <button @click="fitMap()">{{ $t('map-center') }}</button>
      <button
        v-for="(stages, type) in groupedStages"
        :key="type"
        @click="toggleStageType(type)"
        :class="{ active: isStageTypeVisible(type) }"
      >
        <template v-if="type === 'stage'">{{ $t('stages') }}</template>
        <template v-else-if="type === 'workshop'">{{ $t('workshop') }}</template>
        <template v-else>{{ type }}</template>
      </button>
      <button
        v-for="category in categories"
        :key="category"
        @click="toggleCategory(category)"
        :class="{ active: selectedCategories.includes(category) }"
      >
        {{ category }}
      </button>
    </div>
    <div class="map-container">
      <l-map
        @ready="onMapReady"
        :center="mapCenter"
        :zoom="zoom"
        class="map-area"
        
      ><!-- ERROR-FIX Fix l-map auto height (style="height: 500px")
        Maybe map should be fixed at the bottom. -->
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <!-- Stage Markers -->
        <template v-if="showStages">
          <template v-for="(group, type) in groupedStages" :key="type">
            <l-marker
              v-for="stage in group"
              :key="stage.id"
              :lat-lng="stage.location"
              v-if="isStageTypeVisible(type)"
            >
              <l-popup>
                <router-link :to="'/location/' + (stage['id-name'] || stage.id)" target="_blank">
                  <strong>{{ stage.name }}</strong>
                </router-link>
              </l-popup>
            </l-marker>
          </template>
        </template>

        <!-- Filtered POI Markers -->
        <l-marker
          v-for="(item, index) in filteredMapData"
          :key="'map-' + item.id"
          :lat-lng="item.location"
          v-if="!isLoading"
        >
          <l-popup>
            <strong>{{ item.name }}</strong><br />
            <em>{{ item.kategori }}</em><br />
            <em>{{ item.description }}</em>
            <div v-if="item.openingTimes?.length">
              <li v-for="(time, index) in item.openingTimes" :key="index">
                  {{ formatDateTime(time.from, 'Date Short Time') }} –
                  {{ formatDateTime(time.to, 'Time') }}
                  <span v-if="time.note"> {{ time.note }}</span>
                </li>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import { useRoute } from "vue-router";
import { formatDateTime } from "@/scripts/functions";
import { useEventData } from "@/scripts/useEventData";
import { useMapData } from "@/scripts/useMapData";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { LocateControl } from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import * as L from 'leaflet';

const route = useRoute();
const { stages } = useEventData();
const { mapData, isLoading } = useMapData();

const mapInstance = ref<L.Map | null>(null);
const mapCenter = ref<[number, number]>([50.840158, 12.915234]);
const zoom = ref<number>(16);
const showStages = ref<boolean>(true);
const selectedCategories = ref<string[]>([]);
const markerRefs = ref([]);

const fitMap = (mapParam?: L.Map) => {
  // Check if map instance is available
  const map = mapParam ?? mapInstance.value;
  if (!map) return;

  // Return if no stages available, using default view
  if (!stages.value.length && !mapData.value.length) {
    map.setView(mapCenter.value, zoom.value);
    return;
  }
  const allLocations = [
    ...stages.value.map(stage => stage.location as [number, number]),
    ...mapData.value
      .filter(item => !item.noinclude) // Filter out items with "noinclude"
      .map(item => item.location as [number, number]),
  ];
  const bounds = L.latLngBounds(allLocations);
  map.fitBounds(bounds, { padding: [50, 50] });
};

const toggleStages = () => {
  showStages.value = !showStages.value;
};

const toggleCategory = (category: string) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== category);
  } else {
    selectedCategories.value.push(category);
  }
};

const visibleStageTypes = ref<string[]>(['stage']);

const toggleStageType = (type: string) => {
  if (visibleStageTypes.value.includes(type)) {
    visibleStageTypes.value = visibleStageTypes.value.filter(t => t !== type);
  } else {
    visibleStageTypes.value.push(type);
  }
};

const isStageTypeVisible = (type: string) => {
  return visibleStageTypes.value.includes(type);
};

const groupedStages = computed(() => {
  const groups: Record<string, typeof stages.value> = {};
  for (const stage of stages.value) {
    const type = stage.type || "Sonstige";
    if (!groups[type]) groups[type] = [];
    groups[type].push(stage);
  }
  return groups;
});

const categories = computed(() => {
  const allCategories = mapData.value.map(item => item.kategori);
  return [...new Set(allCategories)];
});

const filteredMapData = computed(() => {
  if (selectedCategories.value.length === 0) return mapData.value;
  return mapData.value.filter(item => selectedCategories.value.includes(item.kategori));
});

const selectMarker = (stageId: string) => {
  if (!mapInstance.value) return;
  const stage = stages.value.find(s => s.id.toString() === stageId);
  
  // Return if stage not found
  if (!stage) { return; }

  const latLng = stage.location as [number, number];
  // Fly to marker // Smooth Animation
  mapInstance.value.flyTo(latLng, 18, { duration: 1 }); 

  // Create marker and open popup
  L.marker(latLng).addTo(mapInstance.value)
    .bindPopup(`<strong>${stage.name}</strong>`)
    .openPopup();
};

const onMapReady = (map: L.Map) => {
  mapInstance.value = map;
  fitMap(map);

  if (route.query.stage) {
    selectMarker(route.query.stage as string);
  }

  // Prevent Build Error: "TS2339: Property 'addTo' does not exist on type 'LocateControl'."
  // @ts-ignore
  new LocateControl().addTo(map);
};


// Check if stages are loaded and adjust map
watchEffect(() => {
  if (!mapInstance.value || stages.value.length === 0) return;

  if (route.query.stage) {
    selectMarker(route.query.stage as string);
  } else {
    fitMap(mapInstance.value);
  }
});

</script>

<style>
.leaflet-popup-content a {
  pointer-events: auto;
}

.leaflet-container {
  z-index: 500;
}

.map-view {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 90vh ; /* 600px maybe 90vh? */
}

.map-container {
  overflow: hidden;
}

.map-area {
  height: 100%;
  width: 100%;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  padding: 0.25rem;
  gap: 0.25rem;
}

button {
  padding: 8px 12px;
  border: none;
  background: var(--btn-normal-bg);
  color: var(--btn-normal-text);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

button.active {
  background: var(--btn-active-bg);
  color: var(--btn-active-text);
  border: none;
}

.leaflet-control-locate a .leaflet-control-locate-location-arrow {
  margin: 4.5px; /* originally & default 7px */
  /* Adjust the margin to position the arrow*/
}


</style>
