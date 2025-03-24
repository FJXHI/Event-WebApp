<template>
  <div class="locations-view">
    <div v-if="stages.length > 0">
      <LocationList />
    </div>
    <p v-else>{{ $t('no-locations') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useEventData } from '@/useEventData.ts';
import LocationList from '@/components/LocationList.vue';

const { stages } = useEventData(); 
</script>