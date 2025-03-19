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
        <li>
          <router-link to="/acts">
            <div class="icon-wrapper"><IconActs class="icon" /></div>
            <div class="text-container">
              <span class="title">{{ $t('nav-acts') }}</span>
              <span class="subtext">{{ $t('nav-acts-subtext') }}</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/programm">
            <div class="icon-wrapper"><IconClock class="icon" /></div>
            <div class="text-container">
              <span class="title">{{ $t('nav-timetable') }}</span>
              <span class="subtext" v-if="!isLoading && !error && eventData.startDate && eventData.endDate">
                {{ new Date(eventData.startDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit'}) }} –
                {{ new Date(eventData.endDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
              </span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/locations">
            <div class="icon-wrapper"><IconGeo class="icon" /></div>
            <div class="text-container">
              <span class="title">{{ $t('nav-locations') }}</span>
              <span class="subtext">{{ $t('nav-locations-subtext') }}</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/favorites">
            <div class="icon-wrapper"><IconFav class="icon" /></div>
            <div class="text-container">
              <span class="title">{{ $t('nav-favorites') }}</span>
              <span class="subtext">{{ $t('nav-favorites-subtext') }}</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/about">
            <div class="icon-wrapper"><IconInfo class="icon" /></div>
            <div class="text-container">
              <span class="title">{{ $t('nav-about') }}</span>
              <span class="subtext">{{ $t('nav-about-subtext') }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="footer"></div>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { baseUrl } from '@/config.ts';
import { useEventData } from "@/useEventData.ts";
import IconActs from '@/components/icons/IconPeople.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconGeo from '@/components/icons/IconGeo.vue';
import IconFav from '@/components/icons/IconHeart.vue';
import IconInfo from '@/components/icons/IconInfo.vue';

const { eventInfo, isLoading, error } = useEventData();
const eventData = computed(() => eventInfo.value[0] ?? {});
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

.center li {
  width: 100%;
}

.center a {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.center a:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.icon {
  width: 20px;
  height: 20px;
  fill: brown;
}

.text-container {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: black;
}

.subtext {
  font-size: 14px;
  color: brown;
}
</style>
