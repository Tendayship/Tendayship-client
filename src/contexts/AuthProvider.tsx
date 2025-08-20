import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
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
            // 쿠키 기반 토큰 검증
            await axios.get('/api/auth/verify', {
                withCredentials: true,
            });

            // 사용자 정보 가져오기
            const userResponse = await axios.get<User>('/api/auth/me', {
                withCredentials: true,
            });

            setIsAuthenticated(true);
            setUser(userResponse.data);
        } catch (error) {
            console.error('인증 실패:', error);
            // 쿠키 기반 인증이므로 localStorage 처리 불필요
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
            // 서버에 로그아웃 요청하여 쿠키 무효화
            await axios.post('/api/auth/logout', {}, {
                withCredentials: true,
            });
        } catch (error) {
            console.error('로그아웃 요청 실패:', error);
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
                refreshAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
