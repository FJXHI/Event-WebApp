<!-- FilterMenu.vue -->
<!-- A filter menu for Performance, Act and Location Lists -->
<!-- Button color in base.css -->
<!-- ERROR-FIX: Need auto width with responsive-->

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
        <div v-show="props.showStageFilter" class="filter-group">
          <h3>{{ $t('stages')}}</h3>
          <div class="filter-button-group">
            <button v-for="stage in stages" :key="stage.id"
                    @click="toggleStage(stage.id)"
                    :class="{ 'selected': selectedStages.includes(stage.id) }">
              <span>&#x1F4CD;</span> {{ stage.name }}
            </button>
          </div>
        </div>

        <!-- Stage Types -->
        <div v-show="props.showStageTypeFilter" class="filter-group">
          <h3>{{ $t('Location-Types') }}</h3>
          <div class="filter-button-group">
            <TagLabel
              v-for="type in availableStageTypes"
              :key="type"
              :name="capitalize(type)"
              tag="button"
              @click="toggleStageType(type)"
              :class="{ selected: selectedStageTypes.includes(type) }"
            />
          </div>
        </div>

        <!-- Act-Tags -->
        <div v-show="props.showCategoryFilter" class="filter-group">
          <h3>{{ $t('kategorien') }}</h3>
          <div class="filter-button-group">
            <TagLabel
              v-for="category in categories"
              :key="category"
              :name="capitalize(category)"
              tag="button"
              @click="toggleCategory(category)"
              :class="{ selected: selectedCategories.includes(category) }"
            />
          </div>
        </div>

        <!-- Act Types -->
        <div v-show="props.showActTypeFilter" class="filter-group">
          <h3>{{ $t('Act Types') }}</h3>
          <div class="filter-button-group">
            <TagLabel
              v-for="type in availableActTypes"
              :key="type"
              :name="capitalize(type)"
              tag="button"
              @click="toggleActType(type)"
              :class="{ selected: selectedActTypes.includes(type) }"
            />
          </div>
        </div>

        <!-- Performance Types -->
        <div v-show="props.showPerforTypeFilter" class="filter-group">
          <h3>{{ $t('Performance-Types') }}</h3>
          <div class="filter-button-group">
            <TagLabel
              v-for="type in availablePerforType"
              :key="type"
              :name="capitalize(type)"
              tag="button"
              @click="togglePerforType(type)"
              :class="{ selected: selectedPerforTypes.includes(type) }"
            />
          </div>
        </div>

        <!-- Performance Tags -->
        <div v-show="props.showPerformanceTagFilter" class="filter-group">
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
import { capitalize } from '@/scripts/functions';
import { useEventData } from '@/scripts/useEventData';
import TagLabel from '@/components/TagLabel.vue';

const emit = defineEmits(['apply', 'close']);
const { stages, acts, performances } = useEventData();

// Create Props 
const props = defineProps({
  initialStages: { type: Array as () => number[], default: () => [] },
  initialStageTypes: { type: Array as () => string[], default: () => [] },
  initialCategories: { type: Array as () => string[], default: () => [] },
  initialActTypes: { type: Array as () => string[], default: () => [] },
  initialPerforTypes: { type: Array as () => string[], default: () => [] },
  initialPerformanceTags: { type: Array as () => string[], default: () => [] },
  initialSearchQuery: { type: String, default: '' },

  showStageFilter: { type: Boolean, default: false },
  showStageTypeFilter: { type: Boolean, default: false },
  showCategoryFilter: { type: Boolean, default: false },
  showActTypeFilter: { type: Boolean, default: false },
  showPerforTypeFilter: { type: Boolean, default: false },
  showPerformanceTagFilter: { type: Boolean, default: false }
});

// Reactive states
const selectedStages = ref<number[]>([...props.initialStages.map(Number)]);
const selectedStageTypes = ref([...props.initialStageTypes]);
const selectedCategories = ref([...props.initialCategories]);
const selectedActTypes = ref([...props.initialActTypes]);
const selectedPerforTypes = ref([...props.initialPerforTypes]);
const selectedPerformanceTags = ref([...props.initialPerformanceTags]);
const searchQuery = ref(props.initialSearchQuery);

// Extract functions ----------------------------------
// Extract unique Stage-Types
const availableStageTypes = computed(() => {
  const typeSet = new Set<string>();
  stages.value.forEach((stage) => {
    if (stage.type) typeSet.add(stage.type);
  });
  return Array.from(typeSet);
});

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

// Extract unique Act-Types
const availableActTypes = computed(() => {
  const typeSet = new Set<string>();
  acts.value.forEach((act) => {
    act['act-type']?.forEach((type: string) => {
      typeSet.add(type);
    });
  });
  return Array.from(typeSet);
});

// Extract unique Performance-Types
const availablePerforType = computed(() => {
  const typeSet = new Set<string>();
  performances.value.forEach((perf) => {
    if (perf.type) typeSet.add(perf.type);
  });
  return Array.from(typeSet);
});

// Extract unique Performance-Tags
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

// Toggle functions
const toggleStage = (stageID: number) => toggleItem(selectedStages.value, stageID);
const toggleStageType = (type: string) => toggleItem(selectedStageTypes.value, type);
const toggleCategory = (category: string) => toggleItem(selectedCategories.value, category);
const toggleActType = (type: string) => toggleItem(selectedActTypes.value, type);
const togglePerforType = (type: string) => toggleItem(selectedPerforTypes.value, type);
const togglePerformanceTag = (tag: string) => toggleItem(selectedPerformanceTags.value, tag);

// Reset
const resetFilters = () => {
  selectedStages.value = [];
  selectedStageTypes.value = [];
  selectedCategories.value = [];
  selectedActTypes.value = [];
  selectedPerforTypes.value = [];
  selectedPerformanceTags.value = [];
  searchQuery.value = '';
};

// Apply & Close
const applyAndClose = () => {
  emit('apply', {
    stages: selectedStages.value.map(String),
    stageTypes: selectedStageTypes.value,
    categories: selectedCategories.value,
    actTypes: selectedActTypes.value,
    perforTypes: selectedPerforTypes.value,
    performanceTags: selectedPerformanceTags.value,
    searchQuery: searchQuery.value.trim()
  });
  emit('close');
};
</script>

<style scoped>
.overlay {
  position: fixed;
  z-index: 200;
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
  border-bottom: 1px solid var(--filter-line);
}

.filter-close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text);
}

.filter-modal-body {
  padding: 1rem;
  max-height: 70vh; /* 70% of viewport height */
  overflow-y: auto; /* Add a scrollbar, if too much content */ 
}

.filter-reset-btn {
  background: none;
  border: none;
  color: var(--btn-reset);
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
  border: none;
  background: var(--btn-normal-bg);
  color: var(--btn-normal-text);
  cursor: pointer;
}

.filter-button-group button.selected {
  background: var(--btn-active-bg);
  color: var(--btn-active-text);
}

.filter-modal-footer {
  padding: 1rem;
  border-top: 1px solid var(--filter-line);
}

.filter-apply-btn {
  width: 100%;
  background: var(--btn-apply-bg);
  color: var(--btn-apply-text);
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
