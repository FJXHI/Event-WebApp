<!-- LinkItem.vue -->
<!-- Render a link entry for homeview -->

<template>
  <li>
    <router-link :to="to">
      <div class="icon-wrapper">
        <component :is="icon" class="icon" />
      </div>
      <div class="text-container">
        <span class="title">{{ translate(title) }}</span>
        <span class="subtext" v-if="subtext">{{ translate(subtext) }}</span>
      </div>
    </router-link>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, te } = useI18n(); // `t` for translations, `te` to check if a key exists

const props = defineProps({
to: String,
icon: Object,
title: String,
subtext: String
});

const translate = (key) => (te(key) ? t(key) : key);
</script>

<style scoped>
.center a {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  color: var(--home-title); /* home nav Title Text Color */
  text-decoration: none;
  font-size: 16px;
  border-radius: 8px;
  transition: background-color 0.2s;
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
  fill: var(--home-icon);
}

.text-container {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.subtext {
  font-size: 14px;
  color: var(--home-sub);
}
</style>