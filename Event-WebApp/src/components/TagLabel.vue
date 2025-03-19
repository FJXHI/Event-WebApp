<!-- TagLabel.vue -->

<template>
  <component
      :is="tag"
      class="tag-label"
      :class="{ 'is-button': tag === 'button' }"
      :style="{ cursor: tag === 'button' ? 'pointer' : 'default' }"
      
      @click="$emit('click')"
  >
      <span class="tag-dot" :style="{ backgroundColor: finalColor }"></span>
      <span class="tag-name">{{ name }}</span>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { getColorForTag } from '@/scripts/functions'

const emit = defineEmits(['click'])

const props = defineProps({
  name: {
      type: String,
      required: true
  },
  color: {
      type: String,
      default: ''
  },
  tag: {
      type: String,
      default: 'div'
  }
})

const finalColor = computed(() => {
  return props.color || getColorForTag(props.name)
})
</script>

<style scoped>
.tag-label {
  display: inline-flex;
  align-items: center;
  /*gap: 0.4em;
  padding: 0.4rem 1rem;*/
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid var(--taglabel-border);
  background-color: var(--taglabel-bg);
  color: var(--taglabel-text);
  cursor: default;
  transition: all 0.2s;
  font-size: 0.85em; /* text-sm */
  font-weight: 500;
  white-space: nowrap;
}

.tag-label.is-button {
  cursor: pointer;
}

.tag-label.is-button:hover {
  opacity: 0.8;
}

.tag-dot {
  width: 0.7em;
  height: 0.7em;
  border-radius: 50%;
}
</style>
