<!-- ActDetail.vue -->
<!-- This displays the details of an act -->

<template>
  <div v-if="act" class="full-height detail-view">
    <div class="detail-space"></div>
    <div class="detail-header">
      <ItemDetailImg :image="act.image" />
      <FavoriteButton :itemId="String(act.id)" itemType="act" class="detail-view-favBtn" />

      <div class="detail-title">
        <h3>{{ act.name }}</h3>
        <h4 v-if="act.subname">{{ act.subname }}</h4>
        <Countdown v-if="nextPerformance" :time="nextPerformance.start_time" />
      </div>
    </div>

    <div class="detail-content full-height scroll-head">
      <div class="scroll-y-area">
        <div class="detail-content-text">
          <ExpandableText :text="act.description" />
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
  </div>

  <div v-else>
    <p>{{ $t('act') }} {{ $t('not-found') }}</p>
  </div>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { baseUrl, eventFilters, getNextPerformance } from '@/scripts/functions';
import { useEventData } from '@/scripts/useEventData';
import ScheduleListItem from '@/components/ScheduleListItem.vue';
import SocialMediaLink from '@/components/SocialMediaLink.vue';
import FavoriteButton from '@/components/FavBtn.vue';
import TagLabel from '@/components/TagLabel.vue';
import Countdown from '@/components/Countdown.vue';
import ItemDetailImg from '@/components/ItemDetailImg.vue';
import ExpandableText from '@/components/ExpandableText.vue';

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
    performances: (performances.value || [])
      .filter((perf) => perf.actsIDArr.includes(selectedAct.id))
      .map((perf) => ({
        ...perf,
        stage: stages.value.find((stage) => stage.id === perf.stageID) || null,
    })),
  };
});

const nextPerformance = computed(() =>
  act.value ? getNextPerformance(act.value.performances) : null
);

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