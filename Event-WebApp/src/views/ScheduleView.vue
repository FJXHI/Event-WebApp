<!-- ScheduleView.vue -->
<template>
  <div>
    <div class="btn-header">
      <button @click="$router.push('/timetable')" class="btn-view-chang">{{ $t('change-view') }}</button>
      <FilterMenu v-if="showFilterMenu" @apply="updateFilters" @close="showFilterMenu = false" />
      
      <button @click="showFilterMenu = true" class="open-filter">
        {{ $t('open-filter') }}
      </button>
    </div>
    <ScheduleList :filter="filterType" :filterID="filterID" class="ProgrammList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FilterMenu from '@/components/FilterMenu.vue';
import ScheduleList from '@/components/ScheduleList.vue';

const showFilterMenu = ref(false);
const filterType = ref<"act" | "event" | "tags" | "location" | "all">("all");
const filterID = ref([]);

const updateFilters = (filters) => {
  console.log(filters);
  filterType.value = filters.categories.length > 0 ? "tags" : "all";
  filterID.value = filters.categories.length > 0 ? filters.categories : [];
};

</script>


<style scoped>

.btn-header {
  display: flex;
  justify-content: space-between;
}

.btn-view-chang {
  width: 50%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem; 
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0;
  background-color: #3B82F6;
}


.open-filter {
  width: 50%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem; 
  padding-left: 1rem;
  padding-right: 1rem; 
  border-radius: 0; 
  /*color: #ffffff; 
  background-color: #3B82F6;*/ 
}

label {
  font-size: 16px;
  margin-right: 10px;
}

select {
  padding: 5px;
  font-size: 14px;
}
</style>
