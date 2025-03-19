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
import { baseUrl } from '@/scripts/functions';
import OvalLink from '@/components/OvalLink.vue';


const props = defineProps({
  name: String,
  url: String,
});

const svgContent = ref('');

async function loadSvg(name) {
  svgContent.value = ''; // Clear SVG

  if (!name) {
    console.warn("No Name provided, use fallback.");
    return;
  }

  const path = `${baseUrl}icons/link/${name.toLowerCase()}.svg`;

  try {
    const response = await fetch(path);
    if (!response.ok) {
      console.warn(`Icon not found: ${path}, use name instead.`);      
      return;
    }

    let svg = await response.text();

    // If the file is empty or has invalid content, ignore it
    if (!svg.includes('<svg')) {
      console.warn(`Invalid Icon: ${path}, use name instead.`);
      return;
    }

    // optimize SVG: make fill color controllable, remove fixed sizes
    svg = svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
    svg = svg.replace(/(width|height)="\d+[^"]*"/g, '');
    svg = svg.replace('<svg', '<svg class="resizable-svg"');

    // Only show SVG if it is valid
    svgContent.value = svg;
  } catch (error) {
    console.error(`Error loading Icons: ${error}`);
  }
}

// load SVG, if name changes
watchEffect(() => {
  loadSvg(props.name);
});
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
}

/* Size of the icons and name */
.social-media-icon {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--oval-line);
}

/* Inline SVGs are scaled to the size of the container */
.resizable-svg {
  width: 100%;
  height: 100%;
}

/* Fallback name for SVGs that are not found */
.fallback-name {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0px;
  text-align: center;
  color: black; /* Not in use */
}

.oval-link-div  {
  margin-top: 0px; /* Override */
}

</style>
