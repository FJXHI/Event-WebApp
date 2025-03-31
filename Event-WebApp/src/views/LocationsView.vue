<template>
  <div class="list-view">
    <div v-if="stages.length > 0">
      <LocationList :filterID="favOnly ? favoriteStageIds : undefined" />
    </div>
    <p v-else>{{ $t('no-locations') }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useEventData } from '@/scripts/useEventData';
import LocationList from '@/components/LocationList.vue';

const { stages } = useEventData(); 

const route = useRoute();
const favOnly = computed(() => route.query.fav === 'true');

const favoriteStageIds = computed(() => {
  const stored = localStorage.getItem('stage');
  return stored ? JSON.parse(stored).map((id: string) => parseInt(id)) : [];
});
</script>