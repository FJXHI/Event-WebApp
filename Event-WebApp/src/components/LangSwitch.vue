<!-- LangSwitch.vue -->
<!-- A click-area to change language -->
<!-- TODO: If more than 2 languages ​​are involved, it should probably be implemented and designed differently  -->

<template>
  <div @click="switchLanguage" class="lang-button">{{ $t('change-lang') }} ({{ getNextLanguage() }})
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

//supported languages
const languages = ['de', 'en']; // can be extended

const getNextLanguage = () => {
  const currentIndex = languages.indexOf(locale.value);
  return languages[(currentIndex + 1) % languages.length];
};

const switchLanguage = () => {
  locale.value = getNextLanguage();
  /*
  const currentIndex = languages.indexOf(locale.value);
  const nextIndex = (currentIndex + 1) % languages.length;
  locale.value = languages[nextIndex];*/
};
</script>