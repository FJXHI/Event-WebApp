<!-- ScheduleTable.vue -->
<!-- display schedule in a table format with navigation -->

<template>
    <div class="schedule-table scroll-head full-height">    
        <div class="btn-header">
            <ToggleViewButton targetView="list" class="btn full"/>
        </div>
        <div class="timetable scroll-y-area">
            <div v-for="(day, index) in days" :key="day" class="day-table">
                <DateHead
                    :date="day"
                    :index="index"
                    :sortedDateList="days"
                    :scrollToDate="scrollToDate"
                />
                <ScheduleTableItem :date="day"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEventData } from '@/scripts/useEventData.ts';
import ToggleViewButton from '@/components/SwitchView.vue';
import ScheduleTableItem from "@/components/ScheduleTableItem.vue";
import DateHead from '@/components/DateHead.vue';
import { dayStartTime } from '@/scripts/config.ts';
import { parseDateIgnoringTimezone, formatDateTime } from '@/scripts/functions.ts';
import { useRouter } from 'vue-router';

const router = useRouter();

function scrollToDate(targetDate: string) {
    router.replace({ 
        hash: `#${targetDate}`,
        query: { ...router.currentRoute.value.query},
     }) // replace to avoid adding to history
    const el = document.getElementById(targetDate);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

const { performances } = useEventData();

const days = computed<string[]>(() => {
    // extract unique days from events
    const uniqueDays = new Set<string>(
        performances.value.map(event => 
            parseDateIgnoringTimezone(event.start_time).toLocaleDateString('en-CA')
        )
    );

    // Create a set to store additional days
    const additionalDays = new Set<string>();

    performances.value.forEach(event => {
        const eventDate = parseDateIgnoringTimezone(event.start_time);
        const eventHour = eventDate.getHours();
        // Check if there are events after midnight (until dayStartTime) on the current day 
        if (eventHour >= 0 && eventHour < dayStartTime) {
            const previousDay = new Date(eventDate);
            previousDay.setDate(eventDate.getDate() - 1);

            // add the previous day to the set
            additionalDays.add(previousDay.toLocaleDateString('en-CA'));
        }
    });

    return Array.from(new Set([...uniqueDays, ...additionalDays])).sort();
});

</script>

<style scoped>
.date-nav-container {
  display: grid;
  grid-template-columns: 2.5rem auto 2.5rem; /* feste Breite für Buttons */
  align-items: center;
  justify-content: center;
}

.head-date {
  font-size: 1.5rem;
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

</style>