// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './scripts/i18n.js'
import './assets/main.css'
import router from './router'
import { applyTheme } from './scripts/functions.ts'

//logic for dark mode
const storedTheme = localStorage.getItem('theme')
const theme = storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
  ? storedTheme
  : 'system'

applyTheme(theme)


const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')



