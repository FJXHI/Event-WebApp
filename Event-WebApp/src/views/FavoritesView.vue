<!-- FavoritesView.vue -->
<template>
  <div class="scroll-head full-height">
    <div class="LinkItem-list scroll-y-area">
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
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { getFavoriteCount, getFavoriteSubtext } from '@/scripts/functions';
import LinkItem from '@/components/LinkItem.vue';
import IconActs from '@/components/icons/IconPeople.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconGeo from '@/components/icons/IconGeo.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const favoriteActsCount = ref(0);
const favoriteStagesCount = ref(0);
const favoriteEventsCount = ref(0);

// Compute the counts for each category and update them when the component is mounted or when storage changes
const updateFavoriteCounts = () => {
  favoriteActsCount.value = getFavoriteCount('act');
  favoriteStagesCount.value = getFavoriteCount('stage');
  favoriteEventsCount.value = getFavoriteCount('event');
};

// Update counts on mount and when storage changes
onMounted(() => {
  updateFavoriteCounts();
  window.addEventListener('storage', updateFavoriteCounts);
  window.addEventListener('focus', updateFavoriteCounts);
});

onUnmounted(() => {
  window.removeEventListener('storage', updateFavoriteCounts);
  window.removeEventListener('focus', updateFavoriteCounts);
});

// Compute the subtext for each category
const favoriteActsSubtext = computed(() => getFavoriteSubtext(favoriteActsCount.value, t));
const favoriteStagesSubtext = computed(() => getFavoriteSubtext(favoriteStagesCount.value, t));
const favoriteEventsSubtext = computed(() => getFavoriteSubtext(favoriteEventsCount.value, t));
</script>
