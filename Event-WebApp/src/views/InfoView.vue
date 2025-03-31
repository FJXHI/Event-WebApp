<!-- InfoView-vue -->
<!-- Shows Information about the Event -->

<template>
  <div v-if="isLoading"><p>{{ $t('loading') }}</p></div>
  <div v-else-if="error"><p>{{ error.message }}</p></div>
  
  <div v-else>
    <!-- Event Title and Background -->
    <div :style="{ backgroundImage: 'url(' + eventData.backgroundImage + ')' }" class="event-header">
      <h1>{{ eventData.title }}</h1>
      <h2>{{ eventData.subtitle }}</h2>
    </div>
    <div>
      
    </div>

    <!-- About Section -->
    <div class="event-about">
      <h3>{{ $t('info') }}:</h3>
      
      <!--<p>Descrip Short: {{ eventData['short-describtion'] }}</p>-->
      <p>{{ eventData.describtion }}</p>
      <p>{{ eventData.startDate }} -- {{ eventData.endDate }}</p>
      <p></p>

      <!--eventData: {{ eventData }}-->
      </div>

    
  </div>
  <BadgeAuthor position="fixed"/>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventData } from "@/scripts/useEventData";
import BadgeAuthor from "@/components/BadgeAuthor.vue";

const { eventInfo, isLoading, error } = useEventData();
// shorthand for eventObj
const eventData = computed(() => eventInfo.value[0] ?? {});


/*
const filteredTimetable = timetable.value.filter((perf) => perf.startDate === "2025-03-16");
      const filteredTimetable = timetable.value.filter((perf) => perf.startTime < "20:00");
*/
</script>

<style scoped>
.event-header {
  padding: 20px;
  background-size: cover;
  background-position: center;
}

.event-header h1, .event-header h2 {
  margin: 0;
}

.event-about {
  padding: 20px;
}

.event-about p {
  margin: 10px 0;
}
</style>
