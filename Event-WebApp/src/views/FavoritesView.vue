<!-- FavoritesView.vue -->
<!-- This view shows the user's favorite acts, stages, and events. -->
<!-- ERROR-FIX Do not work at the momemt, becaus of change in filterID type in ProgrammList.vue -->

<template>
  <div>
    <h2 class="text-xl font-bold">{{ $t('my') }} {{ $t('favorites') }}</h2>

    <div v-if="favoriteActs.length">
      <h3>{{ $t('act') }}</h3>
        <ActList :filter="'act'" :filterID="favoriteActs.map(act => act.id)" />
    </div>
    <div v-else>
      <router-link to="/acts"><p>{{ $t('no-act-fav') }}</p></router-link>
    </div>

    <div v-if="favoriteStages.length">
      <h3>{{ $t('stage') }}</h3>
      <LocationList :filter="'location'" :filterID="favoriteStages.map(stage => stage.id)" />
    </div>
    <div v-else>
      <router-link to="/locations"><p>{{ $t('no-stage-fav') }}</p></router-link>
    </div>

    <div v-if="favoriteEvents.length">
      <h3>{{ $t('event') }}</h3>
      <ProgrammList filter="event" :filterID="[]" class="ProgrammList" />
      <!-- Type 'number[]' is not assignable to type 'string[]'. Type 'number' is not assignable to type 'string'. -->
      <!--
        <ProgrammList :filter="'event'" :filterID="favoriteEvents.map(event => event.id)" />
        <ProgrammList :filter="'event'" :filterID="favoriteEvents.map(event => String(event.id))" />      
      -->
    </div>
    <div v-else>
      <router-link to="/programm"><p>{{ $t('no-event-fav') }}</p></router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useEventData } from '@/useEventData.ts';
import ProgrammList from '@/components/ProgrammList.vue';
import LocationList from '@/components/LocationList.vue';
import ActList from '@/components/ActList.vue';

// Load data from composable
const { acts, stages, performances } = useEventData();

// Load favorite data from local storage
const favoriteActs = computed(() => {
  const favoriteActIds = JSON.parse(localStorage.getItem('act')) || [];
  return acts.value.filter(act => favoriteActIds.includes(act.id));
});

const favoriteStages = computed(() => {
  const favoriteStageIds = JSON.parse(localStorage.getItem('stage')) || [];
  return stages.value.filter(stage => favoriteStageIds.includes(stage.id));
});

const favoriteEvents = computed(() => {
  const favoriteEventIds = JSON.parse(localStorage.getItem('event')) || [];
  return performances.value.filter(performance => favoriteEventIds.includes(performance.id));
});
</script>