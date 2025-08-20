import axios from 'axios';
import { API_BASE } from './config';

// 공통 axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: API_BASE,
    timeout: 10000, // 10초 타임아웃
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터: 토큰 자동 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 에러 처리
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 401 에러 시 로그아웃 처리
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            // 즉시 로그인 페이지로 리다이렉트
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
