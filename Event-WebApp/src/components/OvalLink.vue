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
    type: String,
    required: false,
  },
  icon: {
    type: [Object, String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>
