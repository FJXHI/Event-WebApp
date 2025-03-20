<!-- LocationList.vue -->
<!-- A list of locations with a favorite button -->

<template>
  <div class="locations-list">
    <ul v-if="filteredStages.length > 0">
      <li v-for="stage in filteredStages" :key="stage.id" class="list-item-obj">
        <router-link 
          :to="'/location/' + (stage['id-name']?.trim() ? stage['id-name'] : stage.id)"
          class="list-item-link"
        >
          <div class="list-item-info">
            <strong class="list-item-name">{{ stage.name }}</strong>
            <!-- Subtext -->
          </div>
        </router-link>
        <FavoriteButton :itemId="String(stage.id)" itemType="stage" class="list-item-fav-btn" />
      </li>
    </ul>
    <p v-else>{{ $t('no-locations') }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEventData } from '@/useEventData.ts';
import FavoriteButton from '@/components/FavBtn.vue';

// load acts from useEventData
const { stages } = useEventData();

// Define props
const props = defineProps<{
  filterID?: number[];
}>();

// Filter stages by filterID
const filteredStages = computed(() => {
  if (!stages.value || stages.value.length === 0) return []; // If stages are not loaded yet, return empty array
  if (!props.filterID || props.filterID.length === 0) return stages.value; // show all stages if no filter is set
  return stages.value.filter((stage) => props.filterID?.includes(stage.id));
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}


</style>
