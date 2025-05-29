// functions.ts
// This file contains functions that are needed everywhere

import { ref } from 'vue';
import type { Ref } from 'vue';

//BaseURL for routing
export const baseUrl = import.meta.env.BASE_URL;

// object to store the filters for the events
export const eventFilters = ref({
    stages: [] as string[],
    stageTypes: [] as string[],           
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

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Function to get the Color for a Tag (string)
// This function generates a color based on the tag name using a hash function
import { colorPalette } from './config';
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
    // use parseDateIgnoringTimezone function
    const date = parseDateIgnoringTimezone(dateTimeString);
    
    let options;

    switch (formatType) {
        case 'Date Long':
            options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour12: hour12
            };
            break;
        case 'Date Short':
            options = {
                day: '2-digit',
                month: '2-digit',
                hour12: hour12
            };
            break;
        case 'Time':
            options = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: hour12
            };
            break;
        case 'Date Short Time':
            options = {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: hour12
            };
            break;
        case 'Date Long Time':
            options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: hour12
            };
            break;
        case 'ISO':
            return date.toISOString().split('T')[0]; // Only date part (yyyy-mm-dd)
        default:
            options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: hour12
            };
            break;
    }

    return new Intl.DateTimeFormat(locale, options).format(date);
}

// Function to parse date ignoring timezone
export function parseDateIgnoringTimezone(dateTimeString: string): Date {
    const [datePart, timePart] = dateTimeString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);

    // if no time part is present, set hour and minute to 0
    const [hour, minute] = timePart ? timePart.replace('Z', '').split(':').map(Number) : [0, 0];

    return new Date(year, month - 1, day, hour, minute);
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
import { useI18n } from 'vue-i18n';
export function getFavoriteSubtext2(count: number): string {
    const { t } = useI18n(); // Zugriff auf i18n-Funktion

    if (count === 0) {
    return t('count-favorites.none');  // Übersetzung für "Keine Favoriten"
    }
    if (count === 1) {
    return t('count-favorites.one');  // Übersetzung für "1 Favorit"
    }
    return t('count-favorites.many', { count });  // Übersetzung für "x Favoriten"
}