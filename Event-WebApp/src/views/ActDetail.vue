<!-- ActDetail.vue -->
<!-- This displays the details of an act -->

<template>
  <div v-if="act" class="detail-view">
    <div class="detail-space"></div>
    <div class="detail-header">
      
      <img 
        v-if="act.image?.trim()" 
        :src="baseUrl + 'images/' + act.image" 
        class="act-detail-view-img"
        @error="event => (event.target as HTMLImageElement).remove()"
      />

      <!-- With Default Image --
      <img
        :src="baseUrl + 'images/' + (act.image && act.image.trim() !== '' ? act.image : 'default-image.jpg')" 
        alt="Act Image"
        class="act-detail-view-img"
      />-->
      <FavoriteButton :itemId="String(act.id)" itemType="act" class="detail-view-favBtn" />

      <div class="detail-title">
        <h3>{{ act.name }}</h3>
        <h4 v-if="act.subname">{{ act.subname }}</h4>
      </div>
    </div>

    <div class="detail-content">
      <div class="detail-content-text">
        <p>{{ act.description }}</p>
        <p>
          <strong>{{ $t('genre') }}: </strong> 
          <span v-for="(tag, index) in act.tags.filter(tag => tag.visible)" :key="index">
            {{ tag.name }}<span v-if="index < act.tags.filter(tag => tag.visible).length - 1">, </span>
          </span>
        </p>

        <li v-for="link in act.weblinks" :key="link.url">
            <a :href="link.url" target="_blank" rel="noopener noreferrer">
              {{ link.name }}
            </a>
        </li>
      </div>
      
      <ProgrammList filter="act" :filterID="[String(act.id)]" />
    </div>
  </div>

  <div v-else>
    <p>{{ $t('act') }} {{ $t('not-found') }}</p>
  </div>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { baseUrl } from '@/config.ts';
import { useEventData } from '@/useEventData.ts';
import ProgrammList from '@/components/ProgrammList.vue';
import FavoriteButton from '@/components/FavBtn.vue';


const route = useRoute();
const { acts, performances, stages } = useEventData();

// calculate the current act
const act = computed(() => {
  // Check if the data is loaded
  if (!acts.value || !performances.value || !stages.value) return null;

  const actId = route.params.id as string; // actId is a string (from the URL)
  
  const selectedAct = acts.value.find(
    (act) => act['id-name'] === actId || act.id.toString() === actId
  );

  if (!selectedAct) return null;

  return {
    ...selectedAct,
    performances: performances.value
      .filter((perf) => perf.actsIDArr.includes(selectedAct.id))
      .map((perf) => ({
        ...perf,
        stage: stages.value.find((stage) => stage.id === perf.stageID) || null,
    })),
  };
});

</script>