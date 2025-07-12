// functions.ts
// This file contains functions that are needed everywhere

import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n';
import { colorPalette } from './config'; // List of colors for TagLabel

//BaseURL for routing
export const baseUrl = import.meta.env.BASE_URL;


// object to store the filters for the events
export const eventFilters = ref({
    stages: [] as string[],
    stageTypes: [] as string[],
    stageFeatures: [] as string[],           
    categories: [] as string[],
    actTypes: [] as string[],
    perforTypes: [] as string[],          
    performanceTags: [] as string[],  
    searchQuery: "",                 
    actIDs: [] as string[],
    performanceIDs: [] as string[],
  });


// Change Theme Mode (dark/light/system)
export function applyTheme(theme: 'light' | 'dark' | 'system') {
    localStorage.setItem('theme', theme)
  
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = theme === 'dark' || (theme === 'system' && prefersDark)
  
    document.documentElement.classList.toggle('dark', isDark)
}


// Get the Name of the Act from the ID
export const getActNames = (actsArr: (number | string)[] = [], acts: Ref<any[]>): string => {
    return actsArr
        .map(actID => acts.value.find(act => act.id === actID)?.name || 'Unknown Artist')
        .join(', ');
};


// Capitalize a string
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);


// Function to get the Color for a Tag (string)
// This function generates a color based on the tag name using a hash function
export function getColorForTag(name: string): string {
    const normalized = name.toLowerCase()
    let hash = 0
    const prime = 31  // A prime number to help with the hash function

    // better scattering through XOR and multiplication
    for (let i = 0; i < normalized.length; i++) {
      hash = (hash * prime) ^ normalized.charCodeAt(i)
    }

    // Scattering with modulo and ensuring a positive value 
    const index = Math.abs(hash) % colorPalette.length
    return colorPalette[index]
}


// Function to format address
export function formatAddress(address, type = 'full') {
    switch (type) {
        case 'noCountry':
            return `${address.street}, ${address.postal_code} ${address.city}`;
        case 'streetPostal':
            return `${address.street}, ${address.postal_code}`;
        case 'streetCity':
            return `${address.street}, ${address.city}`;
        case 'postalCity':
            return `${address.postal_code} ${address.city}`;
        case 'onlyStreet':
            return `${address.street}`;
        case 'onlyPostal':
            return `${address.postal_code}`;
        case 'onlyCity':
            return `${address.city}`;    
        case 'onlyCountry':
            return `${address.country}`;
        case 'full':
        default:
            return `${address.street}, ${address.postal_code} ${address.city}, ${address.country}`;
    }
}


// Function to format date and time ignoring timezone
export function formatDateTime(dateTimeString: string, formatType = 'Date Time', hour12 = false, locale = 'de-DE') {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return ''; // Ungültiger Zeitpunkt

    const baseOptions = {
        timeZone: 'Europe/Berlin',
        hour12: hour12,
    };

    let options: Intl.DateTimeFormatOptions;

    switch (formatType) {
        case 'Date Long':
            options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            break;
        case 'Date Short':
            options = { day: '2-digit', month: '2-digit' };
            break;
        case 'Time':
            options = { hour: '2-digit', minute: '2-digit' };
            break;
        case 'Date Short Time':
            options = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
            break;
        case 'Date Long Time':
            options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            break;
        case 'ISO Long':
            return date.toISOString(); // z.B. "2025-07-23T16:00:00.000Z"
        case 'ISO':
            return date.toISOString().split('T')[0]; // Only date part (yyyy-mm-dd)
        default:
            options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            break;
    }

    return new Intl.DateTimeFormat(locale, { ...baseOptions, ...options }).format(date);
}

// Function to parse date ignoring timezone // Not in use anymore
export function parseDateIgnoringTimezone(dateTimeString: string): Date {
    const [datePart, timePartRaw] = dateTimeString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
  
    if (!year || !month || !day) return new Date(NaN); // Invalid input format
  
    // Clean time part: remove 'Z' or timezone offsets like "+01:00"
    const timePart = timePartRaw?.replace(/Z|[+-]\d{2}:\d{2}$/, '') ?? '';
    const [hour = 0, minute = 0, second = 0] = timePart.split(':').map(Number);
  
    // Create a local Date object without applying timezone offsets
    return new Date(year, month - 1, day, hour, minute, second);
  }
  

// get favorite items from local storage
export function getFavoriteItems(itemKey: string, itemData: any[]): any[] {
    const favoriteIds = JSON.parse(localStorage.getItem(itemKey) || '[]');
    return itemData.filter(item => favoriteIds.includes(item.id.toString()));
  }


// render string for Subtext in the favorites page
export function getFavoriteSubtext(count: number): string {
    if (count === 0) return 'Keine Favoriten';
    if (count === 1) return '1 Favorit';
    return `${count} Favoriten`;
}


// count favorites with i18n support
export function getFavoriteSubtext2(count: number): string {
    const { t } = useI18n(); // access the i18n instance

    if (count === 0) {
    return t('count-favorites.none');  // Transation for "No Favorites"
    }
    if (count === 1) {
    return t('count-favorites.one');  // Transation for "one Favorites"
    }
    return t('count-favorites.many', { count });  // Transation for "more Favorites"
}



export function useScrollToDate() {
  const route = useRoute()
  const router = useRouter()

  function scrollToDate(targetDate: string) {
    // Update URL hash (without new History Entry)
    router.replace({
      hash: `#${targetDate}`,
      query: { ...route.query },
    })

    // Check the current View
    const view = route.query.view ?? 'list';
    const containerSelector = view === 'list' ? '.schedule-list' : '.schedule-table'
    const visibleContainer = document.querySelector(containerSelector)

    const el = visibleContainer?.querySelector(`[id='${targetDate}']`)
    console.log(`Scroll to ${targetDate} in ${view}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    scrollToDate,
  }
}

// Function to get the next performance from a list of performances
export function getNextPerformance<T extends { start_time: string | Date }>(performances: T[]): T | null {
    const now = new Date();
    return (
      performances
        ?.filter(p => new Date(p.start_time) > now)
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())[0] || null
    );
}

// Function to generate a share URL with the favorites in localStorage
export function generateShareUrlParams() {
    const keys = ['act', 'event', 'stage']
    const params: string[] = []

    params.push('share=true')

    for (const key of keys) {
        const raw = localStorage.getItem(key)
        if (!raw) continue

        let ids: unknown
        try {
        ids = JSON.parse(raw)
        } catch (e) {
        console.warn(`Kann ${key} nicht parsen`, e)
        continue
        }

        if (!Array.isArray(ids)) continue

        const validIds = ids
        .map((id) => parseInt(id as string))
        .filter((n) => !isNaN(n))

        if (validIds.length > 0) {
        // Manuell und "clean":
        const value = validIds.join('+') // oder ','
        //const value = encodeURIComponent(validIds.join('+'))
        params.push(`${key}=${value}`)
        }
    }
    return `?${params.join('&')}`
}