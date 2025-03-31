<!-- ScheduleList.vue -->
<!-- A list of program items with a favorite button -->

<template>
  <div>
    <ul>
      <li v-for="performance in filteredPerformances" :key="performance.id" class="list-item-obj">
        <router-link 
          :to="'/event/' + (performance['id-name'] && performance['id-name'].trim() !== '' ? performance['id-name'] : performance.id)"
          class="list-item-link">
          
          <div class="list-item-info">
            <!-- (Other way to show Name and Acts) --
            <strong class="list-item-name">
              <div v-if="performance.name">
                {{ performance.name }}
              </div>
              <div v-else-if="performance.actsIDArr.length">
                {{ getActNames(performance.actsIDArr) }}
              </div>
              <div v-else>
                Unknown Name
              </div>
            </strong>-->

            <strong class="list-item-name">
              <!-- Show only Name if no Acts or add the Acts-->
              <div v-if="performance.name">
                {{ performance.name }} <span v-if="performance.actsIDArr.length">({{ getActNames(performance.actsIDArr) }})</span>
              </div>
              <!-- Show only Acts if no Name -->
              <div v-else-if="performance.actsIDArr.length">
                {{ getActNames(performance.actsIDArr) }}
              </div>
              <div v-else>
                {{ $t('Unknown') }}
              </div>
            </strong>
            <span class="list-item-tags">
              <span>{{ getStageName(performance.stageID) }}: </span>
              <span>
                {{ formatDateTime(performance.start_time, 'Date Long') }}, 
                {{ formatDateTime(performance.start_time, 'Time') }} – 
                {{ formatDateTime(performance.end_time, 'Time') }}
              </span>
            </span>
          </div>
        </router-link>
        <FavoriteButton :itemId="performance.id.toString()" itemType="event" class="list-item-fav-btn"/>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDateTime } from '@/scripts/config';
import { useEventData } from '@/scripts/useEventData';
import FavoriteButton from '@/components/FavBtn.vue';
import type { Act, Stage, Performance } from '@/scripts/useEventData';

const { performances, acts, stages } = useEventData();

const props = defineProps<{
  filter: 'act' | 'location' | 'event' | 'tags' | 'all';
  filterID?: string[]; // Array of tag names
}>();

// fuction to get the stage name
const getStageName = (stageID: number): string => { 
  const stage = stages.value.find((stage: Stage) => stage.id === stageID);
  return stage ? stage.name : 'Stage not found';
};

// function to get the act names
const getActNames = (actsArr: number[] = []): string => {
  return actsArr
    .map((actID) => {
      const act = acts.value.find((act: Act) => act.id === actID);
      return act ? act.name : 'Unknown Artist';
    })
    .join(', ');
};

// **main logic** to filter performances
const filteredPerformances = computed((): Performance[] => {
  let filtered = performances.value;

  if (props.filter !== 'all' && props.filterID?.length) {
    filtered = performances.value.filter((performance: Performance) => {
      // If filter is "location", check if the performance's stageID is in filterID
      if (props.filter === 'location') {
        return props.filterID.includes(String(performance.stageID));
      }
      // If filter is "act", check if any of the acts in the performance match the filterID
      if (props.filter === 'act') {
        return performance.actsIDArr.some((actID) =>
          props.filterID.includes(String(actID))
        );
      }
      // If filter is "event", check if the performance.id is in filterID
      if (props.filter === 'event') {
        return props.filterID.includes(String(performance.id));
      }
      // otherwise, filter by tags
      return performance.actsIDArr.some((actID) => {
        const act = acts.value.find((act: Act) => act.id === actID);
        return act?.tags.some((tag) => tag.visible && props.filterID?.includes(tag.name));
      });
    });
  }

  // sort by start_time (ascending)
  return filtered.sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

/*
.performance-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  background: #fff;
  list-style: none;
}

.performance-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
}

.performance-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.performance-content a {
  flex-grow: 1;
  display: flex;
  text-decoration: none;
  color: inherit;
}

.performance-location {
  font-size: 0.9rem;
  color: #444;
  margin-top: 5px;
}

.fav-btn {
  flex-shrink: 0;
  margin-left: 10px;
}
*/
</style>
