<!-- SearchBar.vue-->
<!-- A SearchBar for the Lists -->

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
        @change="onInput"
        @keyup="onInput"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        :placeholder="$t('search-placeholder')" 
        autocapitalize="none"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconSearch from './icons/IconSearch.vue';

const emit = defineEmits(['apply']);

const searchQuery = ref('');
const isComposing = ref(false);

// Call this function when the input changes
const onInput = () => {
  if (isComposing.value) return;
  emit('apply', searchQuery.value);
};

// Handle composition events for IME input (e.g., for Chinese, Japanese, Korean)
const onCompositionEnd = () => {
  isComposing.value = false;
  onInput();
};

const onCompositionStart = () => {
  isComposing.value = true;
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
