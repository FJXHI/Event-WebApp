<!-- ActList.vue -->
<!-- A list of acts with a favorite button -->

<template>
  <div class="act-list">
    <SearchBar v-show="showSearch === 'true'" @apply="updateSearch"/>
    <ul v-if="filteredActs.length > 0" class="list-item-ul">
      <li v-for="act in filteredActs" :key="act.id" class="list-item-obj">
        <!-- ERROR-FIX Style Link on hole line, text with padding -->
        <router-link 
          :to="'/act/' + (act['id-name']?.trim() ? act['id-name'] : act.id)" 
          class="list-item-link">
          <div class="list-item-info pad">
            <strong class="list-item-name">{{ act.name }}</strong>
            <span class="list-item-tags">
              <TagLabel 
                v-for="(tag, index) in act.tags.filter(tag => tag.visible)" 
                :key="index"
                :name=tag.name
                class="tag-label-item TagLabel"
              />
            </span>
          </div>
        </router-link>
        <FavoriteButton :itemId="String(act.id)" itemType="act" class="list-item-fav-btn" />
      </li>
    </ul>
    <p v-else>{{ $t('no-acts') }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useEventData } from "@/scripts/useEventData";
import FavoriteButton from '@/components/FavBtn.vue';
import TagLabel from '@/components/tagLabel.vue';
import SearchBar from '@/components/SearchBar.vue';


// Function to show the SearchBar
const route = useRoute()
const showSearch = computed(() => route.query.search ?? 'false')

const searchQuery = ref('');

const updateSearch = (query: string) => {
  searchQuery.value = query.toLowerCase().trim();
};

// load acts from useEventData
const { acts } = useEventData();

// Define props
const props = defineProps<{
  filterID?: number[];
}>();

// Filter acts by filterID and search query
const filteredActs = computed(() => {
  if (!acts.value || acts.value.length === 0) return []; // If acts are not loaded yet, return empty array

  let results = acts.value; // show all acts if no filter is set

  // filter by IDs
  if (props.filterID && props.filterID.length > 0) {
    results = results.filter(act => props.filterID!.includes(act.id));
  }

  // filter by search query (name & description)
  if (searchQuery.value) {
    results = results.filter(act => {
      const name = act.name?.toLowerCase() || '';
      const description = act.description?.toLowerCase() || '';
      return name.includes(searchQuery.value) || description.includes(searchQuery.value);
    });
  }

  return results;
});
</script>
