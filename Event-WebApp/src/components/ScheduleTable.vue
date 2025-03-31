<!-- ScheduleTable.vue -->

<template>
    <ToggleViewButton targetView="list" />
    <div class="timetable">
        <div v-for="day in days" :key="day" class="day-table">
            <h2 class="day-head">{{ day }}</h2>
            <ScheduleTableItem :date="day"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEventData } from '@/scripts/useEventData.ts';
import ToggleViewButton from '@/components/SwitchView.vue';
import ScheduleTableItem from "@/components/ScheduleTableItem.vue";
import { dayStartTime } from '@/scripts/config.ts';
import { parseDateIgnoringTimezone } from '@/scripts/functions.ts';

/*import { useRouter } from 'vue-router'

const router = useRouter()

const toggleView = () => {
    router.replace({ query: { view: 'list' } })
}*/

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
.day-head {
   font-size: 1.5em;
   text-align: center;
}

/* Update Button from SwichtView.vue */
.btn-view-chang {
    width: 100%;
    color: var(--color-text-theme-topnav); 
    background-color: var(--color-bg-theme-searchbar);
}
</style>