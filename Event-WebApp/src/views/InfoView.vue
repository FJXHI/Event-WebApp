<!-- InfoView-vue -->
<!-- Shows Information about the Event -->

<template>
  <div class="scroll-area">
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
        
        <p>{{ eventData.describtion }}</p>
        
        <p>{{ eventData.location.name }}: {{ formatAddress(eventData.location.address) }}
          <a :href="`geo:${eventData.location.gps.latitude},${eventData.location.gps.longitude}`"
            v-if="true"><!--ERROR-FIX isMobile dont work-->
            ({{ eventData.location.gps.latitude }}, {{ eventData.location.gps.longitude }})
          </a>
          <a :href="`https://www.google.com/maps/search/?api=1&query=${eventData.location.gps.latitude},${eventData.location.gps.longitude}`"
            v-else>
            ({{ eventData.location.gps.latitude }}, {{ eventData.location.gps.longitude }})
          </a>
        </p>

        <div v-for="about in eventData.about" :key="about.id" class="about-section">
          <h4 @click="toggleAbout(about.id)" class="about-toggle">
            {{ about.name }}
            <span>{{ expandedAboutIds.includes(about.id) ? '▲' : '▼' }}</span>
          </h4>
          <transition name="fade">
            <p v-if="expandedAboutIds.includes(about.id)">{{ about.text }}</p>
          </transition>
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
import { formatDateTime, formatAddress } from "@/scripts/functions";
import BadgeAuthor from "@/components/BadgeAuthor.vue";
import SocialMediaLink from "@/components/SocialMediaLink.vue";

const { eventInfo, isLoading, error } = useEventData();
// shorthand for eventObj
const eventData = computed(() => eventInfo.value[0] ?? {});

import { ref } from "vue";

// IDs der aktuell geöffneten Abschnitte
const expandedAboutIds = ref<number[]>([]);

function toggleAbout(id: number) {
  const index = expandedAboutIds.value.indexOf(id);
  if (index > -1) {
    expandedAboutIds.value.splice(index, 1);
  } else {
    expandedAboutIds.value.push(id);
  }
}
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

.about-toggle {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.about-section {
  margin-bottom: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


</style>
