// src/shared/api/request.ts - Axios 기반으로 통합
import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import axiosInstance from './axiosInstance';

// 기존 HttpError 클래스 유지 (호환성)
export class HttpError extends Error {
    status: number;
    body?: unknown;
    constructor(status: number, body?: unknown) {
        super(`HTTP ${status}`);
        this.status = status;
        this.body = body;
    }
}

// FastAPI 표준 오류 포맷
export type FastApiValidationError = {
    loc: (string | number)[];
    msg: string;
    type: string;
};

export type FastApiErrorBody =
    | { detail: string }
    | { detail: FastApiValidationError[] };

type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// Axios 응답을 기존 인터페이스와 호환되게 변환
async function axiosRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    data?: Json,
    config?: AxiosRequestConfig
): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axiosInstance.request({
            method,
            url: path,
            data,
            ...config,
        });
        return response.data;
    } catch (error: unknown) {
        // Axios 에러를 HttpError로 변환 (기존 코드 호환성)
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as {
                response: { status: number; data: unknown };
            };
            throw new HttpError(
                axiosError.response.status,
                axiosError.response.data
            );
        }
        throw error;
    }
}

// 기존 http 인터페이스 유지 (하위 호환성)
export const http = {
    get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
        return axiosRequest<T>('GET', path, undefined, config);
    },

    post<T, B extends Json = Json>(
        path: string,
        body?: B,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return axiosRequest<T>('POST', path, body, config);
    },

    put<T, B extends Json = Json>(
        path: string,
        body?: B,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return axiosRequest<T>('PUT', path, body, config);
    },

    patch<T, B extends Json = Json>(
        path: string,
        body?: B,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return axiosRequest<T>('PATCH', path, body, config);
    },

    delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
        return axiosRequest<T>('DELETE', path, undefined, config);
    },
};

// 직접 axios 인스턴스도 export (고급 사용자용)
export { default as axios } from './axiosInstance';
