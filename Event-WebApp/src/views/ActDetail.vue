<!-- ActDetail.vue -->
<!-- This displays the details of an act -->

<template>
  <div v-if="act" class="full-height detail-view">
    <div class="detail-space"></div>
    <div class="detail-header">
      <img 
        v-if="act.image?.trim()" 
        :src="act.image.startsWith('http') ? act.image : baseUrl + act.image"
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

    <div class="detail-content full-height">
      <div class="detail-content-text">
        <p>{{ act.description }}</p>
        <p>
          <TagLabel 
            v-for="(tag, index) in act.tags.filter(tag => tag.visible)" 
            :key="index"
            :name=tag.name
            class="tag-label-item"
          />
        </p>
        <p>
          <TagLabel 
            v-for="(type, index) in act['act-type']" 
            :key="index"
            :name=type
            class="tag-label-item"
          />
        </p>

        <ul class="detail-social-media">
          <SocialMediaLink
            v-for="link in act.weblinks"
            :key="link.url"
            :name="link.name"
            :url="link.url"
          />
        </ul>
      </div>
      <div class="detail-line"></div>
      <ScheduleListItem :filters="{
        ...eventFilters, actIDs: [String(act.id)] 
      }" />

    </div>
  </div>

  <div v-else>
    <p>{{ $t('act') }} {{ $t('not-found') }}</p>
  </div>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { baseUrl, eventFilters } from '@/scripts/functions';
import { useEventData } from '@/scripts/useEventData';
import ScheduleListItem from '@/components/ScheduleListItem.vue';
import SocialMediaLink from '@/components/SocialMediaLink.vue';
import FavoriteButton from '@/components/FavBtn.vue';
import TagLabel from '@/components/TagLabel.vue';

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

<style>
.detail-social-media {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}


</style>