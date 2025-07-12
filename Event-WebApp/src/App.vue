<!-- App.vue -->

<template>
  <div class="app-container full-height">
    <header class="app-header">
      <NavMenu :PageName="currentPage" @open-share="openShareModal"/>
    </header>
    <PopupMessage />
    <router-view class="router-view"/>
    <PopupModal />
    <ShareModal v-model:visible="visibleShare" :link="currentUrl" />
    <ImportFav />
    
    <footer class="app-footer">
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { baseUrl } from './scripts/functions';
import NavMenu from './components/NavMenu.vue';
import PopupModal from '@/components/PopupModal.vue';
import PopupMessage from '@/components/PopupMessage.vue';
import ImportFav from './components/ImportFav.vue';
import ShareModal from './components/ShareModal.vue';

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

const currentUrl = computed(() => {
  const Url = window.location.origin + baseUrl;
  return Url.replace(/\/$/, '') + route.fullPath;
});

const visibleShare = ref(false);

function openShareModal() {
  visibleShare.value = true;
}

</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /*height: 100%; /* Remove Height Problem with Browser Address bar */
  overflow: hidden;
}

.router-view {
  flex: 1 1 auto;
  overflow: hidden; /* damit nur der Inhalt scrollt */
  display: flex;
  flex-direction: column;
}

.app-footer {
  /* possible solution for height problem with browser address bar */
  height: 0px; /* 40px; */
  flex-shrink: 0;
}

</style>
