<!-- PopupMessage.vue -->

<template>
    <Transition name="fade">
        <div
        v-if="visible"
        class="popup"
        >
          <div class="popup-content">
            <strong>{{ notification?.title || "Title" }}</strong>
            <p>{{ notification?.body || "Message" }}</p>
            <button class="popup-btn" @click="close">×</button> 
          </div>
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
  }, 15000);
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
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 9999;
}

.popup-content {
  margin: 1rem;
  width: 80%;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: grey;
  color: white;
  box-shadow: 0 8px 12px rgba(0,0,0,0.4);
  max-width: 500px;
}

.popup-btn {
  font-size: 1.2rem;
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
}

.popup-btn {
  /*
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  font-size: 1.2rem;
  transition: color 0.2s ease;*/
}


.popup-btn:hover {
  color: #e74c3c;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}




.popup-content strong {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.popup-content p {
  margin: 0;
  line-height: 1.4;
}








</style>
