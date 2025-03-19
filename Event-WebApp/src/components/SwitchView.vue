<template>
    <button @click="switchView">{{ $t('change-view') }}</button>
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
</style>