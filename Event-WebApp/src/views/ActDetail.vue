<template>
  <div v-if="act" class="act-detail-view">
    <h3>{{ act.name }}</h3>

    <!-- Sicherstellen, dass `act.image` existiert und nicht leer ist -->
    <img 
      :src="baseUrl + 'images/' + (act.image && act.image.trim() !== '' ? act.image : 'default-image.jpg')" 
      alt="Act Image" 
      class="act-image" 
    />

    <p><strong>{{ $t('bio') }}:</strong> {{ act.description }}</p>
    <p>
      <strong>{{ $t('genre') }}: </strong> 
      <span v-for="(tag, index) in act.tags.filter(tag => tag.visible)" :key="index">
        {{ tag.name }}<span v-if="index < act.tags.filter(tag => tag.visible).length - 1">, </span>
      </span>
    </p>



    <!-- Favorite-Button mit string-konvertierter ID -->
    <FavoriteButton :itemId="String(act.id)" itemType="act" />

    <h4>{{ $t('appearances') }}:</h4>
    
    <ProgrammList filter="act" :filterID="[String(act.id)]" class="ProgrammList" />
    
    <BackBtn />
  </div>

  <div v-else>
    <p>{{ $t('act') }} {{ $t('not-found') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { baseUrl } from '@/config.ts';
import { useEventData } from '@/useEventData.ts';
import BackBtn from '@/components/BackBtn.vue';
import ProgrammList from '@/components/ProgrammList.vue';
import FavoriteButton from '@/components/FavBtn.vue';

// Routen-Parameter abrufen
const route = useRoute();

// Event-Daten abrufen
const { acts, performances, stages } = useEventData();

// Berechnung des aktuellen Acts
const act = computed(() => {
  // Prüfen, ob die Daten geladen sind
  if (!acts.value || !performances.value || !stages.value) return null;

  const actId = route.params.id as string; // actId ist ein String (von der URL)
  
  const selectedAct = acts.value.find(
    (act) => act['id-name'] === actId || act.id.toString() === actId
  );

  if (!selectedAct) return null;

  return {
    ...selectedAct,
    performances: performances.value
      .filter((perf) => perf.actsIDArr.includes(selectedAct.id))
      .map((perf) => ({
        ...perf,
        stage: stages.value.find((stage) => stage.id === perf.stageID) || null,
    })),
  };
});

</script>
