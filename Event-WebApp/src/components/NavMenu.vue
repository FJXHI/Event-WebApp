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

      <button class="topnav-btn" v-if="showSearch" @click="openSearch">
        <IconSearch class="icon-size"/>
      </button>
      <button class="topnav-btn" v-if="showFavQuery" @click="openFav">
        <IconHeart :fill="isFav ? 'red' : 'white'" class="icon-size" />
      </button>
      <router-link v-if="showFav" to="/favorites" class="topnav-btn">
        <IconHeart class="icon-size"/>
      </router-link>
      <button class="topnav-btn" @click="$emit('open-share')">
        <IconShare class="icon-size"/>
      </button>
      <button class="topnav-btn menu-btn" @click="toggleNav"><IconList class="icon-size" /></button>
    </div>
    
    <div class="nav-overlay" v-if="isNavOpen" @click="toggleNav"></div>
    
    <nav class="side-nav" :class="{ open: isNavOpen }">
      <div>
        <!-- Logo -->
        <!--<button class="close-btn" @click="toggleNav">✖</button>-->
      </div>
      <button class="close-btn" @click="toggleNav"><!--<IconXlarg />-->✖</button>
      <NavItem to="/" :label="t('nav-home')" :icon="IconHome" @click="toggleNav" />
      <NavItem to="/favorites" :label="t('nav-favorites')" :icon="IconHeart" @click="toggleNav" />
      <NavItem to="/schedule" :label="t('nav-timetable')" :icon="IconClock" @click="toggleNav" />
      <NavItem to="/acts" :label="t('nav-acts')" :icon="IconActs" @click="toggleNav" />
      <NavItem to="/locations" :label="t('nav-locations')" :icon="IconGeo" @click="toggleNav" />
      <NavItem to="/map" :label="t('nav-map')" :icon="IconMap" @click="toggleNav" />
      <NavItem to="/news" :label="t('nav-news')" :icon="IconNews" @click="toggleNav" />
      <NavItem to="/about" :label="t('nav-about')" :icon="IconInfo" @click="toggleNav" />
      <NavItem to="/settings" :label="t('nav-settings')" :icon="IconSetting" @click="toggleNav" />
      <BadgeAuthor position="static"/>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
import NavItem from './NavItem.vue';
import BadgeAuthor from './BadgeAuthor.vue';

import IconHome from '@/components/icons/IconHome.vue'
import IconActs from '@/components/icons/IconPeople.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconGeo from '@/components/icons/IconGeo.vue'
import IconInfo from '@/components/icons/IconInfo.vue'
import IconMap from '@/components/icons/IconMap.vue'
import IconHeart from './icons/IconHeart.vue';
import IconHeartFav from './icons/IconHeartFav.vue';
import IconList from './icons/IconList.vue';
import IconArrowLeft from './icons/IconArrowLeft.vue';
import IconShare from './icons/IconShare.vue';
import IconSearch from './icons/IconSearch.vue';
import IconSetting from './icons/IconSetting.vue';
import IconNews from './icons/IconNews.vue';

const { t } = useI18n()

const router = useRouter();
// Method to navigate back
const goBack = () => {
  router.go(-1); // Go back one step in the history
};

const search = computed(() => route.query.search ?? 'false')
const fav = computed(() => route.query.fav ?? 'false')
const isFav = computed(() => fav.value === 'true');

function openSearch() {
  const newStatus = search.value === 'false' ? 'true' : 'false';
  if (newStatus === 'true') {
    router.replace({ query: { ...route.query, search: newStatus } });
  } else {
    const { search, ...rest } = route.query; 
    router.replace({ query: rest });
  }
}

function openFav() {
  const newStatus = fav.value === 'false' ? 'true' : 'false';
  if (newStatus === 'true') { 
    router.replace({ query: { ...route.query, fav: newStatus } });
  } else {
    const { fav, ...rest } = route.query; 
    router.replace({ query: rest });
  }
}

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
const showSearch = computed(() => route.path === '/schedule' || route.path === '/acts' || route.path === '/locations');
const showFav = computed(() => route.path !== '/favorites' && route.path !== '/' && !showFavQuery.value);
const showFavQuery = computed(() => route.path === '/schedule' || route.path === '/acts' || route.path === '/locations');
</script>

<style scoped>
.icon-size {
  width: 1.9rem;
  height: 1.9rem;
  vertical-align: middle;
}

.topnav {
  display: flex;
  height: 3.5rem;  
  justify-content: space-between;
  align-items: center;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  background-color: var(--bg-topnav);
  color: var(--text-topnav);
  gap: 0.1rem;
}

.topnav-btn {
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0.3rem;
  height: 3.5rem;
  color: var(--text-topnav);
  cursor: pointer;
}

.topnav-btn:focus {
  outline: none; /* remove the default focus outline */
}

.pagename {
  flex-grow: 1;
  padding-left: 0.5rem;
  font-size: min(6vw, 1.5rem);
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
  background-color: var(--bg-sidenav);
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
  color: var(--text-sidenav);
  text-decoration: none;
  padding: 0.7rem 0;
  font-size: 1.2rem;
}

.side-nav a:hover {
  background-color: var(--bg-sidenav-hover); 
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-sidenav);
  font-size: 1.5rem;
  align-self: flex-end;
  cursor: pointer;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
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