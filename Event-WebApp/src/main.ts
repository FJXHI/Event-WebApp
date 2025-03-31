// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './scripts/i18n.js'
//import './assets/style.css'
import './assets/main.css'
import router from './router'

//import { createPinia } from 'pinia'

const app = createApp(App)
app.use(i18n)
//app.use(createPinia())
app.use(router)
app.mount('#app')



