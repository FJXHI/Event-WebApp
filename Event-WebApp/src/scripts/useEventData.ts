import { ref, onMounted } from 'vue';
import { performancesUrl, stagesUrl, actsUrl, eventInfoUrl } from '@/scripts/config'; // Import JSON URLs from config

// Address interface shared by EventInfo and Stage
export interface Address {
  street?: string; // Optional street name
  postal_code?: string; // Optional postal code
  city?: string; // Optional city name
  country?: string; // Optional country name
}

// --- acts.json: ----------------------------------------------------
// Interface representing an Act from acts.json
export interface Act {
  id: number; // Unique identifier for the act
  name: string; // Name of the act
  subname?: string; // Optional subname for the act
  'act-type': string[]; // List of act types (e.g., Artist, Band, etc.)
  tags: Tag[]; // List of tags representing genres or characteristics of the act
  'id-name'?: string | null; // Optional id for links, can be null if not available
  'short-description'?: string | null; // Optional short description of the act
  description?: string; // Detailed description of the act
  image?: string; // Optional image URL of the act
  weblinks?: Weblink[]; // Optional list of weblinks (e.g., social media or official pages)
}

// Tag interface representing each tag in acts.json
export interface Tag {
  name: string; // Name of the tag (e.g., genre name)
  visible: boolean; // Whether the tag is visible to the user
}

// Weblink interface representing each link in acts.json
export interface Weblink {
  name: string; // Name of the web link (e.g., "Facebook")
  url: string; // URL of the web link
}

// --- stages.json: ----------------------------------------------------
// Interface representing a Stage from stages.json
export interface Stage {
  id: number; // Unique identifier for the stage
  name: string; // Name of the stage
  'id-name'?: string; // Unique identifier for the stage (used for links)
  'short-description'?: string; // Optional short description of the stage
  description?: string; // Detailed description of the stage
  location?: number[]; // Optional array of coordinates [latitude, longitude]
  address?: Address; // Optional address of the stage (can be missing)
  image?: string; // Optional image URL for the stage
  capacity?: number; // Optional capacity of the stage (audience size)
  visible?: boolean; // Optional field to determine visibility of the stage
  type?: string; // Optional stage type (e.g., "Open-Air", "Indoor")
  features?: string[]; // Optional list of features (e.g., "VIP Area", "Audio System")
  url?: string; // Optional URL for more information about the stage
}

// --- performances.json: ----------------------------------------------------
// TicketInfo interface representing the ticket information for performances
export interface TicketInfo {
  available?: boolean; // Whether tickets are available
  price?: number; // Price of the ticket
  currency?: string; // Currency used for the ticket price (e.g., "EUR")
  url?: string; // URL to purchase tickets
}

// Interface representing a Performance from performances.json
export interface Performance {
  id: number; // Unique identifier for the performance
  actsIDArr: number[]; // Array of act IDs involved in this performance
  stageID: number; // The ID of the stage where the performance takes place
  'id-name'?: string; // Optional id for the performance (used for links)
  name?: string; // Optional name of the performance (could be null)
  'short-description'?: string; // Optional short description of the performance
  description?: string; // Detailed description of the performance
  start_time: string; // Start time of the performance (ISO format)
  end_time: string; // End time of the performance (ISO format)
  date: string; // Date of the performance
  status?: string; // Optional status of the performance (e.g., "active", "canceled")
  type?: string; // Optional type of the performance (e.g., "Concert", "Workshop")
  tags?: string[]; // Optional tags associated with the performance (e.g., ["concert", "music"])
  ticket?: boolean; // Optional flag indicating if tickets are available
  ticket_info?: TicketInfo; // Optional detailed ticket information
  url?: string; // Optional URL for more details or purchasing tickets
}

// --- eventInfo.json: ----------------------------------------------------
// Interface for Location within EventInfo
export interface Location {
  name?: string; // Optional name of the event location
  address?: Address; // Optional Address object
  gps?: { latitude: number; longitude: number }; // Optional GPS coordinates object
}

// About-Interface for the "about" section in EventInfo
export interface AboutItem {
  id: number; // ID for each About item
  name: string; // Name of the item (e.g., "Photography/Video")
  subtitle?: string; // Optional subtitle
  icon?: string | null; // Optional icon (can be null)
  text: string; // Description of the item
}

// Main Interface for EventInfo
export interface EventInfo {
  id: number; //if no ID is available
  title: string; // if the title is missing
  subtitle?: string; // Optional, if the subtitle is missing
  'short-describtion'?: string; // Optional, if the short description is missing
  describtion?: string; // Optional, if the detailed description is missing
  backgroundImage?: string; // Optional, if the background image is missing
  logo?: string; // Optional, if the logo is missing
  startDate?: string; // Optional, if the start date is missing
  endDate?: string; // Optional, if the end date is missing
  location?: Location; // Optional, if no location is available
  about?: AboutItem[]; // Optional, if no About items are available
}

// --- load data from json files -------------------------------------
export function useEventData() {
  const performances = ref<Performance[]>([]);
  const stages = ref<Stage[]>([]);
  const acts = ref<Act[]>([]);
  const eventInfo = ref<Partial<EventInfo>>({});
  const isLoading = ref<boolean>(true);
  const error = ref<{ message: string; code?: number } | null>(null);

  // load all data at once
  const loadData = async () => {
    try {
      // load all data in parallel
      const [performancesResponse, stagesResponse, actsResponse, eventInfoResponse] = await Promise.allSettled([
        fetch(performancesUrl),
        fetch(stagesUrl),
        fetch(actsUrl),
        fetch(eventInfoUrl)
      ]);
        
      // check if all fetch calls were successful
      if (performancesResponse.status === 'fulfilled' && stagesResponse.status === 'fulfilled' &&
        actsResponse.status === 'fulfilled' && eventInfoResponse.status === 'fulfilled') {
        
        // Validating the JSON content
        try {
          performances.value = await performancesResponse.value.json();
          stages.value = await stagesResponse.value.json();
          acts.value = await actsResponse.value.json();
          eventInfo.value = await eventInfoResponse.value.json();
        } catch (error) {
          throw new Error('Error while parsing JSON data.');
        }

        isLoading.value = false; // All data has been successfully loaded
      } else {
        throw new Error('Some data could not be loaded.');
      }
    } catch (err) {
      isLoading.value = false; // stop loading in case of an error
      error.value = { message: ` Error loading data: ${err instanceof Error ? err.message : 'Unknown error'}` };
      console.error('Data could not be loaded:', err);
    }
  };

  onMounted(() => {
    loadData(); // start loading data when the component is mounted
  });

  return {
    performances,
    stages,
    acts,
    eventInfo,
    isLoading,
    error
  };
}
