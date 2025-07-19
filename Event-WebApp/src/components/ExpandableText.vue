<template>
  <div>
    <p>
      {{ isExpanded ? text : truncatedText }}
      <span v-if="!isExpanded && isTruncated">...</span><a v-if="isTruncated" class="more-button" @click="toggle">{{ isExpanded ? $t('show-less')  : $t('show-more') }}</a> 
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { defineProps } from 'vue'

const props = defineProps<{
  text: string
  maxLength?: number
}>()

const isExpanded = ref(false)
const toggle = () => {
  isExpanded.value = !isExpanded.value
}

// Set default for maxLength
const maxLength = computed(() => props.maxLength ?? 200)

const isTruncated = computed(() => props.text.length > maxLength.value)
const truncatedText = computed(() => props.text.slice(0, maxLength.value))
</script>

<style scoped>
.more-button {
  color: var(--link-color);
  cursor: pointer;
}

</style>
