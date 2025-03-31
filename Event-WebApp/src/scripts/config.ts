// config.ts
// This file contains the configuration for the data paths
// And utility functions that are needed everywhere

import { ref } from 'vue';
import type { Ref } from 'vue';

export const baseUrl = import.meta.env.BASE_URL;
export const mapDataUrl = `${baseUrl}data/mapData.json`;
export const actsUrl = `${baseUrl}data/acts.json`;
export const stagesUrl = `${baseUrl}data/stages.json`;
export const eventInfoUrl = `${baseUrl}data/eventInfo.json`;
export const performancesUrl = `${baseUrl}data/performances.json`;
export const dayStartTime = 8; // Start time of the day
export const eventFilters = ref({
    stages: [] as string[],           
    categories: [] as string[],       
    types: [] as string[],          
    performanceTags: [] as string[],  
    searchQuery: "",                 
    actIDs: [] as string[],
    performanceIDs: [] as string[],
  });



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


export const colorPalette = [
    '#e63946', // rot
    '#2a9d8f', // türkis
    '#457b9d', // blau
    '#7f5af0', // violett
    '#ff8906', // orange
    '#06d6a0', // cyan
    '#ef476f', // pink
    '#8ecae6', // hellblau
    '#0f766e', // teal
    '#1b9e77', // grün
    '#d95f02', // orange
    '#7570b3', // blau-violett
    '#e7298a', // pink
    '#66a61e', // grün
    '#e6ab02', // gelb
    '#a6761d', // braun
    '#ff7043', // orange
    '#e53935', // rot
    '#d81b60', // pink
    '#8e24aa', // violett
    '#5e35b1', // indigoblau
    '#3949ab', // blau
    '#1e88e5', // hellblau
    '#039be5', // cyan
    '#00acc1', // türkis
    '#00897b', // teal
    '#43a047', // grün
    '#7cb342', // limette
    '#c0ca33', // gelb-grün
    '#fdd835', // gelb
    '#ffb300', // amber
    '#fb8c00', // orange
    '#f4511e', // tieforange
    '#6d4c41', // braun
    '#757575', // grau
    '#546e7a', // blau-grau
    '#00838f', // petrol
    '#6a1b9a', // dunkles violett
    '#283593', // tiefblau
    '#1565c0', // sattes blau
    '#2e7d32', // tiefgrün
    '#9e9d24', // olivgrün
    '#ef6c00', // orangebraun
    '#b71c1c'  // blutrot
]

export function getColorForTag(name: string): string {
    const normalized = name.toLowerCase()
    let hash = 0
    const prime = 31  // Primzahl für stärkere Streuung
  
    // Bessere Streuung durch XOR und Multiplikation
    for (let i = 0; i < normalized.length; i++) {
      hash = (hash * prime) ^ normalized.charCodeAt(i)
    }
  
    // Streuung mit Modulo und Sicherstellung eines positiven Wertes
    const index = Math.abs(hash) % colorPalette.length
    return colorPalette[index]
}

export const getActNames = (actsArr: (number | string)[] = [], acts: Ref<any[]>): string => {
    return actsArr
        .map(actID => acts.value.find(act => act.id === actID)?.name || 'Unknown Artist')
        .join(', ');
};