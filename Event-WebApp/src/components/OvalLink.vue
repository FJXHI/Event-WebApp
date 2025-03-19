<!-- OvalLink.vue -->
<!-- A Oval with Icon, Text and Link -->

<template>
  <div class="oval-link-div">
    <component :is="link ? 'router-link' : 'div'" :to="link" class="oval-link-item">
      <component :is="icon" /><span class="oval-link-item-span">{{ name }}</span>
    </component>
  </div>
</template>
<!-- &#x1F4CD; -->

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  link: {
    type: [String, Object],
    required: false,
  },
  icon: {
    type: [Object, String],
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.oval-link-div  {
  margin-top: 10px;
}

.oval-link-item {
  /* Color in base.css */
  color: var(--oval-line); 
  border: var(--oval-line) 2px solid;
  display: inline-flex;
  width: auto;
  align-items: center;
  margin-left: 0;
  margin-bottom: 0;
  margin-right: 0;
  padding: 8px 12px;
  height: 36px;
  border-radius: 20vw;
}

.oval-link-item-span {
  font-size: 0.9rem;
  font-weight: bold;
}

</style>