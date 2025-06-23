<!-- FavBtn.vue -->
<!-- Button component to add or remove an item from favorites  -->
 
<template>
  <button @click="toggleFavorite" :class="{ 'favorited': isFavorite }">
    <!--<IconHeart :fill="isFavorite ? 'red' : 'white'" />-->
    <IconFavHeart :is-filled="isFavorite" />
  </button>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IconFavHeart from '@/components/icons/IconHeartFav.vue';

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
button {
  /* background-color: transparent; */
  background-color: var(--color-background);
  padding: 4px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background-color: #f0f0f0;
}

button:focus {
  outline: none;
}

button svg {
  width: 26px;
  height: 26px;
  transition: fill 0.3s ease, stroke 0.3s ease;
}
</style>
