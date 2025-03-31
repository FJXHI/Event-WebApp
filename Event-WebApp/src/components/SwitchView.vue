<template>
    <button @click="switchView" class="btn-view-chang">{{ $t('change-view') }}</button>
</template>
  
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const props = defineProps<{
targetView: string
}>()

const router = useRouter()
const route = useRoute()

const switchView = () => {
router.replace({
    query: { ...route.query, view: props.targetView }
})
}
</script>

<style scoped>
.btn-view-chang {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem; 
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0;
}
</style>