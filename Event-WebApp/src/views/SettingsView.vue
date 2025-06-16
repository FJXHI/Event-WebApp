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
    <div class="pad">
      <p>Build Time: {{ buildDate }}</p>
      <!--<p v-if="fcmToken">FCM Token: {{ fcmToken }}</p>-->
      <div v-if="fcmToken" >
        <p class="fcm-token-label" @click="copyToken">FCM Token: {{ fcmToken }}</p>
        <!--<div v-if="copied" class="show-up">{{ $t('copied') }}</div>--><!--ERROR-FIX: Copy Animation-->
      </div>
    <p v-else>FCM Token: {{ $t('loading') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import LangSwitch from '@/components/LangSwitch.vue';
import BadgeAuthor from "@/components/BadgeAuthor.vue";
import ColorPalette from "@/components/DebugColorPalette.vue";
import DarkModeBtn from '@/components/DarkModeBtn.vue';
import { storeToRefs } from 'pinia';
import { useMessagingStore } from '@/scripts/useMessagingStore';
import { ref } from 'vue';

const messagingStore = useMessagingStore();
const { fcmToken } = storeToRefs(messagingStore);

const buildDate = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'medium',
  timeStyle: 'short',
}).format(new Date(__BUILD_DATE__));

const copied = ref(false)
const copyToken = async () => {
  try {
    await navigator.clipboard.writeText(fcmToken.value)
    console.log('Token copied to clipboard.')
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error('Copy failed', err)
  }
}

const clearFavorites = (type: string): void => {
  if(type == 'all') {
    localStorage.removeItem('act');
    localStorage.removeItem('stage');
    localStorage.removeItem('event');
    alert('Alle Favoriten wurden gelöscht');
    return;
  } else {
    localStorage.removeItem(type);  // Delete specific type of favorites
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
.fcm-token-label {
  overflow-wrap: break-word;
  width: 95%;
  cursor: pointer;
}

</style>
