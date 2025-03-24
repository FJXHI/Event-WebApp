<!-- BackBtn.vue -->
<!-- Button component to navigate back in the browser history -->

<!-- ERROR-FIX Improve Style & Size -->

<template>
  <button @click="goBack" class="back-button">
    <IconArrowLeft />
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import IconArrowLeft from './icons/IconArrowLeft.vue';

const router = useRouter();

// Method to navigate back
const goBack = () => {
  router.go(-1); // Go back one step in the history
};
</script>

<style scoped>
.back-button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
  