import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import axiosInstance from '../shared/api/axiosInstance';
import { AuthContext, type User } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await axiosInstance.get('/auth/verify');
      const userResponse = await axiosInstance.get('/auth/me');
      
      setIsAuthenticated(true);
      setUser(userResponse.data);
    } catch (unknownError) {
      // 타입 가드를 사용한 안전한 에러 처리
      function isAxiosError(error: unknown): error is { response?: { status?: number } } {
        return (
          typeof error === 'object' &&
          error !== null &&
          'response' in error &&
          typeof (error as { response?: unknown }).response === 'object'
        );
      }

      if (isAxiosError(unknownError) && unknownError.response?.status === 401) {
        console.log('미로그인 상태 - 정상');
      } else {
        console.error('인증 확인 중 오류:', unknownError);
      }
      
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    // 쿠키 기반 인증이므로 토큰 매개변수 제거
    // 서버에서 이미 쿠키를 설정했으므로 상태만 업데이트
    await checkAuthStatus();
  };

  const logout = async () => {
    try {
      // 서버에 로그아웃 요청하여 쿠키 무효화 - axiosInstance 사용
      await axiosInstance.post('/auth/logout', {});
    } catch (unknownError) {
      // 타입 가드를 사용한 안전한 에러 처리
      console.error('로그아웃 요청 실패:', unknownError);
    } finally {
      // 클라이언트 상태 초기화
      setIsAuthenticated(false);
      setUser(null);
      window.location.href = '/login';
    }
  };

  const refreshAuth = async () => {
    await checkAuthStatus();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isLoading, 
        user, 
        login, 
        logout, 
        refreshAuth 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
