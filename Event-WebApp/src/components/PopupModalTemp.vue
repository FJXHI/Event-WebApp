<!-- PopupModalTemp.vue -->
<!-- A Vue component for displaying content in a modal popup.
     It includes a close button and can be customized with slots. -->


<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="emitClose">
    <div class="modal-content">
      <div v-if="showDefaultClose" class="modal-header">
        <button v-if="showDefaultClose" @click="emitClose" class="modal-close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  showDefaultClose: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:modelValue'])

function emitClose() {
  emit('update:modelValue', false)
}
</script>
  
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text);
}
.modal-body {
  max-height: 70vh; /* 70% of viewport height */
  overflow-y: auto; /* Add a scrollbar, if too much content */ 
}
</style>
  