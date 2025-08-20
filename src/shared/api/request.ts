// src/shared/api/request.ts
import { API_BASE, joinUrl } from './config';

export class HttpError extends Error {
    status: number;
    body?: unknown;
    constructor(status: number, body?: unknown) {
        super(`HTTP ${status}`);
        this.status = status;
        this.body = body;
    }
}

type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const url = joinUrl(API_BASE, path);
    const headers = new Headers(init.headers);

    // 자동 JSON 헤더
    if (init.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const res = await fetch(url, { ...init, headers });
    const text = await res.text();
    const data = text ? safeJson(text) : undefined;

    if (!res.ok) throw new HttpError(res.status, data);
    return data as T;
}

function safeJson(input: string) {
    try {
        return JSON.parse(input);
    } catch {
        return input;
    }
}

export const http = {
    get<T>(path: string, init?: RequestInit) {
        return request<T>(path, { ...init, method: 'GET' });
    },
    post<T, B extends Json = Json>(path: string, body?: B, init?: RequestInit) {
        return request<T>(path, {
            ...init,
            method: 'POST',
            body: body != null ? JSON.stringify(body) : undefined,
        });
    },
    put<T, B extends Json = Json>(path: string, body?: B, init?: RequestInit) {
        return request<T>(path, {
            ...init,
            method: 'PUT',
            body: body != null ? JSON.stringify(body) : undefined,
        });
    },
    patch<T, B extends Json = Json>(
        path: string,
        body?: B,
        init?: RequestInit
    ) {
        return request<T>(path, {
            ...init,
            method: 'PATCH',
            body: body != null ? JSON.stringify(body) : undefined,
        });
    },
    delete<T>(path: string, init?: RequestInit) {
        return request<T>(path, {
            ...init,
            method: 'DELETE',
        });
    },
};
