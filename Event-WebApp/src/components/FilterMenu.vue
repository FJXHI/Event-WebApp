<!-- FilterMenu.vue -->
<!-- A filter menu for the "tags" in ScheduleList -->

<template>
  <div class="overlay">
    <div class="filter-modal">
      <div class="filter-modal-header">
        <h2>{{ $t('filter') }}</h2>
        <button @click="$emit('close')" class="filter-close-btn">&times;</button>
      </div>
      
      <div class="filter-modal-body">
        <button @click="resetFilters" class="filter-reset-btn">
          &#x21bb; {{ $t('reset-filter') }}
        </button>
        
        <div class="filter-group">
          <h3>{{ $t('kategorien') }}</h3>
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
        <button @click="applyAndClose" class="filter-apply-btn">{{ $t('apply-filter') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useEventData } from '@/scripts/useEventData';

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
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-modal {
  background: var(--color-background-mute);
  border-radius: 8px;
  width: 24rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.filter-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.filter-close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.filter-modal-body {
  padding: 1rem;
}

.filter-reset-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.filter-group {
  margin-bottom: 1rem;
}

.filter-group h3 {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.filter-button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-button-group button {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid #ddd;
  /*background: #f3f3f3;*/
  cursor: pointer;
}

.filter-button-group button.selected {
  background: #007bff;
  color: white;
}

.filter-modal-footer {
  padding: 1rem;
  border-top: 1px solid #ddd;
}

.filter-apply-btn {
  width: 100%;
  background: #28a745;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button {
  transition: all 0.2s;
}
button:hover {
  opacity: 0.8;
}
</style>
