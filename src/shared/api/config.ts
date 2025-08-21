// Production backend URL
const PRODUCTION_BACKEND = 'https://tendayapp-f0a0drg2b6avh8g3.koreacentral-01.azurewebsites.net/api';

// Determine if we're in development
const isDevelopment = 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.includes('localhost');

// Use environment variable if available, otherwise fall back to production backend
export const API_BASE = import.meta.env.VITE_API_BASE ?? PRODUCTION_BACKEND;

export function joinUrl(base: string, path: string) {
    if (!base.endsWith('/') && !path.startsWith('/')) return `${base}/${path}`;
    if (base.endsWith('/') && path.startsWith('/'))
        return `${base}${path.slice(1)}`;
    return `${base}${path}`;
}

// Debug logging for development
if (isDevelopment) {
    console.log('API Configuration:', {
        'Environment VITE_API_BASE': import.meta.env.VITE_API_BASE,
        'Resolved API_BASE': API_BASE,
        'Is Development': isDevelopment
    });
}
