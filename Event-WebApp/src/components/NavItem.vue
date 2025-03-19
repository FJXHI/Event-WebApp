<template>
    <router-link :to="to" class="nav-link" @click="$emit('click')">
      <component :is="icon" class="nav-icon" v-if="icon" />
      <span class="nav-label">{{ label }}</span>
    </router-link>
  </template>
  
  <script setup>
  defineProps({
    to: { type: String, required: true },
    label: { type: String, required: true },
    icon: { type: Object, default: null }
  })
  defineEmits(['click'])
  </script>
  
  <style scoped>
  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    text-decoration: none;
  }
  .nav-icon {
    width: 1.2em;
    height: 1.2em;
  }
  </style>
  