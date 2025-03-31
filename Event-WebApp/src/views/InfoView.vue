<!-- InfoView-vue -->
<!-- Shows Information about the Event -->

<template>
  <div>
    <div v-if="isLoading"><p>{{ $t('loading') }}</p></div>
    <div v-else-if="error"><p>{{ error.message }}</p></div>
    
    <div v-else>
      <!-- Event Title and Background -->
      <div :style="{ backgroundImage: 'url(' + eventData.backgroundImage + ')' }" class="event-header">
        <h1>{{ eventData.title }}</h1>
        <h2>{{ eventData.subtitle }}</h2>
      </div>
      <!-- About Section -->
      <div class="event-about">
        <p>{{ formatDateTime(eventData.startDate, 'Date Short') }} - {{ formatDateTime(eventData.endDate, 'Date Long') }}</p>
        <p>{{ eventData.location.name }}: {{ formatAddress(eventData.location.address) }} ({{ eventData.location.gps.latitude }}, {{ eventData.location.gps.longitude }})</p>
        
        <p>{{ eventData.describtion }}</p>
        
        <div v-for="about in eventData.about" :key="about.id">
          <h4>{{ about.name }}</h4>
          <!--<p>{{ about.subtitle }}</p>-->
          <p>{{ about.text }}</p>
        </div>
        <ul class="detail-social-media">
          <SocialMediaLink
            v-for="link in eventData.weblinks"
            :key="link.url"
            :name="link.name"
            :url="link.url"
          />
        </ul>
        <!------------------------------------------------<br/>
        eventData: {{ eventData }}-->
      </div>
    </div>
    <BadgeAuthor position="fixed"/>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventData } from "@/scripts/useEventData";
import { formatDateTime, formatAddress } from "@/scripts/config";
import BadgeAuthor from "@/components/BadgeAuthor.vue";
import SocialMediaLink from "@/components/SocialMediaLink.vue";

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

.detail-social-media {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
