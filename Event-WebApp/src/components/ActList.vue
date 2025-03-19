<!-- ActList.vue -->
<!-- A list of acts with a favorite button -->
<!-- Header Button style in style.css #button-heder-->

<template>
  <div class="scroll-head full-height">
    <SearchBar v-show="showSearch === 'true'" @apply="updateSearch"/>
    <FilterMenu
      v-if="showFilterMenu"
      :showCategoryFilter="true"
      :showActTypeFilter="true"
      :initial-categories="activeFilters.categories"
      :initial-act-types="activeFilters.actTypes"
      @apply="updateFilters"
      @close="showFilterMenu = false"
    />
    <div class="btn-header">
      <button class="btn half left" @click="toggleSortOption">
        {{ $t('sort-by') }}: {{ $t(nextSortLabel) }}
      </button>
      <button @click="showFilterMenu = true" class="btn right">
        {{ $t('open-filter') }}
      </button>
    </div>
    <div class="scroll-y-area">
      <ul v-if="sortedActs.length > 0" class="list-item-ul">
        <li v-for="act in sortedActs" :key="act.id" class="list-item-obj">
          <router-link 
            :to="'/act/' + (act['id-name']?.trim() ? act['id-name'] : act.id)" 
            class="list-item-link">
            <div class="list-item-info pad">
              <strong class="list-item-name">{{ act.name }}</strong>
              <span class="list-item-tags">
                <TagLabel 
                  v-for="(tag, index) in act.tags.filter(tag => tag.visible)" 
                  :key="index"
                  :name=tag.name
                  class="tag-label-item TagLabel"
                />
              </span>
            </div>
          </router-link>
          <FavoriteButton :itemId="String(act.id)" itemType="act" class="list-item-fav-btn" />
        </li>
      </ul>
      <p v-else>{{ $t('no-acts') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useEventData } from "@/scripts/useEventData";
import FavoriteButton from '@/components/FavBtn.vue';
import TagLabel from '@/components/TagLabel.vue';
import SearchBar from '@/components/SearchBar.vue';
import FilterMenu from '@/components/FilterMenu.vue';


// Function for Search
const route = useRoute()
const showSearch = computed(() => route.query.search ?? 'false')
const searchQuery = ref('');

// Function to update the search query
const updateSearch = (query: string) => {
  searchQuery.value = query.toLowerCase().trim();
};

// Function to show the FilterMenu
const showFilterMenu = ref(false);

// load acts from useEventData
const { acts } = useEventData();

// Define props (use for facvorites)
const props = defineProps<{
  filterID?: number[];
}>();

const activeFilters = ref({
  categories: [],
  actTypes: [], 
  //searchQuery: '', // not in use
  actIDs: []
});


const updateFilters = (newFilters: any) => {
  activeFilters.value.categories = newFilters.categories || [];
  activeFilters.value.actTypes = newFilters.actTypes || [];
  activeFilters.value.actIDs = newFilters.actIDs || [];
  //searchQuery.value = activeFilters.value.searchQuery;// optional redundant
};

// Filter acts by filterID and search query
const filteredActs = computed(() => {
  if (!acts.value || acts.value.length === 0) return []; // If acts are not loaded yet, return empty array

  let results = acts.value; // show all acts if no filter is set

  
  // filter by filterID prop (for Fav)
  if (props.filterID && props.filterID.length > 0) {
    results = results.filter(stage => props.filterID!.includes(stage.id));
  }

  // filter by IDs (Not in use)
  if (activeFilters.value.actIDs && activeFilters.value.actIDs.length > 0) {
    results = results.filter(act => activeFilters.value.actIDs.includes(act.id));
  }

  // filter by category (tags)
  if (activeFilters.value.categories && activeFilters.value.categories.length > 0) {
    results = results.filter(act =>
      act.tags?.some(tag => activeFilters.value.categories.includes(tag.name))
    );
  }

  // filter by actTypes
  if (activeFilters.value.actTypes && activeFilters.value.actTypes.length > 0) {
    results = results.filter(act => {
      const actTypes = act['act-type'] || [];
      return actTypes.some((type: string) => activeFilters.value.actTypes.includes(type));
    });
  }

  // filter by search query (name & description)
  if (searchQuery.value && (!activeFilters.value.actIDs || activeFilters.value.actIDs.length === 0)) {
    const q = searchQuery.value.toLowerCase();
    results = results.filter(act =>
      (act.name?.toLowerCase().includes(q) || act.description?.toLowerCase().includes(q))
    );
  }

  return results;
});

const sortOption = ref<'id' | 'name'>('name');

const toggleSortOption = () => {
  sortOption.value = sortOption.value === 'name' ? 'id' : 'name';
};

const nextSortLabel = computed(() => {
  return sortOption.value === 'name' ? 'id' : 'name';
});

const sortedActs = computed(() => {
  return [...filteredActs.value].sort((a, b) => {
    if (sortOption.value === 'name') {
      return a.name.localeCompare(b.name, 'de', { sensitivity: 'base' });
    } else {
      return a.id - b.id;
    }
  });
});

</script>
