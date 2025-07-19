<template>
  <img
    v-if="validImage"
    :src="resolvedSrc"
    class="detail-view-img"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { baseUrl } from '@/scripts/functions';

const props = defineProps<{
  image?: string
}>()

const showImage = ref(true)

const validImage = computed(() =>
  showImage.value && props.image?.trim()
)

const resolvedSrc = computed(() =>
  props.image?.startsWith('http') ? props.image : baseUrl + props.image
)

function handleError(event: Event) {
  const img = event.target as HTMLImageElement
  img.remove()
  showImage.value = false
}
</script>

<style scoped>
.detail-view-img {
  /* Ring-color in base.css */
  border: 4px solid var(--bg-space);
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -60px;
  background-color: var(--bg-space);

  /*left: 40%;
  top: -70px;*/ /* Dont Work ??? */

  /*width: 100%;
  height: auto;
  /*display: block;*/
}
</style>
