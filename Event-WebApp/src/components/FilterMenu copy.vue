<!-- FilterMenu.vue -->
<!-- A filter menu for the ScheduleList -->

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

        <!-- Stages -->
        <div class="filter-group">
          <h3>{{ $t('stages')}}</h3>
          <div class="filter-button-group">
            <button v-for="stage in stages" :key="stage.id"
                    @click="toggleStage(stage.id)"
                    :class="{ 'selected': selectedStages.includes(stage.id) }">
              <span>&#x1F4CD;</span> {{ stage.name }}
            </button>
          </div>
        </div>

        <!-- Act-Tags -->
        <div class="filter-group">
          <h3>{{ $t('kategorien') }}</h3>
          <div class="filter-button-group">
            <TagLabel
              v-for="category in categories"
              :key="category"
              :name="category"
              tag="button"
              @click="toggleCategory(category)"
              :class="{ selected: selectedCategories.includes(category) }"
            />
          </div>
        </div>

        <!-- Performance Types -->
        <div class="filter-group">
          <h3>{{ $t('Performance-Types') }}</h3>
          <div class="filter-button-group">
            <TagLabel
              v-for="type in availableTypes"
              :key="type"
              :name="type"
              tag="button"
              @click="toggleType(type)"
              :class="{ selected: selectedTypes.includes(type) }"
            />
          </div>
        </div>

        <!-- Performance Tags -->
        <div class="filter-group">
          <h3>{{ $t('Performance-Tags') }}</h3>
          <div class="filter-button-group">
            <TagLabel
              v-for="tag in availablePerformanceTags"
              :key="tag"
              :name="tag"
              tag="button"
              @click="togglePerformanceTag(tag)"
              :class="{ selected: selectedPerformanceTags.includes(tag) }"
            />
          </div>
        </div>

      </div>
      
      <div class="filter-modal-footer">
        <button @click="applyAndClose" class="filter-apply-btn">
          {{ $t('apply-filter') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEventData } from '@/scripts/useEventData';
import TagLabel from '@/components/tagLabel.vue';

const emit = defineEmits(['apply', 'close']);
const { stages, acts, performances } = useEventData();

// Reactive states
const selectedStages = ref<number[]>([]);
const selectedCategories = ref<string[]>([]);
const selectedTypes = ref<string[]>([]);
const selectedPerformanceTags = ref<string[]>([]);
const searchQuery = ref('');

// Extract unique Act-Tags
const categories = computed(() => {
  const tagSet = new Set<string>();
  acts.value.forEach((act) => {
    act.tags?.forEach((tag) => {
      if (tag.visible) tagSet.add(tag.name);
    });
  });
  return Array.from(tagSet);
});

// Extract unique performance.type
const availableTypes = computed(() => {
  const typeSet = new Set<string>();
  performances.value.forEach((perf) => {
    if (perf.type) typeSet.add(perf.type);
  });
  return Array.from(typeSet);
});

// Extract unique performance.tags[]
const availablePerformanceTags = computed(() => {
  const tagSet = new Set<string>();
  performances.value.forEach((perf) => {
    perf.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet);
});

// Toggle helper methods
const toggleItem = <T>(list: T[], item: T) => {
  const index = list.indexOf(item);
  if (index >= 0) list.splice(index, 1);
  else list.push(item);
};

const toggleStage = (stageID: number) => toggleItem(selectedStages.value, stageID);
const toggleCategory = (category: string) => toggleItem(selectedCategories.value, category);
const toggleType = (type: string) => toggleItem(selectedTypes.value, type);
const togglePerformanceTag = (tag: string) => toggleItem(selectedPerformanceTags.value, tag);

// Reset
const resetFilters = () => {
  selectedStages.value = [];
  selectedCategories.value = [];
  selectedTypes.value = [];
  selectedPerformanceTags.value = [];
  searchQuery.value = '';
};

// Apply & Close
const applyAndClose = () => {
  emit('apply', {
    stages: selectedStages.value.map(String),
    categories: selectedCategories.value,
    types: selectedTypes.value,
    performanceTags: selectedPerformanceTags.value,
    searchQuery: searchQuery.value.trim(),
  });
  emit('close');
};
</script>

<style scoped>
input {
  width: 100%;
  padding: 0.4em;
  font-size: 1em;
}

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
  width: 30rem; /* ERROR-FIX responsive */
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
  max-height: 70vh; /* Setze die maximale Höhe des Modals auf 70% der Bildschirmhöhe */
  overflow-y: auto; /* Ermöglicht das Scrollen, wenn der Inhalt zu groß wird */
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
