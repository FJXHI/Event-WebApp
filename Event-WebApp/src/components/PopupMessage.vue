<!-- PopupMessage.vue -->

<template>
    <Transition name="fade">
        <div
        v-if="visible"
        class="popup"
        >
            <strong>{{ notification?.title }}</strong>
            <p>{{ notification?.body }}</p>
            <button @click="close">×</button>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { messaging, onMessage } from '@/scripts/firebase';

const visible = ref(false);
const notification = ref<{ title: string; body: string } | null>(null);
let timeout: number | null = null;

function showPopup(payload: any) {
  notification.value = {
    title: payload?.notification?.title || 'Nachricht',
    body: payload?.notification?.body || '',
  };
  visible.value = true;

  if (timeout) clearTimeout(timeout);
  timeout = window.setTimeout(() => {
    visible.value = false;
  }, 5000);
}

function close() {
  visible.value = false;
  if (timeout) clearTimeout(timeout);
}

onMounted(() => {
  onMessage(messaging, (payload) => {
    console.log('[Foreground FCM] Nachricht empfangen:', payload);
    showPopup(payload);
  });
});
</script>

<style scoped>
.popup {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: #333;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.4);
  z-index: 9999;
  max-width: 300px;
}
.popup button {
  position: absolute;
  top: 0.25rem;
  right: 0.5rem;
  background: transparent;
  color: white;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
