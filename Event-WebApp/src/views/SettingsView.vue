<!-- SettingsView-vue -->
<!-- View some settings of the app. -->

<template>
  <div>
    <DarkModeBtn />
    <!--<label>Sprache:</label>-->
    <br />
    <button><LangSwitch /></button>
    
    <!--<label>Favoriten:</label>-->
    <button @click="clearFavorites('act')">Favoriten für Acts löschen</button>
    <button @click="clearFavorites('stage')">Favoriten für Bühnen löschen</button>
    <button @click="clearFavorites('event')">Favoriten für Events löschen</button>
    <button @click="clearFavorites('all')">Favoriten löschen</button>
    <button @click="clearAllData">Cache-Daten löschen</button>

    <br />
    <br />
    <ColorPalette />
    <BadgeAuthor position="fixed"/>
  </div>
</template>

<script setup lang="ts">
import LangSwitch from '@/components/LangSwitch.vue';
import BadgeAuthor from "@/components/BadgeAuthor.vue";
import ColorPalette from "@/components/ColorPalette.vue";
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
