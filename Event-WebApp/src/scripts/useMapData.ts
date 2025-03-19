// useMapData.ts
// logic for load map data from map.json

import { ref, onMounted } from 'vue';
import { mapDataUrl } from '@/scripts/config';

// --- mapData.json: ----------------------------------------------------
// Interface representing the opening times of a map item
export interface OpeningTime {
  from: string; // ISO-Timeformat: "2025-04-30T18:00"
  to: string;   // 
  note?: string; // note for the opening time
}


// Interface representing a map items from mapData.json
export interface MapData {
    id: number; // unique identifier for the map item
    type: string; // type of map item (support only "point")
    name: string; // name of the map item
    kategori: string; // category of the map item
    location: number[]; // coordinates of the map item (latitude and longitude)
    noinclude?: boolean; // if "true" item not included when centering the map
    openingTimes?: OpeningTime[]; // optional opening times for the map item
    description?: string; // description of the map item
}

export function useMapData() {
    const mapData = ref<MapData[]>([]);
    const isLoading = ref<boolean>(true);
    const error = ref<{ message: string; code?: number } | null>(null);

    // load all data
    const loadData = async () => {
        try {
            const response = await fetch(mapDataUrl);
            if (!response.ok) throw new Error("Fehler beim Laden von mapData.json");
    
            const json = await response.json();
            mapData.value = json; 
            isLoading.value = false;
        } catch (err) {
            isLoading.value = false;
            error.value = { message: `Fehler beim Laden der Daten: ${err instanceof Error ? err.message : 'Unbekannter Fehler'}` };
            console.error("Fehler beim Laden von mapData.json:", err);
        }
    };

  onMounted(() => {
    loadData(); // start loading data when the component is mounted
  });

  return {
    mapData,
    isLoading,
    error
  };
}