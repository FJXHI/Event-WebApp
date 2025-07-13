<!-- ScheduleTable.vue -->
<!-- display schedule in a table format with navigation -->

<template>
    <div class="schedule-table scroll-head full-height">
        <div class="btn-header">
            <ToggleViewButton targetView="list" class="btn left"/>
            <ToogleStageTypeButton
                class="btn right"
                :stageTypeFilter="stageTypeFilter"
                @toggle="toggleStageType"
            />
        </div>
        <FlowBtn 
            class="flow-btn" 
            @click="FlowBtnClick">
            {{ $t('now')}}
        </FlowBtn>
        <div class="timetable scroll-y-area">
            <div v-for="(day, index) in days" :key="day" class="day-table">
                <DateHead
                    :date="day"
                    :index="index"
                    :sortedDateList="days"
                    :scrollToDate="scrollToDate"
                />
                <ScheduleTableItem 
                    ref="scheduleRef"
                    :date="day" 
                    :stageTypeFilter="stageTypeFilter"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEventData } from '@/scripts/useEventData.ts';
import ToggleViewButton from '@/components/SwitchView.vue';
import ToogleStageTypeButton from '@/components/SwitchViewType.vue';
import FlowBtn from '@/components/FlowBtn.vue';
import ScheduleTableItem from "@/components/ScheduleTableItem.vue";
import DateHead from '@/components/DateHead.vue';
import { dayStartTime, testNow } from '@/scripts/config.ts';
import { formatDateTime, useScrollToDate } from '@/scripts/functions.ts';
import { useRouter } from 'vue-router';

const router = useRouter();
const { scrollToDate } = useScrollToDate()
const { performances } = useEventData();

//const stageTypeOptions = ['stage', 'workshop', 'all'];
const stageTypeOptions = ['stage', 'all'];
const stageTypeFilter = ref('stage');

const scheduleRef = ref<any[]>([]);

function FlowBtnClick() {
  const items = scheduleRef.value;
  const todayStr = (testNow.value ?? new Date()).toLocaleDateString('sv-SE');

  const todayItem = items.find(item => item?.$props?.date === todayStr);

  const target = todayItem?.nowLine;
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.classList.add('highlight');
    setTimeout(() => target?.classList.remove('highlight'), 2000);
  } else {
    console.warn("nowLine not found");
  }
}


const toggleStageType = () => {
  const currentIndex = stageTypeOptions.indexOf(stageTypeFilter.value);
  stageTypeFilter.value = stageTypeOptions[(currentIndex + 1) % stageTypeOptions.length];
};

const days = computed<string[]>(() => {
    const shownDays = new Set<string>();

    performances.value.forEach(event => {
        const eventDate = new Date(event.start_time);
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

</script>

<style scoped>

</style>