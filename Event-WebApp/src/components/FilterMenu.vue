<!-- FilterMenu.vue -->

<template>
  <div class="overlay">
    <div class="filter-modal">
      <div class="filter-modal-header">
        <h2>Filter</h2>
        <button @click="$emit('close')" class="filter-close-btn">&times;</button>
      </div>
      
      <div class="filter-modal-body">
        <button @click="resetFilters" class="filter-reset-btn">
          &#x21bb; Filter zurücksetzen
        </button>
        
        <div class="filter-group">
          <h3>Kategorien</h3>
          <div class="filter-button-group">
            <button v-for="category in categories" :key="category"
                    @click="toggleCategory(category)"
                    :class="{'selected': selectedCategories.includes(category)}">
              {{ category }}
            </button>
          </div>
        </div>

        <!-- ERROR-FIX -- This don't work at the moment --
        <div class="filter-group">
          <h3>Bühnen</h3>
          <div class="button-group">
            <button v-for="stage in stages" :key="stage.id"
                    @click="toggleStage(stage)"
                    :class="{'selected': selectedStages.includes(stage.id)}">
              <span>&#x1F4CD;</span> {{ stage.name }}
            </button>
          </div>
        </div>
        -->

      </div>
      
      <div class="filter-modal-footer">
        <button @click="applyAndClose" class="filter-apply-btn">Filter anwenden</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useEventData } from '@/useEventData.ts';

const { stages, acts } = useEventData();
const emit = defineEmits(['apply', 'close']); // define custom events

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

const applyAndClose = () => {
  const filters = {
    categories: selectedCategories.value,
    stages: selectedStages.value
  };
  emit('apply', filters); // send filter to parent component
  emit('close') // close modal
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
