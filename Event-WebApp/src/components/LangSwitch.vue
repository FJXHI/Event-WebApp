<!-- LangSwitch.vue -->
<!-- List of languages with flags to switch between them -->

<template>
  <div>
    <label class="sett-title">{{ $t('languages') }}</label>
    <div class="sett-button-group">
      <button
        v-for="lang in languages"
        :key="lang.iso"
        @click="switchLanguage(lang.iso)"
        :class="{ active: lang.iso === currentLocale }"
      >
        <img :src="`${flagBasePath}${lang.iso}.svg`" style="width: 22px; height: auto;" class="btn-svg" />
        {{ lang.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue';
import { baseUrl } from '@/scripts/functions';

const { locale } = useI18n()

// Base path for flag icons
// public/icons/flags/xx.svg
const flagBasePath = `${baseUrl}icons/flags/`;

const currentLocale = computed(() => locale.value)

const languages = [
  { iso: 'de', name: 'Deutsch'},
  { iso: 'en', name: 'English'},
]

const switchLanguage = (iso: string) => {
  locale.value = iso
}
</script>

<style scoped>
/* Gap between flag and text */
.button-label {
  margin-left: 0.3rem;
}
</style>