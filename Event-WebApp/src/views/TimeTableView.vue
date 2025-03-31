<template>
    <button @click="$router.push('/schedule')" class="btn-view-chang">{{ $t('change-view') }}</button>
    <TimeTableList />
</template>

<script setup lang="ts">
import TimeTableList from "@/components/TimeTableList.vue";
</script>

<style scoped>
.btn-view-chang {
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem; 
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0;
  background-color: #3B82F6;
}
</style>