<template>
  <li>
    <a :href="url" target="_blank" rel="noopener noreferrer">
      <div class="fallback-name" v-if="!svgContent"><OvalLink :name="name" /></div>
      <!-- Override name, if SVG exists -->
      <div v-if="svgContent" class="social-media-icon" v-html="svgContent"></div>
    </a>
  </li>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { baseUrl } from '@/scripts/config';
import OvalLink from '@/components/OvalLink.vue';


const props = defineProps({
  name: String,
  url: String,
});

const svgContent = ref('');

async function loadSvg(name) {
  svgContent.value = ''; // Clear SVG

  if (!name) {
    console.warn("⚠ Kein Name angegeben, nutze Standard-Fallback.");
    return;
  }

  const path = `${baseUrl}icons/link/${name.toLowerCase()}.svg`;

  try {
    const response = await fetch(path);
    if (!response.ok) {
      console.warn(`⚠ SVG nicht gefunden: ${path}, Name bleibt sichtbar.`);
      return;
    }

    let svg = await response.text();

    // Falls die Datei leer ist oder fehlerhaften Inhalt hat, ignorieren
    if (!svg.includes('<svg')) {
      console.warn(`⚠ Ungültiges oder leeres SVG: ${path}, Name bleibt.`);
      return;
    }

    // SVG optimieren: Füllfarbe steuerbar machen, feste Größen entfernen
    svg = svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
    svg = svg.replace(/(width|height)="\d+[^"]*"/g, '');
    svg = svg.replace('<svg', '<svg class="resizable-svg"');

    svgContent.value = svg; // Nur wenn SVG wirklich gültig ist, anzeigen
    console.log(`✅ SVG geladen: ${path}`);
  } catch (error) {
    console.error(`❌ Fehler beim Laden des SVGs: ${error}`);
  }
}

// SVG laden, wenn sich der Name ändert
watchEffect(() => {
  loadSvg(props.name);
});
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
}

/* Standardgröße für Icons und Namen */
.social-media-icon {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-theme-oval);
}

/* Inline-SVGs auf Containergröße skalieren */
.resizable-svg {
  width: 100%;
  height: 100%;
}

/* Standardmäßig wird der Name angezeigt */
.fallback-name {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0px;
  text-align: center;
  color: black;
}

.oval-link-div  {
  margin-top: 0px; /* Override */
}

</style>
