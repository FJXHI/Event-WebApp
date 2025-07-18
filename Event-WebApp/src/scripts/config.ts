// config.ts
// This file contains the configuration for the data paths

import { ref } from 'vue';

//ERROR-FIX: import baseUrl from functions.ts dont work
const baseUrl = import.meta.env.BASE_URL;

export const mapDataUrl = `${baseUrl}data/HWmapData.json`;
export const actsUrl = `${baseUrl}data/HWacts.json`;
export const stagesUrl = `${baseUrl}data/HWstages.json`;
export const eventInfoUrl = `${baseUrl}data/HWeventInfo.json`;
export const performancesUrl = `${baseUrl}data/HWperformances.json`;
export const dayStartTime = 8; // Start time of the day
export const newsApiUrl = 'https://fjxhi.github.io/me/data/HW-newsAPI.json';
export const testNow = ref<Date | null>(null);
//testNow.value = new Date('2025-07-25T20:50:00');

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