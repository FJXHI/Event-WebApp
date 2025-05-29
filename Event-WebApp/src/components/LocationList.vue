<!-- LocationList.vue -->
<!-- A list of locations with a favorite button -->

<template>
  <div class="scroll-head full-height">
    <div class="app-head">
      <SearchBar v-show="showSearch === 'true'" @apply="updateSearch"/>
      <FilterMenu
        v-if="showFilterMenu"
        :showStageTypeFilter="true"
        :initial-stage-types="activeFilters.stageTypes"  
        @apply="updateFilters"
        @close="showFilterMenu = false"
      />
    </div>
    <div class="btn-header">
      <button @click="showFilterMenu = true" class="btn full">
        {{ $t('open-filter') }}
      </button>
    </div>
    <div class="scroll-y-area">
      <ul v-if="filteredStages.length > 0" class="list-item-ul">
        <li v-for="stage in filteredStages" :key="stage.id" class="list-item-obj">
          <router-link 
            :to="'/location/' + (stage['id-name']?.trim() ? stage['id-name'] : stage.id)"
            class="list-item-link"
          >
            <div class="list-item-info pad">
              <strong class="list-item-name">{{ stage.name }}</strong>
              <span class="list-item-tags">
                <TagLabel 
                  v-if="stage.type"
                  :name=stage.type
                  class="tag-label-item TagLabel"
                />
              </span>
            </div>
          </router-link>
          <FavoriteButton :itemId="String(stage.id)" itemType="stage" class="list-item-fav-btn" />
        </li>
      </ul>
      <NoEntries 
        v-else
        :type="favOnly && !hasFavorites ? 'favorites' : 'locations'" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useEventData } from '@/scripts/useEventData';
import FavoriteButton from '@/components/FavBtn.vue';
import SearchBar from '@/components/SearchBar.vue';
import FilterMenu from '@/components/FilterMenu.vue';
import TagLabel from '@/components/TagLabel.vue';
import NoEntries from '@/components/NoEntries.vue';

// Function for Search
const route = useRoute();
const favOnly = computed(() => route.query.fav === 'true');
const showSearch = computed(() => route.query.search ?? 'false');
const searchQuery = ref('');

const favoriteStageIds = computed(() => {
  const stored = localStorage.getItem('stage');
  return stored ? JSON.parse(stored).map((id: string) => parseInt(id)) : [];
});

const hasFavorites = computed(() => favoriteStageIds.value.length > 0);


// Function to update the search query
const updateSearch = (query: string) => {
  searchQuery.value = query.toLowerCase().trim();
};

// Function to show the FilterMenu
const showFilterMenu = ref(false);

// load acts from useEventData
const { stages } = useEventData();

// Define props (use for facvorites)
const props = defineProps<{
  filterID?: number[];
}>();

const activeFilters = ref({
  stageTypes: [],        
});

const updateFilters = (newFilters: any) => {
  activeFilters.value.stageTypes = newFilters.stageTypes || [];
};

// Filter stages by filterID and search query
const filteredStages = computed(() => {
  if (!stages.value || stages.value.length === 0) return [];

  // No Favorites, if favOnly is true and no favorites exist
  if (props.filterID && props.filterID.length === 0) return [];

  let results = stages.value;

  // filter by IDs
  if (props.filterID && props.filterID.length > 0) {
    results = results.filter(stage => props.filterID!.includes(stage.id));
  }

  // filter by stageTypes
  if (activeFilters.value.stageTypes.length > 0) {
    results = results.filter(stage =>
      stage.type && activeFilters.value.stageTypes.includes(stage.type)
    );
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
