<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useEventData } from '@/useEventData.ts';
import { computed } from 'vue';
import BackBtn from '@/components/BackBtn.vue';
import FavoriteButton from '@/components/FavBtn.vue';
import type { Act, Stage, Performance } from '@/useEventData.ts';

const route = useRoute();
const { performances, stages, acts, isLoading } = useEventData();

// Definiere einen erweiterten Typ für die Performance mit Acts und Stage
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


<template>
  <div v-if="isLoading" class="loading-message">
    <p>Lade Event-Daten...</p>
  </div>

  <div v-else-if="performance" class="event-detail-view">
    <BackBtn />
    <h5>{{ performance.date }} -- {{ performance.start_time }} -- {{ performance.start_time }}</h5>
    <h3>
      {{ performance.name }} mit
      <span v-for="(act, index) in performance.acts" :key="act.id">
        {{ act.name }}
        <span v-if="index < performance.acts.length - 1">, </span>
      </span>
      <FavoriteButton :itemId="String(performance.id)" itemType="event" />
    </h3>
    
    <router-link :to="'/act/' + (performance.stage['id-name'] && performance.stage['id-name'].trim() !== '' ? performance.stage['id-name'] : performance.stage.id)">
      <h4>&#x1F4CD;{{ performance.stage.name }}</h4>
    </router-link>
    <span v-for="(act, index) in performance.acts" :key="act.id">
        <router-link :to="'/act/' + (act['id-name'] && act['id-name'].trim() !== '' ? act['id-name'] : act.id)">
          {{ act.name }}
        </router-link>
        <span v-if="index < performance.acts.length - 1">, </span>
    </span>
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
