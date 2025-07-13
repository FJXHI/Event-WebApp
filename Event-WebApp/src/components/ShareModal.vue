<!-- ShareModal.vue -->

<template>
  <PopupModal :model-value="props.visible" @update:modelValue="val => emit('update:visible', val)">

    <h2>{{ $t('share-it') }}</h2>
    <input type="checkbox" id="check_sharefav" v-model="shareFav" />
    <label for="check_sharefav">{{ $t('share-fav') }}</label>
    <p v-if="copied" class="copied-text">{{ $t('link-copied') }}</p>

    <!-- QR Code Modal -->
    <PopupModal v-model="visibleQRcode">
      <vue-qrcode 
        v-if="computedLink" 
        class="share-qr" 
        :value="computedLink"
        :options="{
          color: {
            dark: qrDarkColor,
            light: qrLightColor,
          },
          scale: 6,
        }"
      ></vue-qrcode>
    </PopupModal>
    <div class="share-buttons">
      <button class="share-button" @click="copyToClipboard">{{ $t('share-clipboard') }}</button>
      <button class="share-button" @click="showQRcode">{{ $t('share-qr') }}</button>
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

let qrLightColor = getCSSVariable('--color-background-soft');
let qrDarkColor = getCSSVariable('--color-qr-code')

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

function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

</script>



<style scoped>

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

/*
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
*/

.share-buttons {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center; /* optional: zentriert die Buttons horizontal */
}

.share-button {
  width: 90%; /* oder: width: 100%; */
  text-align: center;
  border-radius: 4px;
  color: white;
  background-color: blue;
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
