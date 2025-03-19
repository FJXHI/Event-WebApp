<template>
  <div>
    <h2 class="text-xl font-bold">{{ $t('actview') }}</h2>
    <ActList />
  </div>
</template>

<script setup lang="ts">
import ActList from '@/components/ActList.vue';
</script>