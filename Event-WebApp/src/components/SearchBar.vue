<!-- SearchBar.vue-->
<!-- A SearchBar for the Lists -->
<!-- ERROR-FIX Instant search does not work on mobile -->

<template>
  <div class="search-bar">
    <div class="search-inputline">
      <div class="search-icon">
        <IconSearch class="icon-size" />
      </div>
      <input 
        type="text"
        v-model="searchQuery" 
        @input="onInput" 
        :placeholder="$t('search-placeholder')" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconSearch from './icons/IconSearch.vue';

const emit = defineEmits(['apply']);

const searchQuery = ref('');

// Call this function when the input changes
const onInput = () => {
emit('apply', searchQuery.value);
};
</script>

<style scoped>
.search-bar {
  background-color: var(--bg-topnav);
  width: 100%;
  padding: 0.4em;
}

.search-inputline {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--bg-searchbar);
  border-radius: 8px;
  padding: 0.8em;
  box-sizing: border-box;
}

.search-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5em; /* Distanz between icon and input */
}

input {
  width: 100%;
  font-size: 1.0em;
  border: none;
  background-color: var(--bg-searchbar);
  color: var(--text-topnav);
  box-sizing: border-box;
}

input::placeholder {
  color: var(--text-searchbar);
}

input:focus {
  outline: none; /* remove the default focus outline */
}

/* Icon-Size */
.icon-size {
  width: 1.2em;
  height: 1.2em;
  color: var(--text-topnav);
}
</style>