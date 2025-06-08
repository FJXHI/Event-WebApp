<!-- FlowBtn.vue -->
<template>
  <button
    class="flow-btn"
  >
    <slot><!-- Space for Content --></slot>
  </button>
</template>

<script>

</script>

<style scoped>
.flow-btn {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem 1.5rem;
    margin: 0.25rem;
    color: black;
    background-color: white;
    border: 2px solid black;
    border-radius: 9999px;
    text-align: center;
    cursor: pointer;
    font-size: 1rem;
}

</style>