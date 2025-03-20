<template>
    <div class="topnav">
      <!-- Dont show PageName and BackBtn on Homesite -->
      <div v-if="!isHomePage && showBack" class="back-btn"><BackBtn/></div>
      <!-- Show BackBtn and PageName on all other sites -->
      <div class="pagename" v-if="!isHomePage">{{ $t(PageName) }}</div>
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import BackBtn from './BackBtn.vue';
import LangSwitch from '@/components/LangSwitch.vue';

const props = withDefaults(defineProps<{ 
  PageName: string; 
  showBack?: boolean; 
}>(), {
  showBack: true, // default value is true
});


const isNavOpen = ref(false);
const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

// check if the current page is the home page
const route = useRoute();
const isHomePage = computed(() => route.path === '/');

</script>

<style scoped>

.topnav {
  display: flex;
  height: 10%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--color-bg-theme-top);
  color: var(--vt-c-white);
}

.back-btn {
  margin-right: 10px; /* add space between back button and page name */
}

.pagename {
  flex-grow: 1;
  text-align: center;
  font-size: 1.8rem;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--vt-c-white);
  cursor: pointer;
  margin-left: auto; /* the menu button is always on the right side */
}

.side-nav {
  position: fixed;
  top: 0;
  right: -55%;
  width: 55%;
  height: 100%;
  background-color: var(--vt-c-black-soft);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: right 0.3s ease;
  z-index: 20;
  /* include .side-nav a not posible, because of "a" in main.css */
}

.side-nav.open {
  right: 0;
}

.side-nav a {
  color: var(--vt-c-white);
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
  color: var(--vt-c-white);
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