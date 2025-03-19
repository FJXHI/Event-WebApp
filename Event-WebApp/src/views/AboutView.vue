<template>
  <div v-if="isLoading">
    <p>Lade Event-Daten...</p>
  </div>
  
  <div v-else-if="error">
    <p>{{ error }}</p>
  </div>
  
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
      <h3>About</h3>
      
      <p>Descrip Short: {{ eventData['short-describtion'] }}</p>
      <p>Descrip: {{ eventData.describtion }}</p>
      <p>{{ eventData.startDate }} -- {{ eventData.endDate }}</p>
      <p></p>

      eventData: {{ eventData }}
      </div>

    
  </div>
  <div>
    <br>
    <a href="https://github.com/FJXHI/Event-WebApp">&copy; 2025 by FJXHI</a>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventData } from "@/useEventData.ts";
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
  color: white;
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
