<!-- ShareModal.vue -->

<template>
  <PopupModal :model-value="props.visible" @update:modelValue="val => emit('update:visible', val)">

    <h2>{{ $t('share-it') }}</h2>
    <input type="checkbox" id="check_sharefav" v-model="shareFav" />
    <label for="check_sharefav">{{ $t('share-fav') }}</label>
    <p v-if="copied" class="copied-text">Link kopiert!</p>

    <!-- QR Code Modal -->
    <PopupModal v-model="visibleQRcode">
      <vue-qrcode v-if="computedLink" class="share-button" :value="computedLink"></vue-qrcode>
    </PopupModal>
    <div class="share-buttons">
      <button class="share-button" @click="copyToClipboard">Zwischenablage kopieren</button>
      <button class="share-button" @click="showQRcode">QR Code</button>
      
      <a
        :href="`https://x.com/intent/post?text=%20${encodeURIComponent(computedLink)}`"
        target="_blank"
        rel="noopener"
        class="share-button twitter"
      >X</a>
      <a
        :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(computedLink)}`"
        target="_blank"
        rel="noopener"
        class="share-button facebook"
      >Facebook</a>
      <a
        :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(computedLink)}`"
        target="_blank"
        rel="noopener"
        class="share-button whatsapp"
      >WhatsApp</a>
    </div>
  </PopupModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { generateShareUrlParams } from '@/scripts/functions'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import PopupModal from './PopupModalTemp.vue'

const props = defineProps({
  link: { type: String, required: true },
  visible: { type: Boolean, required: true }
})

const emit = defineEmits(['update:visible'])

const visibleQRcode = ref(false)
const copied = ref(false)
const shareFav = ref(false)

const computedLink = computed(() => {
  return shareFav.value ? `${props.link}${generateShareUrlParams()}` : props.link
})

function showQRcode() {
  visibleQRcode.value = true
}

function copyToClipboard() {
  navigator.clipboard.writeText(computedLink.value).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
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

.share-section {
  margin-top: 16px;
}

.share-link {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
}

.copied-text {
  margin-top: 8px;
  color: green;
  font-size: 13px;
}

.share-buttons {
  margin-top: 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.share-button {
  padding: 8px 12px;
  border-radius: 4px;
  color: white;
  text-decoration: none;
  font-size: 14px;
}

.share-button.facebook {
  background-color: #3b5998;
}

.share-button.twitter {
  background-color: #1da1f2;
}

.share-button.whatsapp {
  background-color: #25d366;
}
</style>
