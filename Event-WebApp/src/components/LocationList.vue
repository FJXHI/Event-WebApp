<!-- LocationList.vue -->
<!-- A list of locations with a favorite button -->

<template>
  <div class="locations-list">
    <SearchBar v-show="showSearch === 'true'" @apply="updateSearch"/>
    <ul v-if="filteredStages.length > 0">
      <li v-for="stage in filteredStages" :key="stage.id" class="list-item-obj">
        <router-link 
          :to="'/location/' + (stage['id-name']?.trim() ? stage['id-name'] : stage.id)"
          class="list-item-link"
        >
          <div class="list-item-info pad">
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
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useEventData } from '@/scripts/useEventData';
import FavoriteButton from '@/components/FavBtn.vue';
import SearchBar from '@/components/SearchBar.vue';

const route = useRoute();
const showSearch = computed(() => route.query.search ?? 'false');

const searchQuery = ref('');

// Function to update the search query
const updateSearch = (query: string) => {
  searchQuery.value = query.toLowerCase().trim();
};

// load acts from useEventData
const { stages } = useEventData();

// Define props
const props = defineProps<{
  filterID?: number[];
}>();

// Filter stages by filterID and search query
const filteredStages = computed(() => {
  if (!stages.value || stages.value.length === 0) return [];

  let results = stages.value;

  // filter by IDs
  if (props.filterID && props.filterID.length > 0) {
    results = results.filter(stage => props.filterID!.includes(stage.id));
  }

  // filter by search query
  if (searchQuery.value) {
    results = results.filter(stage => {
      const name = stage.name?.toLowerCase() || '';
      const description = stage.description?.toLowerCase() || '';
      return name.includes(searchQuery.value) || description.includes(searchQuery.value);
    });
  }

  return results;
});
</script>


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}


</style>
