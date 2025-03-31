// config.ts
// This file contains the configuration for the data paths
// And utility functions that are needed everywhere

export const baseUrl = import.meta.env.BASE_URL;
export const mapDataUrl = `${baseUrl}data/mapData.json`;
export const actsUrl = `${baseUrl}data/acts.json`;
export const stagesUrl = `${baseUrl}data/stages.json`;
export const eventInfoUrl = `${baseUrl}data/eventInfo.json`;
export const performancesUrl = `${baseUrl}data/performances.json`;
export const dayStartTime = 8; // Start time of the day

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
  