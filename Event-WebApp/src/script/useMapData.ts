// useMapData.ts
// logic for load map data from map.json

import { ref, onMounted } from 'vue';

// --- mapData.json: ----------------------------------------------------
// Interface representing a map items from mapData.json
export interface MapData {
    id: number;
    type: string;
    name: string;
    kategori: string;
    location: number[];
    noinclude?: boolean;
}

export function useMapData() {
    const mapData = ref<MapData[]>([]);
    const isLoading = ref<boolean>(true);
    const error = ref<{ message: string; code?: number } | null>(null);

    // load all data at once
    const loadData = async () => {
        try {
            const response = await fetch(`${import.meta.env.BASE_URL}data/mapData.json`);
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