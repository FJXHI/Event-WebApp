<!-- FilterMenu.vue -->

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white rounded-lg w-96 shadow-lg">
      <div class="p-4 border-b flex justify-between items-center">
        <h2 class="text-lg font-semibold">Filter</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-black">&times;</button>
      </div>
      
      <div class="p-4">
        <button @click="resetFilters" class="text-blue-500 flex items-center mb-4">
          &#x21bb; Filter zurücksetzen
        </button>
        
        <div class="mb-4">
          <h3 class="font-semibold mb-2">Kategorien</h3>
          <div class="flex gap-2 flex-wrap">
            <button v-for="category in categories" :key="category"
                    @click="toggleCategory(category)"
                    :class="['px-3 py-1 rounded-full border', selectedCategories.includes(category) ? 'bg-blue-500 text-white' : 'bg-gray-100']">
              {{ category }}
            </button>
          </div>
        </div>
        
        <div>
          <h3 class="font-semibold mb-2">Bühnen</h3>
          <div class="flex gap-2 flex-wrap">
            <button v-for="stage in stages" :key="stage.id"
                    @click="toggleStage(stage)"
                    :class="['px-3 py-1 rounded-full border flex items-center', selectedStages.includes(stage.id) ? 'bg-green-500 text-white' : 'bg-gray-100']">
              <span class="mr-1">&#x1F4CD;</span> {{ stage.name }}
            </button>
          </div>
        </div>
      </div>
      
      <div class="p-4 border-t">
        <button @click="applyFilters" class="w-full bg-green-500 text-white py-2 rounded-lg">Filter anwenden</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useEventData } from '@/useEventData.ts';

const { stages, acts } = useEventData();
const emit = defineEmits(['apply']); // define custom event

const selectedCategories = ref([]);
const selectedStages = ref([]);

const categories = computed(() => {
  if (!Array.isArray(acts.value)) return [];
  const tagSet = new Set();
  
  acts.value.forEach(act => {
    if (Array.isArray(act.tags)) {
      act.tags.forEach(tag => {
        if (tag.visible) {
          tagSet.add(tag.name);
        }
      });
    }
  });

  return Array.from(tagSet);
});

const toggleCategory = (category) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== category);
  } else {
    selectedCategories.value.push(category);
  }
};

const toggleStage = (stage) => {
  if (selectedStages.value.includes(stage.id)) {
    selectedStages.value = selectedStages.value.filter(id => id !== stage.id);
  } else {
    selectedStages.value.push(stage.id);
  }
};

const resetFilters = () => {
  selectedCategories.value = [];
  selectedStages.value = [];
};

const applyFilters = () => {
  const filters = {
    categories: selectedCategories.value,
    stages: selectedStages.value
  };
  emit('apply', filters); // send filter to parent component
};
</script>

<style scoped>
button {
  transition: all 0.2s;
}
button:hover {
  opacity: 0.8;
}
</style>
