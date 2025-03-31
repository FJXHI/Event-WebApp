<!-- SettingsView-vue -->
<!-- View some settings of the app. -->

<template>
  <div>
    <button><LangSwitch /></button>
    <ColorPalette />
    <BadgeAuthor position="fixed"/>
  </div>
</template>

<script setup lang="ts">
import LangSwitch from '@/components/LangSwitch.vue';
import BadgeAuthor from "@/components/BadgeAuthor.vue";
import ColorPalette from "@/components/ColorPalette.vue";



</script>

<style scoped>

</style>
