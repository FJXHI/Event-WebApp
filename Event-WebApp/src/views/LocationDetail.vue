<template>
  <div v-if="stage"
    class="detail-view-background"
    :style="{
      '--bg-image': stage.image ? `url(${baseUrl + 'images/' + stage.image})` : 'none',
      '--fallback-bg': stage.image ? 'transparent' : '#ccc'
    }">

    <div class="detail-view">
      <div class="detail-view-head">
        <div class="detail-view-title">
          <h3 class="detail-view-name">{{ stage.name }}</h3>
          <FavoriteButton :itemId="String(stage.id)" itemType="stage" class="detail-view-favBtn"/>
        </div>
        <p><strong>{{ formatAddress(stage.address, 'noCountry') }}</strong></p>
        <div class="location-gps">{{ stage.location }}</div>
      </div>
      <div class="detail-view-body">
        <p>{{ stage.description || 'Keine Beschreibung verfügbar' }}</p>
      </div>
      <h4>Auftritte an diesem Ort:</h4>
      <ProgrammList filter="location" :filterID="[String(stage.id)]" />
      <BackBtn />
    </div>
  </div>
  <div v-else>
    <p>Dieser Ort wurde nicht gefunden.</p>
  </div>  
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { baseUrl, formatAddress } from '@/config.ts';
import { useEventData } from '@/useEventData.ts';
import BackBtn from '@/components/BackBtn.vue';
import ProgrammList from '@/components/ProgrammList.vue';
import FavoriteButton from '@/components/FavBtn.vue';

const route = useRoute();
const { stages, performances, acts } = useEventData();

const stage = computed(() => {
  //const stageId = route.params.id;
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
.detail-view {
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

/*
.detail-view-background {
  position: relative;
  width: 100%;
  min-height: 25vh;
  background: var(--fallback-bg, #ccc);
  background-image: var(--bg-image);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5vw;
  box-sizing: border-box;
}

.detail-view {
  background: #fff;
  border-radius: 2vw;
  box-shadow: 0 2vw 5vw rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 90vw;
  box-sizing: border-box;
}

.detail-view-head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vw;
  border-radius: 2vw 2vw 0 0;
  margin-bottom: 2vw;
  background: thistle;
  padding: 2vw;
}

.detail-view-title {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
}

.detail-view-name {
  font-size: 5vw;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
}

.detail-view-favBtn {
  right: 0;
}

.detail-view p {
  font-size: 3.5vw;
  line-height: 1.4;
}

.location-gps, .detail-view-address {
  font-size: 3vw;
  color: #666;
}

.detail-view-body {
  padding-left: 2vw;
  padding-right: 2vw;
}

h4 {
  margin-top: 5vw;
  font-size: 4vw;
  border-bottom: 0.5vw solid #ddd;
  padding-bottom: 1vw;
}
*/
/*
.detail-view {
  margin-top: 50px;
  max-width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  color: #333;
}

.detail-view-head {
  text-align: center;
  position: relative;
}

.detail-view-img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.detail-view-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.detail-view p {
  font-size: 1rem;
  line-height: 1.4;
}

.location-gps {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 12px;
}

.detail-view-favBtn {
  position: absolute;
  top: -20px;
  right: 10px;
}

.detail-view-body {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 25px;
}

h4 {
  margin-top: 16px;
  font-size: 1.2rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 4px;
}*/

</style>