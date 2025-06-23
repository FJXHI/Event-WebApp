<!-- Countdown.vue -->

<template>
  <div class="countdown">
    <p v-if="targetTime">
      <strong>{{ countdown }}</strong>
    </p>
    <p v-else class="error">❌ Kein gültiger Zeitpunkt übergeben</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { parseDateIgnoringTimezone } from '@/scripts/functions';

const props = defineProps<{
  time?: string | Date | null;
}>();

const now = ref(new Date());

const targetTime = computed(() => {
  if (!props.time) return null;

  if (typeof props.time === 'string') {
    const parsed = parseDateIgnoringTimezone(props.time);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  if (props.time instanceof Date) {
    return props.time;
  }
  return null;
});

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

const countdown = computed(() => {
  if (!targetTime.value) return '';
  const diffMs = targetTime.value.getTime() - now.value.getTime();
  if (diffMs <= 0) return 'NOW';

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const timeStr = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return days > 0 ? `${days}d ${timeStr}` : timeStr;
});

let interval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  if (targetTime.value) {
    interval = setInterval(() => {
      now.value = new Date();
    }, 1000);
  }
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

watch(() => props.time, () => {
  now.value = new Date();
});
</script>

<style scoped>
.countdown {
  font-size: 1rem;
  padding: 0.5rem;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
