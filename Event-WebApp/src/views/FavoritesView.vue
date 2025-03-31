<!-- FavoritesView.vue -->
<template>
  <div>
    <div class="center">
      <ul>
        <LinkItem 
          to="/acts?fav=true" 
          :icon="IconActs" 
          title="nav-acts" 
          :subtext="favoriteActsSubtext"
        />
        
        <LinkItem 
          to="/locations?fav=true" 
          :icon="IconGeo" 
          title="nav-locations" 
          :subtext="favoriteStagesSubtext"
        />
        
        <LinkItem 
          to="/schedule?fav=true" 
          :icon="IconClock" 
          title="nav-timetable" 
          :subtext="favoriteEventsSubtext"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEventData } from '@/scripts/useEventData';
import { getFavoriteItems, getFavoriteSubtext } from '@/scripts/functions';
import LinkItem from '@/components/LinkItem.vue';
import IconActs from '@/components/icons/IconPeople.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconGeo from '@/components/icons/IconGeo.vue';
import { useI18n } from 'vue-i18n';

// Load data from composable
const { acts, stages, performances } = useEventData();

// Compute favorite items for each category
const favoriteActs = computed(() => getFavoriteItems('act', acts.value || []));
const favoriteStages = computed(() => getFavoriteItems('stage', stages.value || []));
const favoriteEvents = computed(() => getFavoriteItems('event', performances.value || []));

// Compute the subtexts for each category
const favoriteActsSubtext = computed(() => getFavoriteSubtext(favoriteActs.value.length));
const favoriteStagesSubtext = computed(() => getFavoriteSubtext(favoriteStages.value.length));
const favoriteEventsSubtext = computed(() => getFavoriteSubtext(favoriteEvents.value.length));
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
}
</style>
