<!-- NewsView.vue -->
<!-- This component displays all messages in a list. -->

<template>
  <div class="news-view">
    <p>DEMO: Not in use.</p>
    <h1>News</h1>
    <ul>
      <li v-for="notification in sortedNotifications" :key="notification.id">
        <h2>{{ notification.title }}</h2>
        <p>{{ notification.content }}</p>
        <p>{{ notification.date }}</p>
      </li>
    </ul>
  </div>

</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

const notifications = [
  {
    id: 1,
    title: 'Festival Eröffnung',
    content: 'Details about the festival opening.',  
    date: '2025-07-01'
  },
  {
    id: 2,
    title: 'Absage Konzert',
    content: 'Konzert von Band XYZ wurde abgesagt.',
    date: '2023-10-02'
  },
  {
    id: 3,
    title: 'Wetterwarnung',
    content: 'Mögliche Gewitterwarnung für den Festivalzeitraum.',
    date: '2023-10-03'
  }
];
const sortedNotifications = computed(() =>
  [...notifications].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

</script>