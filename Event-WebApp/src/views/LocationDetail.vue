<template>
  <div v-if="stage" class="location-detail-view">
    <h3>{{ stage.name }}</h3>
    <img v-if="stage.image" :src="baseUrl + 'images/' + stage.image" :alt="stage.name" class="location-image" />

    {{ stage.description }}
    {{ stage['short-description'] }}
    <p><strong>Adresse:</strong> {{ stage.address }}</p>
    {{ stage.location }}

    <p><strong>Beschreibung:</strong> {{ stage.description }}</p>

    <FavoriteButton :itemId="String(stage.id)" itemType="stage" />

    <h4>Auftritte an diesem Ort:</h4>
    <ProgrammList filter="location" :filterID="[String(stage.id)]" class="ProgrammList" />
    <BackBtn />
  </div>

  <div v-else>
    <p>Dieser Ort wurde nicht gefunden.</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { baseUrl } from '@/config.ts';
import { useEventData } from '@/useEventData.ts';
import BackBtn from '@/components/BackBtn.vue';
import ProgrammList from '@/components/ProgrammList.vue';
import FavoriteButton from '@/components/FavBtn.vue';

const route = useRoute();
const { stages, performances, acts } = useEventData();

const stage = computed(() => {
  const stageId = route.params.id;
  const selectedStage = stages.value.find(
    stage => stage['id-name'] === route.params.id || stage.id === Number(route.params.id)
  );

  if (selectedStage) {
    // Find all performances for the selected stage
    const stagePerformances = performances.value
      .filter(perf => perf.stageID === selectedStage.id) 
      .map(perf => ({
        ...perf,
        act: acts.value.find(act => act.id === perf.actsIDArr[0]), // ERROR-FIX Why we need this here?
      }));

    return { ...selectedStage, performances: stagePerformances };
  }

  return null;
});
</script>

<style scoped>
.location-detail-view {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.location-image {
  max-width: 300px;
  border-radius: 5px;
  margin-top: 10px;
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
