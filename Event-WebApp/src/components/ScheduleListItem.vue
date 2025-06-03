<!-- ScheduleListItem.vue -->
<!-- List of performances grouped by date and time -->

<template>
  <div class="scroll-head full-height">
    <div class="scroll-y-area">
      <NoEntries v-if="Object.keys(groupedByDateAndTime).length === 0" type="event"/>
      <div v-for="(timeGroups, date, index) in groupedByDateAndTime" :key="date" class="date-group">
        <DateHead
            :date="date"
            :index="index"
            :sortedDateList="sortedDateList"
            :scrollToDate="scrollToDate"
          />
        <div v-for="(performances, time) in timeGroups" :key="time" class="time-group">
          <h3 class="group-head head-time pad">{{ time }}</h3>
          <ul class="list-item-ul">
            <li v-for="performance in performances" :key="performance.id" class="list-item-obj">
              <router-link
                :to="`/event/${performance['id-name']?.trim() || performance.id}`"
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
                      <TagLabel :name="capitalize(performance.type)" class="tag-label-item" />
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDateTime, getActNames, capitalize } from '@/scripts/functions';
import { useEventData } from '@/scripts/useEventData';
import FavoriteButton from '@/components/FavBtn.vue';
import TagLabel from '@/components/TagLabel.vue';
import NoEntries from '@/components/NoEntries.vue';
import DateHead from '@/components/DateHead.vue';
import type { Act, Stage, Performance } from '@/scripts/useEventData';

import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const router = useRouter()

const sortedDateList = computed(() =>
  Object.keys(groupedByDateAndTime.value).sort()
);

// hash-link for date navigation
function scrollToDate(targetDate: string) {
  router.replace({ hash: `#${targetDate}` }) // replace the URL, no new history entry
  const el = document.getElementById(targetDate);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}


const { performances, acts, stages } = useEventData();

const props = defineProps<{
  filters: {
    stages: string[];
    stageTypes: string[];
    categories: string[];
    actTypes: string[];
    perforTypes: string[];
    performanceTags: string[];
    searchQuery: string;
    actIDs: string[];
    performanceIDs: string[];
  };
}>();


const getStageName = (stageID: number): string => {
  const stage = stages.value.find((stage: Stage) => stage.id === stageID);
  return stage ? stage.name : t('stageNotFound'); // Use translation for "Stage not found"
};

const getActNamesLocal = (actsArr: (number | string)[] = []) =>
  getActNames(actsArr, acts);


const filteredPerformances = computed((): Performance[] => {
  const filters = props.filters;

  return performances.value.filter((perf) => {
    // Stage-Filter
    if (filters.stages.length && !filters.stages.includes(String(perf.stageID))) {
      return false;
    }

    // StageType-Filter
    if (filters.stageTypes.length) {
      const stage = stages.value.find((s) => s.id === perf.stageID);
      if (!stage || !filters.stageTypes.includes(stage.type)) {
        return false;
      }
    }

    // Performance-Type-Filter
    if (filters.perforTypes.length && !filters.perforTypes.includes(perf.type)) {
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
        .flatMap((act) => act!.tags.map((tag) => tag.name));
      /*.flatMap((act) => act!.tags.filter((tag) => tag.visible).map((tag) => tag.name));*/

      const hasMatchingTag = actTags.some((tag) => filters.categories.includes(tag));
      if (!hasMatchingTag) return false;
    }

    // ActType-Filter (Array-based)
    if (filters.actTypes.length) {
      const hasMatchingType = perf.actsIDArr.some((actID) => {
        const act = acts.value.find((a) => a.id === actID);
        const actTypes = act?.['act-type'] || [];
        return actTypes.some((type: string) => filters.actTypes.includes(type));
      });

      if (!hasMatchingType) return false;
    }

    // Act-ID-Filter (For programm list in Act Detail)
    if (
      filters.actIDs.length &&
      !filters.actIDs.some((id) => perf.actsIDArr.includes(Number(id)))
    ) {
      return false;
    }

    // Performance-ID-Filter (for favorites)
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
  })
  .sort(sortByStartTime);
});

function sortByStartTime(a: Performance, b: Performance) {
  return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
}


const groupedByDateAndTime = computed(() => {
  const groups: Record<string, Record<string, Performance[]>> = {};

  for (const perf of filteredPerformances.value) {
    const dateKey = formatDateTime(perf.start_time, 'ISO') // → "2025-07-20"
    const timeKey = formatDateTime(perf.start_time, 'Time');

    if (!groups[dateKey]) groups[dateKey] = {};
    if (!groups[dateKey][timeKey]) groups[dateKey][timeKey] = [];

    groups[dateKey][timeKey].push(perf);
  }

  return groups;
});
</script>

<style scoped>

.date-nav-container {
  display: grid;
  grid-template-columns: 2.5rem auto 2.5rem; /* feste Breite für Buttons */
  align-items: center;
  justify-content: center;
}

.head-date {
  font-size: 1.4rem;
  text-align: center;
}

.nav-arrow {
  width: 2.5rem;
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--list-group-text);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.group-head {
  background-color: var(--list-group);
  color: var(--list-group-text);
}

.head-time {
  font-size: 1.15rem;
}

.list-item-tags span {
  margin-right: 0.4rem;
  
}

</style>
