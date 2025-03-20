<!-- ProgrammList.vue -->
<!-- A list of program items with a favorite button -->

<template>
  <div>
    <ul>
      <li v-for="performance in filteredPerformances" :key="performance.id" class="list-item-obj">
        <router-link 
          :to="'/event/' + (performance['id-name'] && performance['id-name'].trim() !== '' ? performance['id-name'] : performance.id)"
          class="list-item-link">
          
          <div class="list-item-info">
            <strong class="list-item-name">
              {{ performance.name }} ({{ getActNames(performance.actsIDArr) }})
              <!-- ERROR-FIX Maybe EventName is NULL -->
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
import { formatDateTime } from '@/config.ts';
import { useEventData } from '@/useEventData.ts';
import FavoriteButton from '@/components/FavBtn.vue';
import type { Act, Stage, Performance } from '@/useEventData.ts';

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
  if (props.filter === 'all' || !props.filterID?.length) {
    return performances.value;
  }

  return performances.value.filter((performance: Performance) => {
    if (props.filter === 'location') {
      // If filter is "location", check if the performance's stageID is in filterID
      return props.filterID?.includes(String(performance.stageID));
    }

    if (props.filter === 'act') {
      // If filter is "act", check if any of the acts in the performance match the filterID
      return performance.actsIDArr.some((actID) => {
        return props.filterID?.includes(String(actID)); // filterID contains the Act-IDs
      });
    }

    if (props.filter === 'event') {
      // If filter is "event", check if the performance.id is in filterID
      return props.filterID?.includes(String(performance.id));
    }

    // otherwise, filter by tags
    return performance.actsIDArr.some((actID) => {
      const act = acts.value.find((act: Act) => act.id === actID);
      return act?.tags.some((tag) => tag.visible && props.filterID?.includes(tag.name));
    });
  });
});

/* //other implementation of filteredPerformances
const filteredPerformances = computed((): Performance[] => {
  // log the filter type and filter IDs
  console.log("Filter Type:", props.filter);
  console.log("Filter IDs:", props.filterID); 

  if (props.filter === 'all' || !props.filterID?.length) {
    return performances.value;
  }

  return performances.value.filter(performance => {
    if (props.filter === 'location') {
      return props.filterID?.includes(performance.stageID.toString());
    }
    if (props.filter === 'act') {
      return performance.actsIDArr.some(actID => props.filterID?.includes(actID.toString()));
    }
    if (props.filter === 'event') {
      return props.filterID?.includes(performance.id.toString());
    }
    return performance.actsIDArr.some(actID => {
      const act = acts.value.find(act => act.id === actID);
      return act?.tags.some(tag => tag.visible && props.filterID?.includes(tag.name));
    });
  });
});
*/

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
