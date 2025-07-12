<!-- ImportFav.vue -->

<template>
  <div v-if="hasImportData" class="modal-overlay">
    <div class="modal-content">
      <h2>Geteilte Favoriten gefunden:</h2>
      <ul>
        <li v-for="(ids, category) in importData" :key="category">
          {{ ids.length }} {{ $t(category) }}
        </li>
      </ul>
      <div>
        <button @click="importToLocalStorage">Favoriten hinzufügen?</button>
        <button @click="close">Nein</button>
      </div>
      
    </div>
    x
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
type FavoriteMap = Record<string, number[]>

const importData = ref<FavoriteMap>({})
const hasImportData = ref(false)

function close() {
  hasImportData.value = false
  clearImportQueryParams()
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)

  // Check if share is true
  const isShared = params.get('share') === 'true'
  if (!isShared) return

  const result: FavoriteMap = {}

  const keys = ['act', 'event', 'stage']

  for (const key of keys) {
    const allValues = params.getAll(key) // alle Vorkommen sammeln
    console.log(`[Import] Alle Werte für ${key}:`, allValues)
    const ids = allValues
      .map(v => v.replace(/\s+/g, '+')) // Leerzeichen → "+"
      .flatMap((v) => v.split('+'))
      .map((id) => parseInt(id))
      .filter((n) => !isNaN(n))


    console.log(`[Import] Gefilterte IDs für ${key}:`, ids)
    if (ids.length > 0) {
      result[key] = ids
    }
  }

  if (Object.keys(result).length > 0) {
    importData.value = result
    hasImportData.value = true
  }
})

function importToLocalStorage() {
  const keys = ['act', 'event', 'stage']

  for (const key of keys) {
    const existingRaw = localStorage.getItem(key)
    const existingIds: string[] = existingRaw ? JSON.parse(existingRaw) : []
    const importIds: string[] = (importData.value[key] || []).map((n) => String(n))

    if (!Array.isArray(existingIds) || !Array.isArray(importIds)) continue

    const merged = Array.from(new Set([...existingIds, ...importIds]))
    localStorage.setItem(key, JSON.stringify(merged))
  }

  close()
}

function clearImportQueryParams() {
  const url = new URL(window.location.href)
  const keysToRemove = ['share', 'act', 'event', 'stage']

  for (const key of keysToRemove) {
    url.searchParams.delete(key)
  }

  window.history.replaceState({}, document.title, url.pathname + url.search)
}

</script>

<style scoped>
.import-favorites {
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content button {
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #2a6dff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #1e54c4;
}
</style>
