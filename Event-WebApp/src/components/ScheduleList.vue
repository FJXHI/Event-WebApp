<!-- ScheduleList.vue -->
<!-- Show the schedule list with filter options --> 

<template>
  <div class="full-height">
    <div>
      <SearchBar v-show="showSearch === 'true'" @apply="updateSearch"/>
    </div> 
    <div class="btn-header">
      <FilterMenu v-if="showFilterMenu"
        :showStageFilter="true"
        :showStageTypeFilter="true"        
        :showCategoryFilter="true"
        :showActTypeFilter="true"          
        :showPerforTypeFilter="true"       
        :showPerformanceTagFilter="true"
        :initial-stages="activeFilters.stages"
        :initial-stage-types="activeFilters.stageTypes"        
        :initial-categories="activeFilters.categories"
        :initial-act-types="activeFilters.actTypes"            
        :initial-perfor-types="activeFilters.perforTypes"      
        :initial-performance-tags="activeFilters.performanceTags"
        :initial-search-query="activeFilters.searchQuery"
        @apply="updateFilters"
        @close="showFilterMenu = false"
      /><!-- Search-query not in use-->


      <ToggleViewButton targetView="table" class="btn left"/>

      <button @click="showFilterMenu = true" class="btn right">
        {{ $t('open-filter') }}
      </button>
    </div>

    <ScheduleListItem
      :filters="computedFilters"
      class="ProgrammList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { eventFilters } from '@/scripts/functions';
import { useRoute } from 'vue-router'
import ToggleViewButton from '@/components/SwitchView.vue';
import ScheduleListItem from '@/components/ScheduleListItem.vue';
import FilterMenu from '@/components/FilterMenu.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useEventData } from '@/scripts/useEventData';

const { performances } = useEventData();

// Function to show the SearchBar
const route = useRoute()
const showSearch = computed(() => route.query.search ?? 'false')
const favOnly = computed(() => route.query.fav === 'true');

const showFilterMenu = ref(false);

const activeFilters = reactive({
  stages: [],
  stageTypes: [],        
  categories: [],
  actTypes: [],          
  perforTypes: [],       
  performanceTags: [],
  searchQuery: ''
});

const updateSearch = (searchQuery: string) => {
  eventFilters.value.searchQuery = searchQuery;
  eventFilters.value.stages = [];
  eventFilters.value.stageTypes = [];
  eventFilters.value.categories = [];
  eventFilters.value.actTypes = [];
  eventFilters.value.perforTypes = [];
  eventFilters.value.performanceTags = [];
  eventFilters.value.actIDs = [];
  eventFilters.value.performanceIDs = [];
};

const updateFilters = (newFilters: any) => {
  // update global filter
  eventFilters.value.stages = newFilters.stages || [];
  eventFilters.value.stageTypes = newFilters.stageTypes || [];
  eventFilters.value.categories = newFilters.categories || [];
  eventFilters.value.actTypes = newFilters.actTypes || [];
  eventFilters.value.perforTypes = newFilters.perforTypes || [];
  eventFilters.value.performanceTags = newFilters.performanceTags || [];
  eventFilters.value.searchQuery = newFilters.searchQuery || "";
  eventFilters.value.actIDs = newFilters.actIDs || [];
  eventFilters.value.performanceIDs = newFilters.performanceIDs || [];

  // Update local activeFilters - need for the filter menu retains the values
  activeFilters.stages = [...eventFilters.value.stages];
  activeFilters.stageTypes = [...eventFilters.value.stageTypes];
  activeFilters.categories = [...eventFilters.value.categories];
  activeFilters.actTypes = [...eventFilters.value.actTypes];
  activeFilters.perforTypes = [...eventFilters.value.perforTypes];
  activeFilters.performanceTags = [...eventFilters.value.performanceTags];
  activeFilters.searchQuery = eventFilters.value.searchQuery;
};

const computedFilters = computed(() => {
  if (favOnly.value) {
    return {
      ...eventFilters.value,
      performanceIDs: favoriteEvents.value.map((p) => String(p.id))
    };
  }
  return eventFilters.value;
});

const favoriteEvents = computed(() => {
  const favoriteEventIds = JSON.parse(localStorage.getItem('event') || '[]');

  if (!performances.value || performances.value.length === 0) {
    console.warn("Performances data not available yet!");
    return [];
  }

  return performances.value.filter(perf =>
    favoriteEventIds.includes(perf.id.toString())
  );
});

</script>
