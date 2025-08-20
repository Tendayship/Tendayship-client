export const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

export function joinUrl(base: string, path: string) {
    if (!base.endsWith('/') && !path.startsWith('/')) return `${base}/${path}`;
    if (base.endsWith('/') && path.startsWith('/'))
        return `${base}${path.slice(1)}`;
    return `${base}${path}`;
}
