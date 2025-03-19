<template>
  <header>
    <!-- Top Navigation Menu -->
    <div class="topnav">
      <div class="active">{{ currentPage }}</div>
      <button class="menu-btn" @click="toggleNav">☰</button>
    </div>
    
    <div class="nav-overlay" v-if="isNavOpen" @click="toggleNav"></div>
    
    <nav class="side-nav" :class="{ open: isNavOpen }">
      <button class="close-btn" @click="toggleNav">✖</button>
      <router-link to="/" @click="toggleNav" class="nav-link">{{ $t('nav-home') }}</router-link>
      <router-link to="/acts" @click="toggleNav" class="nav-link">{{ $t('nav-acts') }}</router-link>
      <router-link to="/locations" @click="toggleNav" class="nav-link">{{ $t('nav-locations') }}</router-link>
      <router-link to="/favorites" @click="toggleNav" class="nav-link">{{ $t('nav-favorites') }}</router-link>
      <router-link to="/about" @click="toggleNav" class="nav-link">{{ $t('nav-about') }}</router-link>
      <router-link to="/programm" @click="toggleNav" class="nav-link">{{ $t('nav-timetable') }}</router-link>
      <router-link to="" class="nav-link"><LangSwitch /></router-link>
    </nav>
  </header>
  
  <router-view class="router-view"/>
  <PWABadge />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import LangSwitch from '@/components/LangSwitch.vue';
import PWABadge from '@/components/PWABadge.vue';

const isNavOpen = ref(false);
const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

const route = useRoute();
const currentPage = computed(() => {
  const routeMap: Record<string, string> = {
    '/': 'Home',
    '/acts': 'Acts Overview',
    '/locations': 'Locations',
    '/favorites': 'Favoriten',
    '/about': 'Information',
    '/programm': 'Programm'
  };
  // chech if the route starts with '/act/'
  if (route.path.startsWith('/act/')) {
    return 'Acts';
  }
  if (route.path.startsWith('/location/')) {
    return 'Locations';
  }
  if (route.path.startsWith('/event/')) {
    return 'Event';
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

.topnav {
  display: flex;
  height: 10%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: white;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

.side-nav {
  position: fixed;
  top: 0;
  right: -250px;
  width: 250px;
  height: 100%;
  background-color: #222;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: right 0.3s ease;
  z-index: 20;
}

.side-nav.open {
  right: 0;
}

.side-nav a {
  color: white;
  text-decoration: none;
  padding: 0.75rem 0;
  font-size: 1.2rem;
}

.side-nav a:hover {
  background-color: #444;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  align-self: flex-end;
  cursor: pointer;
}

.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 15;
}
</style>
