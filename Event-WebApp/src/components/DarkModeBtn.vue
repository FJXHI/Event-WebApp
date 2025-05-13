<!-- DarkModeBtn.vue -->
<!-- A List Button to change the theme of the app. (Light, Dark and System) --><template>
  <div>
    <label class="sett-title">{{ $t('appearance') }}</label>
    <div class="sett-button-group">
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
