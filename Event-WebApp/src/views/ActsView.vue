<template>
  <div class="list-view">
    <div v-if="acts.length > 0">
      <ActList :filterID="favOnly ? favoriteActIds : undefined" />
    </div>
    <p v-else>{{ $t('no-acts') }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useEventData } from '@/scripts/useEventData';
import ActList from '@/components/ActList.vue';

const { acts } = useEventData(); 
const route = useRoute();
const favOnly = computed(() => route.query.fav === 'true');

const favoriteActIds = computed(() => {
  const stored = localStorage.getItem('act');
  return stored ? JSON.parse(stored).map((id: string) => parseInt(id)) : [];
});

</script>