<!-- FavoritesView.vue -->
<!-- This view shows the user's favorite acts, stages, and events. -->

<template>
  <div>
    <h2 class="text-xl font-bold">{{ $t('my') }} {{ $t('favorites') }}</h2>

    <div class="center">
      <ul>
        <LinkItem to="/acts" :icon="IconActs" title="nav-acts" subtext="nav-acts-subtext" />
      </ul>
    </div>
    <div v-if="favoriteActs.length">
      <ActList :filter="'act'" :filterID="favoriteActs.map(act => act.id)" />
    </div>
    <div v-else>
      <p>{{ $t('no-act-fav') }}</p>
    </div>
    
    <div class="center">
      <ul>
        <LinkItem to="/locations" :icon="IconGeo" title="nav-locations" subtext="nav-locations-subtext" /><!-- TODO: Count Stages -->
      </ul>
    </div>
    <div v-if="favoriteStages.length">
      <LocationList :filter="'location'" :filterID="favoriteStages.map(stage => stage.id)" />
    </div>
    <div v-else>
      <p>{{ $t('no-stage-fav') }}</p>
    </div>

    <div class="center">
      <ul>
        <LinkItem to="/programm" :icon="IconClock" title="nav-timetable" subtext="" />
      </ul>
    </div>
    <div v-if="favoriteEvents.length">
      <ProgrammList :filter="'event'" :filterID="favoriteEvents.map(performance => performance.id.toString())" class="ProgrammList" />
    </div>
    <div v-else>
      <p>{{ $t('no-event-fav') }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useEventData } from '@/useEventData.ts';
import LinkItem from '@/components/LinkItem.vue';
import IconActs from '@/components/icons/IconPeople.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconGeo from '@/components/icons/IconGeo.vue';
import ProgrammList from '@/components/ProgrammList.vue';
import LocationList from '@/components/LocationList.vue';
import ActList from '@/components/ActList.vue';

// Load data from composable
const { acts, stages, performances } = useEventData();

// Load favorite data from local storage
const favoriteActs = computed(() => {
  const favoriteActIds = JSON.parse(localStorage.getItem('act')) || [];

  // wait until data is loaded
  if (!acts.value || acts.value.length === 0) {
    console.warn("Acts data not available yet!");
    return [];
  }

  return acts.value.filter(act => favoriteActIds.includes(act.id.toString()));
});


const favoriteStages = computed(() => {
  const favoriteStageIds = JSON.parse(localStorage.getItem('stage')) || [];
  
  // wait until data is loaded
  if (!stages.value || stages.value.length === 0) {
    console.warn("Stages data not available yet!");
    return [];
  }

  return stages.value.filter(stage => favoriteStageIds.includes(stage.id.toString()));
});

const favoriteEvents = computed(() => {
  const favoriteEventIds = JSON.parse(localStorage.getItem('event')) || [];

  // wait until data is loaded
  if (!performances.value || performances.value.length === 0) {
    console.warn("Performances data not available yet!");
    return [];
  }

  const filtered = performances.value.filter(performance => 
    favoriteEventIds.includes(performance.id.toString())
  );
  return filtered;
});
</script>

<style scoped>
/* Need for LinkItem.vue */
.center {
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  margin-top: auto;
}

.center ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>  