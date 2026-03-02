<!-- CalendarBtn.vue -->
<!-- Button component to show Calendar Menu -->
 
<template>
  <button @click="openCalendarModal" class="detail-view-Btn">
    <IconCalendar />
  </button>
  <CalenderModal 
    v-model:visible="visibleCalendar" 
    :title="title"
    :description="description"
    :location="location"
    :startTime="startTime"
    :endTime="endTime"
    :detailsUrl="detailsUrl"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconCalendar from '@/components/icons/IconCalendar.vue';
import CalenderModal from './CalenderModal.vue';

const visibleCalendar = ref(false);

function openCalendarModal() {
  visibleCalendar.value = true;
}

const props = defineProps<{
  title: string;
  description?: string;
  location?: string;
  startTime: string;
  endTime: string;
  detailsUrl?: string;
}>();
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

/* Hover change background color */
button:hover {
  background-color: #f0f0f0;
}

/* Hover also change icon color */
button:hover svg {
  color: var(--vt-c-black);
}

button:focus {
  outline: none;
}

button svg {
  width: 26px;
  height: 26px;
  color: var(--btn-change-text);
}



</style>
