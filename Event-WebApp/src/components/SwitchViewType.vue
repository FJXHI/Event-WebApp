<template>
    <button @click="emit('toggle')">
      {{ label }}
    </button>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue'
  
  const props = defineProps<{
    stageTypeFilter: string
  }>()
  
  const emit = defineEmits<{
    (e: 'toggle'): void
  }>()
  
  const label = computed(() => {
    switch (props.stageTypeFilter) {
      case 'stage':
        return 'Nur Bühnen'
      case 'workshop':
        return 'Nur Workshops'
      case 'all':
      default:
        return 'Alle Locations'
    }
  })
  </script>