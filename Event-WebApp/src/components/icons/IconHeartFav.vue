<template>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      :fill="isFilled ? 'red' : 'white'"
      :stroke="isFilled ? 'none' : 'red'"
      stroke-width="1.5"
      style="overflow: visible;"    
    >
      <path 
        fill-rule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
    </svg>
  </template>
  
  <script setup>
  defineProps({
    isFilled: Boolean
  })
  </script>