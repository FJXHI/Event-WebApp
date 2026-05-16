<template>
  <div class="info-bg">
    <img 
      :src="baseUrl + '/Hut26_timetable_1_260517.jpg'"
      class="info-img"
    />
  </div>
</template>


<script setup lang="ts">
import { baseUrl } from '@/scripts/functions';
</script>

<style>
.info-img {
  width: 100%;
  height: auto;
  object-fit: contain;

}

.info-bg {
  width: 100%;
  height: 100%;
  background-color: var(--bg-space);
}
</style>