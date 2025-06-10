<!-- TimeTableItem.vue -->
<!-- ERROR-Fix Show Fav - Dark Mode - Style Error, some Stages are longer -->
<template>
    <div class="table-content">
        <div class="timeline">
            <div class="timeline-column">
                <div class="timeline-header">{{ $t('Time') }}</div>
                <div class="time-slots" :style="getEventsContainerStyle()">
                    <div v-for="hour in hours" :key="hour" class="time-slot" :style="getTimeSlotStyle(hour)">
                        {{ hour % 24 }}:00
                    </div>
                </div>
            </div>
        </div>
        <div class="stages">
            <div v-for="stage in visibleStages" :key="stage.id" class="stage">
                <div class="timeline-header">{{ stage.name }}</div>
                <div class="events" :style="getEventsContainerStyle()">
                    <div v-for="hour in hours" :key="hour" class="time-slot" :style="getTimeSlotStyle(hour)">
                    </div>
                    <router-link 
                        v-for="event in filteredPerformances.filter(event => event.stageID === stage.id)" 
                        :key="event.id" 
                        :to="'/event/' + (event['id-name']?.trim() || event.id)" 
                        :class="['event', getEventTypeClass(event?.type)]"
                        :style="getEventStyle(event)"
                        :title="event.name || getActNamesLocal(event.actsIDArr) || $t('Unknown')">
                        <strong>
                            <!-- Show only Name (if no Acts or add the Acts)-->
                            <div v-if="event.name">
                                {{ event.name }} <!--<span v-if="event.actsIDArr.length">({{ getActNames(event.actsIDArr) }})</span>-->
                            </div>
                            <!-- Show only Acts if no Name -->
                            <div v-else-if="event.actsIDArr.length">
                                {{ getActNamesLocal(event.actsIDArr) }}
                            </div>
                            <div v-else>
                                {{ $t('Unknown') }}
                            </div>
                        </strong>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useEventData } from '@/scripts/useEventData.ts';
import { dayStartTime } from '@/scripts/config.ts';
import { parseDateIgnoringTimezone } from '@/scripts/functions.ts';
import { getActNames } from '@/scripts/functions';


const props = defineProps({
    date: String
});

const { performances, acts, stages } = useEventData();

const getActNamesLocal = (actsArr: (number | string)[]) => getActNames(actsArr, acts);

const filteredPerformances = computed(() => {
    return performances.value
        .filter(event => {
            const eventDate = parseDateIgnoringTimezone(event.start_time);
            const selectedDay = parseDateIgnoringTimezone(props.date);

            // Event belongs to the same day or the previous day (Late-Night-Event)
            // const isSameDayEvent = eventDate.getDate() === selectedDay.getDate();
            const isSameDay = (
                eventDate.getFullYear() === selectedDay.getFullYear() &&
                eventDate.getMonth() === selectedDay.getMonth() &&
                eventDate.getDate() === selectedDay.getDate()
            );

            // Check if the event starts after midnight (until dayStartTime)
            //const isLateNightEvent = eventDate.getHours() < dayStartTime && eventDate.getDate() === selectedDay.getDate() + 1;
            const isLateNightEvent = (
                eventDate.getHours() < dayStartTime &&
                eventDate.getFullYear() === selectedDay.getFullYear() &&
                eventDate.getMonth() === selectedDay.getMonth() &&
                eventDate.getDate() === selectedDay.getDate() + 1
            );
            
            // Event is late-night event and should not be shown again for the current day
            const isEarlyHourDuplicate = (
                eventDate.getHours() < dayStartTime &&
                eventDate.getFullYear() === selectedDay.getFullYear() &&
                eventDate.getMonth() === selectedDay.getMonth() &&
                eventDate.getDate() === selectedDay.getDate()
            );

            if (isEarlyHourDuplicate) return false;

            return isSameDay || isLateNightEvent;
        })
        .sort((a, b) => {
            const dateA = parseDateIgnoringTimezone(a.start_time) ?? new Date(0);
            const dateB = parseDateIgnoringTimezone(b.start_time) ?? new Date(0);
            return dateA.getTime() - dateB.getTime();
        });
});

const visibleStages = computed(() => {
    return stages.value.filter(stage =>
        filteredPerformances.value.some(event => event.stageID === stage.id)
    );
});

