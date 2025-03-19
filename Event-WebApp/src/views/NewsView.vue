<!-- NewsView.vue -->
<!-- This component fetches news notifications from an API (JSON-File) and displays them in a list format. -->

<template>
  <div class="scroll-head full-height">
    <div class="news-view pad scroll-y-area">
      <ul>
        <li v-for="notification in sortedNotifications" :key="notification.id" class="news-item">
          <p class="news-date">{{ formatDateTime(notification.date, "Date Long") }}</p>
          <h2 class="news-title">{{ notification.title }}</h2>
          <p class="news-content">{{ notification.content }}</p>
          <a v-if="notification.url" :href="notification.url" target="_blank">Mehr erfahren</a>
          <img v-if="notification.image" :src="notification.image" alt="News Image" style="max-width: 100%; height: auto;" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { formatDateTime } from '@/scripts/functions'
import { newsApiUrl } from '@/scripts/config'

const notifications = ref<any[]>([])

const sortedNotifications = computed(() =>
  [...notifications.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

const fetchNews = async () => {
  try {
    const response = await fetch(newsApiUrl)
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    notifications.value = Array.isArray(data) ? data : [data] // Einzelobjekt oder Array abfangen
  } catch (error) {
    console.error('Fehler beim Laden der News:', error)
  }
}

onMounted(fetchNews)
</script>
  
<style scoped>

.news-view ul {
  list-style: none;
  padding: 0;
}

.news-item {
  background-color: var(--vt-c-text-dark-2);
  border-radius: 10px;
  border: 1px solid grey;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: transform 0.2s;
}

.news-date {
  font-size: 0.85rem;
  color: black;
}

.news-title {
  margin: 0.25rem 0;
  font-size: 1.25rem;
}

.news-content {
  line-height: 1.5;
  white-space: pre-line;
}

a {
  color: #0077cc;
  text-decoration: underline;
}
/*
.news-item:hover {
  transform: translateY(-2px);
}

a:hover {
  text-decoration: none;
}*/
</style>