<!-- LocationsView.vue -->

<template>
  <div class="list-view full-height">
    <LocationList :filterID="favOnly ? favoriteStageIds : undefined" class="full-height"/>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import LocationList from '@/components/LocationList.vue';

const route = useRoute();
const favOnly = computed(() => route.query.fav === 'true');

const favoriteStageIds = computed(() => {
  const stored = localStorage.getItem('stage');
  return stored ? JSON.parse(stored).map((id: string) => parseInt(id)) : [];
});
</script>