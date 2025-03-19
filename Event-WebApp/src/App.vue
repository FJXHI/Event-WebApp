<!-- App.vue -->

<template>
  <div class="app-container full-height">
    <header class="app-header">
      <NavMenu :PageName="currentPage"/>
    </header>

    <router-view class="router-view full-height"/>
    <PopupModal />
    <PWABadge />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import NavMenu from './components/NavMenu.vue';
import PopupModal from '@/components/PopupModal.vue';
import PWABadge from '@/components/PWABadge.vue';

const route = useRoute();
const currentPage = computed(() => {
  const routeMap: Record<string, string> = {
    '/': 'nav-home',
    '/acts': 'nav-acts',
    '/locations': 'nav-locations',
    '/favorites': 'nav-favorites',
    '/about': 'nav-about',
    '/schedule': 'nav-timetable',
    '/timetable': 'nav-timetable',
    '/map': 'nav-map',
    '/settings': 'nav-settings',
    '/news': 'nav-news'
  };
  // chech if the route starts with '/act/'
  if (route.path.startsWith('/act/')) {
    return 'nav-acts';
  }
  if (route.path.startsWith('/location/')) {
    return 'nav-locations';
  }
  if (route.path.startsWith('/event/')) {
    return 'nav-timetable';
  }

  return routeMap[route.path] || 'nav-unknown-site';
});


</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.scroll-old {
  flex-grow: 1;
  /*overflow-y: auto;*/
}

.router-view {
  height: 90%;
  /*overflow: hidden; /* wichtig: die innere Scroll-Area übernimmt */
  /*height: 90%;
  position: sticky;*/
  /* margin-left: 0.5rem;
  margin-right: 0.5rem;*/
}


</style>
