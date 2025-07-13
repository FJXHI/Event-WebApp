<!-- PopupModal.vue -->
<!-- A Vue component for displaying a disclaimer modal on page load. -->
<!-- ERROR-FIX Translate & Style (add Cookies?) -->

<template>
  <PopupModal v-model="showDisclaimer" :show-default-close="false">
    <h2>{{ $t('app-unofficial') }}</h2>
    <p>{{ $t('app-unofficial-desc') }}</p>
    <button @click="acceptDisclaimer">{{ $t('accept-disclaimer') }}</button>
  </PopupModal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PopupModal from './PopupModalTemp.vue'

const showDisclaimer = ref(false)

onMounted(() => {
  const accepted = localStorage.getItem('disclaimerAccepted')
  if (!accepted) {
    showDisclaimer.value = true
  }
})

function acceptDisclaimer() {
  localStorage.setItem('disclaimerAccepted', 'true')
  showDisclaimer.value = false
}
</script>



  
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content button {
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #2a6dff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #1e54c4;
}
</style>
  