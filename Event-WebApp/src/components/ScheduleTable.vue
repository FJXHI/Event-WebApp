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
import { parseDateIgnoringTimezone, formatDateTime, useScrollToDate } from '@/scripts/functions.ts';
import { useRouter } from 'vue-router';

const router = useRouter();

const { scrollToDate } = useScrollToDate()

const { performances } = useEventData();

const days = computed<string[]>(() => {
    const shownDays = new Set<string>();

    performances.value.forEach(event => {
        const eventDate = parseDateIgnoringTimezone(event.start_time);
        const eventHour = eventDate.getHours();

        // Normaly, the event counts as the day it starts
        let logicalDay = new Date(eventDate);
        // If the event starts after midnight but before dayStartTime, it counts as the previous day
        if (eventHour < dayStartTime) {
            logicalDay.setDate(logicalDay.getDate() - 1);
        }
        
        // Format the date as 'YYYY-MM-DD' for consistency
        const logicalDayStr = logicalDay.toLocaleDateString('sv-SE');
        //const logicalDayStr = formatDateTime(logicalDay, 'ISO') // → "YYYY-MM-DD" // Dont work
        shownDays.add(logicalDayStr);
    });

    return Array.from(shownDays).sort();
});


const days2 = computed<string[]>(() => {
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

</style>