<!-- DateHead.vue -->
<template>
<div class="group-head">
    <div class="date-nav-container">
    <button
        v-if="sortedDateList[index - 1]"
        class="nav-arrow nav-left"
        @click="scrollToDate(sortedDateList[index - 1])"
    >
        &lt;
    </button>
    <div v-else class="nav-arrow nav-left"></div> <!-- Spacer left -->

    <h2 class="head-date" :id="date">{{ formatDateTime(date, "Date Long") }}</h2>

    <button
        v-if="sortedDateList[index + 1]"
        class="nav-arrow nav-right"
        @click="scrollToDate(sortedDateList[index + 1])"
    >
        &gt;
    </button>
    <div v-else class="nav-arrow nav-right"></div> <!-- Spacer right -->
    </div>
</div>
</template>

<script setup lang="ts">
import { formatDateTime } from '@/scripts/functions';

const props = defineProps<{
    date: string;
    index: number;
    sortedDateList: string[];
    scrollToDate: (targetDate: string) => void;
}>();
</script>

<style scoped>
.date-nav-container {
    display: grid;
    grid-template-columns: 2.5rem auto 2.5rem;
    align-items: center;
    justify-content: center;
}

.head-date {
    font-size: 1.4rem;
    text-align: center;
}

.nav-arrow {
    width: 2.5rem;
    font-size: 1.2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--list-group-text);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.group-head {
    background-color: var(--list-group);
    color: var(--list-group-text);
}
</style>
  