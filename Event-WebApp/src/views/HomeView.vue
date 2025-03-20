<template>
  <main>
    <div class="head">
      <div v-if="isLoading"><p>{{ $t('loading') }}</p></div>
      <div v-else-if="error"><p>{{ error.message }}</p></div>
      <div v-else>
        <div v-if="eventData.title" :style="{ backgroundImage: 'url(' + baseUrl + 'images/' + eventData.backgroundImage + ')' }" class="event-header">
          <h1 class="titlemain glow">{{ eventData.title }}</h1>
          <h2 class="subtitle glow">{{ eventData.subtitle }}</h2>
        </div>
      </div>
    </div>
    <div class="center">
      <ul>
        <LinkItem to="/acts" :icon="IconActs" title="nav-acts" subtext="nav-acts-subtext" />
        <LinkItem to="/programm" :icon="IconClock" title="nav-timetable" :subtext="formattedDateRange" />
        <LinkItem to="/locations" :icon="IconGeo" title="nav-locations" subtext="nav-locations-subtext" /><!-- TODO: Count Stages -->
        <LinkItem to="/favorites" :icon="IconFav" title="nav-favorites" subtext="nav-favorites-subtext" />
        <LinkItem to="/about" :icon="IconInfo" title="nav-about" subtext="nav-about-subtext" />
      </ul>
    </div>
    <div class="footer"></div>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { baseUrl, formatDateTime } from '@/config.ts';
import { useEventData } from "@/useEventData.ts";
import LinkItem from '@/components/LinkItem.vue';
import IconActs from '@/components/icons/IconPeople.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconGeo from '@/components/icons/IconGeo.vue';
import IconFav from '@/components/icons/IconHeart.vue';
import IconInfo from '@/components/icons/IconInfo.vue';

const { eventInfo, isLoading, error } = useEventData();
const eventData = computed(() => eventInfo.value[0] ?? {});


const formattedDateRange = computed(() => {
  if (!eventData.value.startDate || !eventData.value.endDate) {
    return "";
  }
  return eventData.value.startDate === eventData.value.endDate
    ? formatDateTime(eventData.value.startDate, "Date Long")
    : `${formatDateTime(eventData.value.startDate, "Date Short")} – ${formatDateTime(eventData.value.endDate, "Date Long")}`;
});

</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow: hidden;
}

.head {
  flex-shrink: 0;
  max-height: 40vh;
}

.event-header {
  padding: 40px;
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 40vh;
  position: relative;
}

.event-header h1, .event-header h2 {
  margin: 0;
}

.glow {
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
}

.center {
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  margin-top: auto;
}

.center ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
