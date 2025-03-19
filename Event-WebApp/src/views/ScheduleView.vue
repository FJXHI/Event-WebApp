<!-- ScheduleView.vue -->
<template>
  <div>
    <!-- SwitchViewButton in Schedule Components -->
    <!-- Load both TimeTable Variants, show only one -->
    <div v-show="view === 'list'" class="full-height">
      <ScheduleList class="full-height"/>
    </div>
    <div v-show="view === 'table'" class="full-height">
      <ScheduleTable class="full-height" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import ScheduleList from "@/components/ScheduleList.vue";
import ScheduleTable from '@/components/ScheduleTable.vue'


const route = useRoute()
const router = useRouter()

const view = computed(() => route.query.view ?? 'list')

/*function toggleView() {
  const newView = view.value === 'table' ? 'list' : 'table'
  router.replace({ query: { ...route.query, view: newView } })
}*/
</script>
