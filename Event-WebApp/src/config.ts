export const baseUrl = import.meta.env.BASE_URL;

export function formatDateTime(dateTimeString, formatType = 'Date Time', hour12 = false, locale = 'de-DE') {
    const date = new Date(dateTimeString);

    let options;

    switch(formatType) {
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
  