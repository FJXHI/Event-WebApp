<!-- SettingsView-vue -->
<!-- View some settings of the app. -->

<template>
  <div class="scroll-area">
    <DarkModeBtn class="pad"/>
    <!--<label>Sprache:</label>-->
    <LangSwitch class="pad"/>
    <div class="pad">
      <label class="sett-title">{{ $t('favorites') }}</label>
    
      <!--<label>Favoriten:</label>-->
      <div class="sett-button-group">
        <button @click="clearFavorites('act')">Fav. Acts löschen</button>
        <button @click="clearFavorites('stage')">Fav. Bühnen löschen</button>
        <button @click="clearFavorites('event')">Fav. Events löschen</button>
        <button @click="clearFavorites('all')">Favoriten löschen</button>
        <button @click="clearAllData">Cache-Daten löschen</button>
      </div>
    </div>

    <br />
    <ColorPalette class="pad" />
    <BadgeAuthor position="fixed"/>
    
  </div>
</template>

<script setup lang="ts">
import LangSwitch from '@/components/LangSwitch.vue';
import BadgeAuthor from "@/components/BadgeAuthor.vue";
import ColorPalette from "@/components/DebugColorPalette.vue";
import DarkModeBtn from '@/components/DarkModeBtn.vue';

import { ref } from 'vue';

const clearFavorites = (type: string): void => {
  if(type == 'all') {
    localStorage.removeItem('act');
    localStorage.removeItem('stage');
    localStorage.removeItem('event');
    alert('Alle Favoriten wurden gelöscht');
    return;
  } else {
    localStorage.removeItem(type);  // Löscht Favoriten für den jeweiligen Typ
    alert(`${type} Favoriten wurden gelöscht`);
  }
};

function clearAllData() {
  if (confirm("Wirklich alle Daten löschen?")) {
    localStorage.clear();
    alert("Alle Daten gelöscht.");
  }   
}  
</script>

<style scoped>


</style>
