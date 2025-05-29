<!-- NoEntries.vue -->

<template>
    <div class="no-results">
        <p>{{ $t(`noResults.${type}`) }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    type: 'acts' | 'locations' | 'event' | 'favorites'
}>()
</script>

<style scoped>
.no-results {
    padding: 1rem;
    text-align: center;
    /* color: #666; */
    font-style: italic;
    }
</style>
  