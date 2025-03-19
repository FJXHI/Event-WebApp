<template>
  <div>
    <FilterMenu v-if="showFilterMenu" @apply="updateFilters" @close="showFilterMenu = false" />
    
    <button @click="showFilterMenu = true" class="bg-blue-500 text-white px-4 py-2 rounded">
      Filter öffnen
    </button>

    <ProgrammList :filter="filterType" :filterID="filterID" class="ProgrammList" />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FilterMenu from '@/components/FilterMenu.vue';
import ProgrammList from '@/components/ProgrammList.vue';

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
label {
  font-size: 16px;
  margin-right: 10px;
}

select {
  padding: 5px;
  font-size: 14px;
}
</style>
