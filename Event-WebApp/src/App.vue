<template>
  <header>
    <NavMenu :PageName="currentPage"/>
  </header>
  
  <router-view class="router-view"/>
  <PWABadge />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import NavMenu from './components/NavMenu.vue';
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
    '/map': 'nav-map'
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

  return routeMap[route.path] || 'Unbekannte Seite';
});


</script>

<style scoped>
.router-view {
  height: 90%;
  /* margin-left: 0.5rem;
  margin-right: 0.5rem;*/
}
</style>
