<template>
  <div v-if="isLoading" class="loading-message">
    <p>Lade Event-Daten...</p>
  </div>

  <div v-else-if="performance" class="event-detail-view detail-view">
    <div class="detail-space"></div>
    <div class="detail-header">
      <div class="event-detail-time">
        <h4>
          {{ formatDateTime(performance.start_time, 'Time') }} – 
          {{ formatDateTime(performance.end_time, 'Time') }},
          {{ formatDateTime(performance.start_time, 'Date Long') }}
        </h4>     
      </div>
      <FavoriteButton :itemId="String(performance.id)" itemType="event" class="detail-view-favBtn"/>
      <div class="detail-title">
        <h3>
          <template v-if="performance.name">
            {{ performance.name }}
          </template>
          <template v-else-if="performance.acts.length">
            <span v-for="(act, index) in performance.acts" :key="act.id">
              {{ act.name }}<span v-if="index < performance.acts.length - 1">, </span>
            </span>
          </template>
          <template v-else>
            Unknown Name
          </template>
        </h3>
      </div>
      <OvalLink :link="'/location/' + (performance.stage['id-name']?.trim() ? performance.stage['id-name'] : performance.stage.id)"
           :icon="IconGeo"
           :name="performance.stage.name" />
    </div>
    <div class="detail-content">
      <div v-for="(act, index) in performance.acts" :key="act.id" class="list-item-obj">
        <router-link 
          :to="'/act/' + (act['id-name'] && act['id-name'].trim() !== '' ? act['id-name'] : act.id)" 
          class="list-item-link">
          <div class="list-item-info">
            <strong class="list-item-name">{{ act.name }}</strong>
          </div>
        </router-link>
        <FavoriteButton :itemId="String(act.id)" itemType="act" class="list-item-fav-btn" />
      </div>
      <div class="detail-content-text">
        <p> {{ performance.description || 'Keine Beschreibung verfügbar' }}</p>
        <p v-if="performance?.url">
          <a :href="performance.url" target="_blank" rel="noopener noreferrer">
            {{ performance.url.replace(/^(https?:\/\/)?(www\.)?/, '') }}
          </a>
        </p>
        <!-- <p><strong>More:</strong> {{ performance }}</p> -->
      </div>
    </div>
  </div>
  <div v-else>
    <p>{{ $t('event') }} {{ $t('not-found') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { formatDateTime } from '@/config.ts';
import { useEventData } from '@/useEventData.ts';
import { computed } from 'vue';
import IconGeo from '@/components/icons/IconGeo.vue';
import OvalLink from '@/components/OvalLink.vue';
import FavoriteButton from '@/components/FavBtn.vue';
import type { Act, Stage, Performance } from '@/useEventData.ts';

const route = useRoute();
const { performances, stages, acts, isLoading } = useEventData();

// Define an extended type for the performance with Acts and Stage
interface ExtendedPerformance extends Omit<Performance, 'actsIDArr' | 'stageID'> {
  acts: Act[];
  stage: Stage;
}

const performance = computed<ExtendedPerformance | null>(() => {
  const performanceId = route.params.id;
  
  const selectedPerformance = performances.value.find((perf) => 
    perf.id === Number(performanceId) || perf['id-name'] === performanceId
  );

  if (!selectedPerformance) return null;

  const actsList: Act[] = (selectedPerformance.actsIDArr ?? []).map((actId) => 
    acts.value.find((act) => act.id === actId)!
  ).filter(Boolean);

  const stage = stages.value.find((s) => s.id === selectedPerformance.stageID) || { id: 0, name: 'Unknown', 'id-name': '' };

  return {
    ...selectedPerformance,
    acts: actsList,
    stage,
  };
});
</script>

<style scoped>
/*
.list-item-obj {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: white;
  border-radius: 6px;
  margin-top: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list-item-name {
  font-weight: bold;
  font-size: 1.1rem;
}

.list-item-fav-btn {
  background: white;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
}*/
</style>
