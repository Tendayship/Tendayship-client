import axios from 'axios';
import { API_BASE } from './config';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('Axios instance created with baseURL:', API_BASE);

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const baseURL = config.baseURL || '';
    const url = config.url || '';
    console.log(`Making ${config.method?.toUpperCase()} request to:`, baseURL + url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 자동 리다이렉트 제거
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`Received ${response.status} response from:`, response.config.url);
    return response;
  },
  (error) => {
    // 401 에러 시 자동 리다이렉트 제거
    // 각 컴포넌트에서 401을 적절히 처리하도록 함
    const status = error.response?.status;
    const currentPath = window.location.pathname;
    const url = error.config?.url;
    
    console.log(`${status || 'Network'} error from:`, url, error.message);
    
    if (status === 401) {
      // 로그인 페이지에서는 추가 리다이렉트하지 않음
      if (currentPath === '/login') {
        console.log('로그인 페이지에서 401 발생 - 정상 동작');
      } else {
        // 다른 페이지에서 401 발생 시에도 강제 리다이렉트하지 않음
        // ProtectedRoute에서 처리하도록 함
        console.log('인증이 필요한 요청에서 401 발생');
      }
    } else if (status === 404) {
      console.error('404 Not Found - 엔드포인트가 존재하지 않습니다:', url);
    } else if (status >= 500) {
      console.error('서버 오류 발생:', status, url);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
