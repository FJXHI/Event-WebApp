<!-- ScheduleList.vue -->
<!-- Show the schedule list with filter options --> 

<template>
  <div>
    <div>
      <SearchBar v-show="showSearch === 'true'" @apply="updateSearch"/>
    </div> 
    <div class="btn-header">
      <FilterMenu v-if="showFilterMenu"
        :initial-stages="activeFilters.stages"
        :initial-categories="activeFilters.categories"
        :initial-types="activeFilters.types"
        :initial-performance-tags="activeFilters.performanceTags"
        :initial-search-query="activeFilters.searchQuery"
        @apply="updateFilters"
        @close="showFilterMenu = false"
      />

      <ToggleViewButton targetView="table" class="schedul-btn"/>

      <button @click="showFilterMenu = true" class="open-filter schedul-btn">
        {{ $t('open-filter') }}
      </button>
    </div>

    <ScheduleListItem :filters="eventFilters" class="ProgrammList" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { eventFilters } from '@/scripts/config';
import { useRoute } from 'vue-router'
import ToggleViewButton from '@/components/SwitchView.vue';
import ScheduleListItem from '@/components/ScheduleListItem.vue';
import FilterMenu from '@/components/FilterMenu.vue';
import SearchBar from '@/components/SearchBar.vue';

// Function to show the SearchBar
const route = useRoute()
const showSearch = computed(() => route.query.search ?? 'false')

const showFilterMenu = ref(false);

const activeFilters = reactive({
  stages: [],
  categories: [],
  types: [],
  performanceTags: [],
  searchQuery: ''
});

const updateSearch = (searchQuery: string) => {
  eventFilters.value.searchQuery = searchQuery;
  eventFilters.value.stages = [];
  eventFilters.value.categories = [];
  eventFilters.value.types = [];
  eventFilters.value.performanceTags = [];
  eventFilters.value.actIDs = [];
  eventFilters.value.performanceIDs = [];
};

const updateFilters = (newFilters: any) => {
  // update global filter
  eventFilters.value.stages = newFilters.stages || [];
  eventFilters.value.categories = newFilters.categories || [];
  eventFilters.value.types = newFilters.types || [];
  eventFilters.value.performanceTags = newFilters.performanceTags || [];
  eventFilters.value.searchQuery = newFilters.searchQuery || "";
  eventFilters.value.actIDs = newFilters.actIDs || [];
  eventFilters.value.performanceIDs = newFilters.performanceIDs || [];

  // Update local activeFilters - need for the filter menu retains the values
  activeFilters.stages = [...eventFilters.value.stages];
  activeFilters.categories = [...eventFilters.value.categories];
  activeFilters.types = [...eventFilters.value.types];
  activeFilters.performanceTags = [...eventFilters.value.performanceTags];
  activeFilters.searchQuery = eventFilters.value.searchQuery;
};
</script>
  
  
<style scoped>
.btn-header {
  display: flex;
  justify-content: space-between;
  background-color: var(--color-theme-list-group);
}

/* Update Button from SwichtView.vue */
.btn-view-chang {
  border-radius: 0px 0px 15px 0px;
}

.schedul-btn {
  width: 50%;
  color: var(--color-text-theme-topnav); 
  background-color: var(--color-bg-theme-searchbar);
}

.open-filter {
  border-radius: 0px 0px 0px 15px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem; 
  padding-left: 1rem;
  padding-right: 1rem;

}
</style>  