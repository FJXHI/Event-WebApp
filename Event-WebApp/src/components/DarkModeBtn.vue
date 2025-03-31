<!-- DarkModeBtn.vue -->
<!-- A List Button to change the theme of the app. (Light, Dark and System) --><template>
  <div>
    <label>Erscheinungsbild</label>
    <div class="theme-buttons">
      <button
        v-for="option in options"
        :key="option.value"
        :class="{ active: theme === option.value }"
        @click="setTheme(option.value)"
      >
        {{ option.icon }} {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { applyTheme } from '@/scripts/functions'

type ThemeMode = 'light' | 'dark' | 'system'
const theme = ref<ThemeMode>('system')

const options = [
  { value: 'system', label: 'System', icon: '🖥️' },
  { value: 'light', label: 'Hell', icon: '☀️' },
  { value: 'dark', label: 'Dunkel', icon: '🌙' },
] as const

onMounted(() => {
  const stored = localStorage.getItem('theme')
  theme.value =
    stored === 'light' || stored === 'dark' || stored === 'system'
      ? stored
      : 'system'
  applyTheme(theme.value)
})

watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme)
  applyTheme(newTheme)
})

function setTheme(value: ThemeMode) {
  theme.value = value
}
</script>

<style scoped>
.theme-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.theme-buttons button {
  padding: 0.5rem 1rem;;
  cursor: pointer;
}

.theme-buttons button.active {
  background: #007acc;
  color: white;
}
</style>
