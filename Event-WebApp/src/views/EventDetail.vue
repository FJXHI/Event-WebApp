<template>
  <div v-if="isLoading" class="loading-message">
    <p>Lade Event-Daten...</p>
  </div>

  <div v-else-if="performance" class="event-detail-view">
    <BackBtn />
    <div class="event-detail-time">
      <h5>
        {{ formatDateTime(performance.start_time, 'Time') }} – 
        {{ formatDateTime(performance.end_time, 'Time') }},
        {{ formatDateTime(performance.start_time, 'Date Long') }}
      </h5>     
    </div>
    <div class="event-detail-title">
      <h3>
        {{ performance.name }} mit
        <span v-for="(act, index) in performance.acts" :key="act.id">
          {{ act.name }}
          <span v-if="index < performance.acts.length - 1">, </span>
        </span>
      </h3>
      <FavoriteButton :itemId="String(performance.id)" itemType="event" />
    </div>
    <router-link 
      :to="'/location/' + (performance.stage['id-name'] && performance.stage['id-name'].trim() !== '' ? performance.stage['id-name'] : performance.stage.id)"
      class="event-detail-geo">
      <h4>&#x1F4CD;{{ performance.stage.name }}</h4>
    </router-link>
    <div class="event-detail-body">      
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
    </div>
    <p> {{ performance.description || 'Keine Beschreibung verfügbar' }}</p>
    <p v-if="performance?.url">
      <a :href="performance.url" target="_blank" rel="noopener noreferrer">
        {{ performance.url.replace(/^(https?:\/\/)?(www\.)?/, '') }}
      </a>
    </p>
    <!-- <p><strong>More:</strong> {{ performance }}</p> -->
  </div>

  <div v-else>
    <p>Das Event konnte nicht gefunden werden.</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { formatDateTime } from '@/config.ts';
import { useEventData } from '@/useEventData.ts';
import { computed } from 'vue';
import BackBtn from '@/components/BackBtn.vue';
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
.event-detail-view {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

h3, h4 {
  color: #333;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
