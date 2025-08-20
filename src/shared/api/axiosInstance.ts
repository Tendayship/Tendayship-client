import axios from 'axios';
import { API_BASE } from './config';

// 공통 axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: API_BASE,
    timeout: 10000, // 10초 타임아웃
    withCredentials: true, // 쿠키 기반 인증을 위해 추가
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터: 쿠키 기반 인증으로 변경 (Authorization 헤더 제거)
axiosInstance.interceptors.request.use(
    (config) => {
        // 쿠키 기반 인증이므로 Authorization 헤더 설정 제거
        // withCredentials가 true로 설정되어 있어 쿠키가 자동으로 전송됨
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
            // 쿠키 기반 인증이므로 localStorage 토큰 제거 불필요
            // 서버에서 쿠키를 만료시키므로 클라이언트에서는 리다이렉트만 처리
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
