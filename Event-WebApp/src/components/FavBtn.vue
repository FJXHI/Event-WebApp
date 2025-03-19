<!-- FavBtn.vue -->
<!-- Button component to add or remove an item from favorites  -->
 
<template>
  <button @click="toggleFavorite" :class="{ 'favorited': isFavorite }">
    <IconHeart :fill="isFavorite ? 'red' : 'white'" />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IconHeart from '@/components/icons/IconHeart.vue';

// Define props with TypeScript
const props = defineProps<{
  itemId: string;
  itemType: 'act' | 'stage' | 'event'; // Restrict itemType to known values
}>();

const isFavorite = ref(false);

// Function to check if the item is in favorites
const checkIfFavorite = (type: string, id: string): boolean => {
  const favorites: string[] = JSON.parse(localStorage.getItem(type) || '[]');
  return favorites.includes(id);
};

// Function to add an item to favorites
const addToFavorites = (type: string, id: string): void => {
  const favorites: string[] = JSON.parse(localStorage.getItem(type) || '[]');
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem(type, JSON.stringify(favorites));
  }
  isFavorite.value = true;
};

// Function to remove an item from favorites
const removeFromFavorites = (type: string, id: string): void => {
  let favorites: string[] = JSON.parse(localStorage.getItem(type) || '[]');
  favorites = favorites.filter((favId) => favId !== id);
  localStorage.setItem(type, JSON.stringify(favorites));
  isFavorite.value = false;
};

// Toggle favorite state
const toggleFavorite = (): void => {
  if (isFavorite.value) {
    removeFromFavorites(props.itemType, props.itemId);
  } else {
    addToFavorites(props.itemType, props.itemId);
  }
};

// Check favorite status on component mount
onMounted(() => {
  isFavorite.value = checkIfFavorite(props.itemType, props.itemId);
});
</script>

<style scoped>
/* ERROR-FIX Improve Style */

button {
  background-color: #007bff; /* Blue */
  color: white;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3; /* Darker blue */
}

button.favorited {
  background-color: white;
  border-color: red; /* Red border when favorited */
}

button:focus {
  outline: none;
}

button svg {
  transition: fill 0.3s ease; /* Smooth transition for heart color */
}
</style>
