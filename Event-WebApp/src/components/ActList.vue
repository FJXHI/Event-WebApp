<!-- ActList.vue -->
<!-- A list of acts with a favorite button -->

<template>
  <div class="act-list">
    <ul v-if="filteredActs.length > 0">
      <li v-for="act in filteredActs" :key="act.id">
        <router-link :to="'/act/' + (act['id-name']?.trim() ? act['id-name'] : act.id)">
          <strong>{{ act.name }}</strong><span v-if="act.subname"> - {{ act.subname }}</span>
        </router-link>
        <FavoriteButton :itemId="String(act.id)" itemType="act" />
      </li>
    </ul>
    <p v-else>{{ $t('no-acts') }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEventData } from "@/useEventData.ts";
import FavoriteButton from '@/components/FavBtn.vue';

// load acts from useEventData
const { acts } = useEventData();

// Define props
const props = defineProps<{
  filterID?: number[];
}>();

//const filterID = computed(() => props.filterID ?? []);

// Filter acts by filterID
const filteredActs = computed(() => {
  if (!acts.value || acts.value.length === 0) return []; // If acts are not loaded yet, return empty array
  if (!props.filterID || props.filterID.length === 0) return acts.value; // show all acts if no filter is set
  return acts.value.filter((act) => props.filterID?.includes(act.id));
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  padding: 5px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
