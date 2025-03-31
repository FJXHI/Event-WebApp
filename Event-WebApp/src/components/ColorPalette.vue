<template>
    <div class="space-y-6">
        <h2 class="text-xl font-semibold">Color Palette Debug ({{ colorPalette.length }})</h2>
        <div class="space-y-2 mt-6">
            <label class="block font-medium text-sm">Testing Color: </label>
            <input
            v-model="tagName"
            type="text"
            placeholder="Tag Name"
            class="px-3 py-2 border rounded w-full max-w-xs"
            />
            <div
            v-if="tagName"
            class="color-preview"
            :style="{ backgroundColor: tagColor }"
            >
            <span>{{ tagColor }}</span>
            </div>
            <div class="color-grid">
                <div
                    v-for="(color, i) in colorPalette"
                    :key="'light-' + i"
                    class="color-preview"
                    :style="{ backgroundColor: color }"
                >
                    <span>{{ color }}</span>
                </div>
            </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { colorPalette, getColorForTag } from '@/scripts/config'
  import { ref, computed } from 'vue'
  
  const tagName = ref('')
  
  const tagColor = computed(() => getColorForTag(tagName.value))
  </script>
  
  <style scoped>
  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
    gap: 0.5rem;
  }
  
  .color-preview {
    width: 6rem;
    height: 3rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-family: monospace;
    color: white;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
  }
  </style>
  