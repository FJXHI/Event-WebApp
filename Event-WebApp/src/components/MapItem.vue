<template>
  <div class="filter-buttons">
    <button @click="toggleStages" :class="{ active: showStages }">
      {{ $t('stages') }}
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

  <l-map
    @ready="onMapReady"
    :center="mapCenter"
    :zoom="zoom"
    style="height: 500px"
  ><!-- ERROR-FIX Fix l-map auto height -->
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />

    <!-- Stage Markers -->
    <l-marker v-if="showStages" v-for="(stage, index) in stages" :key="stage.id" :lat-lng="stage.location">
      <l-popup>
        <router-link :to="'/location/' + (stage['id-name'] || stage.id)" target="_blank">
          <strong>{{ stage.name }}</strong>
        </router-link>
      </l-popup>
    </l-marker>

    <!-- Filtered POI Markers -->
    <l-marker
      v-for="(item, index) in filteredMapData"
      :key="'map-' + item.id"
      :lat-lng="item.location"
      v-if="!isLoading"
    >
      <l-popup>
        <strong>{{ item.name }}</strong><br />
        <em>{{ item.kategori }}</em>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import { useRoute } from "vue-router";
import { useEventData } from "@/scripts/useEventData";
import { useMapData } from "@/scripts/useMapData";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const route = useRoute();
const { stages } = useEventData();
const { mapData, isLoading } = useMapData();

const mapInstance = ref<L.Map | null>(null);
const mapCenter = ref<[number, number]>([50.9375, 6.9603]);
const zoom = ref<number>(16);
const showStages = ref<boolean>(true);
const selectedCategories = ref<string[]>([]);
const markerRefs = ref([]);

const fitMapToStages = (map: L.Map) => {

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
  fitMapToStages(map);

  if (route.query.stage) {
    selectMarker(route.query.stage as string);
  }
};


// Check if stages are loaded and adjust map
watchEffect(() => {
  if (!mapInstance.value || stages.value.length === 0) return;

  if (route.query.stage) {
    selectMarker(route.query.stage as string);
  } else {
    fitMapToStages(mapInstance.value);
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

.filter-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

button {
  padding: 8px 12px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

button.active {
  background: #007bff;
  color: white;
  border-color: #0056b3;
}
</style>
