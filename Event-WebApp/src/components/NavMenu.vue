<!-- NavMenu.vue -->
<!-- The side NaviMenu and Header for all Pages -->

<template>
    <div class="topnav">
      <!-- Dont show PageName and BackBtn on Homesite -->
      <!-- Show BackBtn and PageName on all other sites -->
      <button v-if="!isHomePage && showBack" @click="goBack" class="topnav-btn back-btn">
        <IconArrowLeft class="icon-size"/>
      </button>
      <div class="pagename" v-if="!isHomePage">{{ $t(PageName) }}</div>
      <button class="topnav-btn menu-btn" @click="toggleNav"><IconList class="icon-size" /><!--☰--></button>
    </div>
    
    <div class="nav-overlay" v-if="isNavOpen" @click="toggleNav"></div>
    
    <nav class="side-nav" :class="{ open: isNavOpen }">
      <button class="close-btn" @click="toggleNav"><!--<IconXlarg />-->✖</button>
      <router-link to="/" @click="toggleNav" class="nav-link">{{ $t('nav-home') }}</router-link>
      <router-link to="/acts" @click="toggleNav" class="nav-link">{{ $t('nav-acts') }}</router-link>
      <router-link to="/locations" @click="toggleNav" class="nav-link">{{ $t('nav-locations') }}</router-link>
      <router-link to="/favorites" @click="toggleNav" class="nav-link">{{ $t('nav-favorites') }}</router-link>
      <router-link to="/about" @click="toggleNav" class="nav-link">{{ $t('nav-about') }}</router-link>
      <router-link to="/schedule" @click="toggleNav" class="nav-link">{{ $t('nav-timetable') }}</router-link>
      <router-link to="/map" @click="toggleNav" class="nav-link">{{ $t('nav-map') }}</router-link>
      <router-link to="" class="nav-link"><LangSwitch /></router-link>
      <BadgeAuthor position="static"/>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LangSwitch from '@/components/LangSwitch.vue';
import BadgeAuthor from './BadgeAuthor.vue';
import IconList from './icons/IconList.vue';
import IconArrowLeft from './icons/IconArrowLeft.vue';

const router = useRouter();
// Method to navigate back
const goBack = () => {
  router.go(-1); // Go back one step in the history
};


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
/* ERROR-FIX Improve Styling .topnav on HomeView */

.icon-size {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

.topnav {
  display: flex;
  height: 10%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--color-bg-theme-topnav);
  color: var(--color-text-theme-topnav);
}

.topnav-btn {
  background: none;
  border: none;
  padding: 0.1rem;
  color: var(--color-text-theme-topnav);
  cursor: pointer;
}


.back-btn {
  margin-right: 10px; /* add space between back button and page name, not necessary any more */
}

.pagename {
  flex-grow: 1;
  text-align: center;
  font-size: 1.8rem;
}

.menu-btn {
  margin-left: auto; /* the menu button is always on the right side */
}

.side-nav {
  position: fixed;
  top: 0;
  right: -55%;
  width: 55%;
  height: 100%;
  background-color: var(--color-bg-theme-sidenav);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: right 0.3s ease;
  z-index: 1000;
  /* include .side-nav a not posible, because of "a" in main.css */
}

.side-nav.open {
  right: 0;
}

.side-nav a {
  color: var(--color-text-theme-sidenav);
  text-decoration: none;
  padding: 0.75rem 0;
  font-size: 1.2rem;
}

.side-nav a:hover {
  background-color: var(--color-bg-theme-sidenav-hover); 
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text-theme-sidenav);
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