const hours = computed(() => {
    const eventTimes = filteredPerformances.value.flatMap(event => [
        parseDateIgnoringTimezone(event.start_time).getHours(),
        parseDateIgnoringTimezone(event.end_time).getHours()
    ]);

    const normalizedTimes = eventTimes.map(time => (time < dayStartTime ? time + 24 : time));
    const minHour = Math.min(...normalizedTimes) - 1;
    const maxHour = Math.max(...normalizedTimes) + 1;
    return Array.from({ length: maxHour - minHour + 1 }, (_, i) => (minHour + i) % 24);
});

// calculate position of the event in the timeline
const getEventStyle = (event) => {
    const startTime = parseDateIgnoringTimezone(event.start_time);
    const endTime = parseDateIgnoringTimezone(event.end_time);

    const minHour = hours.value[0];
    const totalMinutes = (hours.value.length) * 60;

    const startMinutes = ((startTime.getHours() < minHour ? startTime.getHours() + 24 : startTime.getHours()) * 60 + startTime.getMinutes()) - (minHour * 60);
    const endMinutes = ((endTime.getHours() < minHour ? endTime.getHours() + 24 : endTime.getHours()) * 60 + endTime.getMinutes()) - (minHour * 60);

    const startOffset = (startMinutes / totalMinutes) * 100;
    const duration = ((endMinutes - startMinutes) / totalMinutes) * 100;

    const spacingPx = 1;
    const containerHeightPx = (hours.value.length) * 60;
    const spacingPercent = (spacingPx / containerHeightPx) * 100;

    return {
        top: `${startOffset}%`,
        height: `calc(${duration}% - ${spacingPercent}%)`,
    };
};

// calculate the hight of the Events container
const getEventsContainerStyle = () => {
    const minHour = hours.value[0];
    const maxHour = hours.value[hours.value.length - 1] < minHour ? hours.value[hours.value.length - 1] + 24 : hours.value[hours.value.length - 1];
    const totalDayMinutes = (maxHour - minHour + 1) * 60;
    return {
        height: `${totalDayMinutes}px`
    };
};

// Calculate the position of the time slots
const getTimeSlotStyle = (hour) => {
    const minHour = hours.value[0];
    const totalMinutes = (hours.value.length) * 60;
    const startMinutes = ((hour < minHour ? hour + 24 : hour) * 60) - (minHour * 60);
    const startOffset = (startMinutes / totalMinutes) * 100 + "%";

    return { top: startOffset };
};

const getEventTypeClass = (type) => {
  const knownTypes = ['concert', 'spezial', 'workshop', 'Musik', 'Kunst', 'Gesellschaft', 'Sport', 'Wirtschaft'];
  return knownTypes.includes(type) ? type : 'default';
};
</script>

<style scoped>
.table-content {
    display: flex;
    width: 100%;
    gap: 0px;
}

.timeline {
    width: 70px;
    display: flex;
    flex-direction: column;
    position: relative;
}

.timeline-column {
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column;
}

.time-slots {
    position: relative;
    height: 100%;
    overflow-y: hidden;  /* No Scrollbars */
}

.time-slot {
    border-top: #aaa 1px solid;
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    height: 60px;
}

.stages {
    display: flex;
    flex-grow: 1;
    position: relative;
}

.stage {
    flex-grow: 1;
    border-left: 1px solid #aaa;
    position: relative;
}


.timeline-header {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* optional */
    text-align: center;
    font-weight: bold;
    padding: 5px;
    background-color: #e3e3e3;
    color: #2c3e50;
    position: relative;
}

.events {
    position: relative;
    overflow-y: hidden;
    height: 100%;
}

.event {
    position: absolute;
    left: 2.5px;
    right: 2.5px;
    /*font-size: clamp(10px, 0.8rem, 20px); /* dynamic size */
    line-height: 1.2rem;
    font-size: 1rem; /* to small on desktop */
    color: white;
    text-align: center;
    border-radius: 5px;
    padding: 0;
}

.event.concert {
  background-color: #3B82F6;
}
.event.spezial {
  background-color: #F59E0B;
}
.event.workshop {
  background-color: #10B981;
}
/* UPDATE-KOSMOS */
.event.Musik {
  background-color: #3B82F6;
}
.event.Kunst {
  background-color: #4F46E4;
}
.event.Gesellschaft {
  background-color: #10B981;
}
.event.Sport {
  background-color: #F59E0B;
}
.event.Wirtschaft {
  background-color: #4fffff;
}

.event.default {
  background-color: var(--bg-header);
}


</style>
