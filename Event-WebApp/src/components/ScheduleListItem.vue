<!-- ScheduleListItem.vue -->
<!-- List of performances grouped by date and time -->

<template>
  <div>
    <div v-for="(timeGroups, date) in groupedByDateAndTime" :key="date" class="date-group">
      <h2 class="group-head head-date">{{ date }}</h2>
      <div v-for="(performances, time) in timeGroups" :key="time" class="time-group">
        <h3 class="group-head head-time pad">{{ time }}</h3>
        <ul>
          <li v-for="performance in performances" :key="performance.id" class="list-item-obj">
            <router-link
              :to="'/event/' + (performance['id-name']?.trim() || performance.id)"
              class="list-item-link"
            >
              <div class="list-item-info pad">
                <strong class="list-item-name">
                  <div v-if="performance.name">
                    {{ performance.name }}
                    <span v-if="performance.actsIDArr.length">
                      ({{ getActNamesLocal(performance.actsIDArr) }})
                    </span>
                  </div>
                  <div v-else-if="performance.actsIDArr.length">
                    {{ getActNamesLocal(performance.actsIDArr) }}
                  </div>
                  <div v-else>
                    {{ $t('Unknown') }}
                  </div>
                </strong>
                <span class="list-item-tags">
                  <span>{{ getStageName(performance.stageID) }}</span>
                  <span>
                    {{ formatDateTime(performance.start_time, 'Date Long') }},
                    {{ formatDateTime(performance.start_time, 'Time') }} –
                    {{ formatDateTime(performance.end_time, 'Time') }}
                  </span>
                  <span>
                    <TagLabel :name=performance.type class="tag-label-item" />
                  </span>
                  
                </span>
              </div>
            </router-link>
            <FavoriteButton
              :itemId="performance.id.toString()"
              itemType="event"
              class="list-item-fav-btn"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDateTime, getActNames } from '@/scripts/config';
import { useEventData } from '@/scripts/useEventData';
import FavoriteButton from '@/components/FavBtn.vue';
import TagLabel from './tagLabel.vue';
import type { Act, Stage, Performance } from '@/scripts/useEventData';

const { performances, acts, stages } = useEventData();

const props = defineProps<{
  filters: {
    stages: string[];
    categories: string[];
    types: string[];
    performanceTags: string[];
    searchQuery: string;
    actIDs: string[];
    performanceIDs: string[];
  };
}>();

const getStageName = (stageID: number): string => {
  const stage = stages.value.find((stage: Stage) => stage.id === stageID);
  return stage ? stage.name : 'Stage not found';
};

const getActNamesLocal = (actsArr: (number | string)[]) => getActNames(actsArr, acts);

const filteredPerformances = computed((): Performance[] => {
  const filters = props.filters;

  return performances.value.filter((perf) => {
    // Stage-Filter
    if (filters.stages.length && !filters.stages.includes(String(perf.stageID))) {
      return false;
    }

    // Type-Filter
    if (filters.types.length && !filters.types.includes(perf.type)) {
      return false;
    }

    // Performance-Tag-Filter
    if (
      filters.performanceTags.length &&
      (!perf.tags || !perf.tags.some((tag) => filters.performanceTags.includes(tag)))
    ) {
      return false;
    }

    // Act-Tag-Filter
    if (filters.categories.length) {
      const actTags = perf.actsIDArr
        .map((actID) => acts.value.find((a) => a.id === actID))
        .filter(Boolean)
        .flatMap((act) => act!.tags.filter((tag) => tag.visible).map((tag) => tag.name));

      const hasMatchingTag = actTags.some((tag) => filters.categories.includes(tag));
      if (!hasMatchingTag) return false;
    }

    // Act-ID-Filter
    if (
      filters.actIDs.length &&
      !filters.actIDs.some((id) => perf.actsIDArr.includes(Number(id)))
    ) {
      return false;
    }

    // Performance-ID-Filter
    if (
      filters.performanceIDs.length &&
      !filters.performanceIDs.some((id) => perf.id === Number(id))
    ) {
      return false;
    }

    // Search in performance, act and location (name and description)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();

      const inPerformance =
        (perf.name || '').toLowerCase().includes(query) ||
        (perf.description || '').toLowerCase().includes(query);

      const inActs = perf.actsIDArr.some((actID) => {
        const act = acts.value.find((a) => a.id === actID);
        return (
          act?.name?.toLowerCase().includes(query) ||
          act?.description?.toLowerCase().includes(query)
        );
      });

      const stage = stages.value.find((s) => s.id === perf.stageID);
      const inStage = stage?.name?.toLowerCase().includes(query);

      if (!inPerformance && !inActs && !inStage) return false;
    }

    return true;
  }).sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
});

const groupedByDateAndTime = computed(() => {
  const groups: Record<string, Record<string, Performance[]>> = {};

  for (const perf of filteredPerformances.value) {
    const dateKey = formatDateTime(perf.start_time, 'Date Long');
    const timeKey = formatDateTime(perf.start_time, 'Time');

    if (!groups[dateKey]) groups[dateKey] = {};
    if (!groups[dateKey][timeKey]) groups[dateKey][timeKey] = [];

    groups[dateKey][timeKey].push(perf);
  }

  return groups;
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

.group-head {
  background-color: var(--color-theme-list-group);
  color: var(--color-theme-list-group-text);
}

.head-date {
  font-size: 1.4rem;
  text-align: center;
}

.head-time {
  font-size: 1.15rem;
}

.list-item-tags span {
  margin-right: 0.4rem;
  
}

</style>
