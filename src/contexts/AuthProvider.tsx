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
        const token = localStorage.getItem('access_token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            // 토큰 검증
            await axios.get('/api/auth/verify', {
                headers: { Authorization: `Bearer ${token}` },
            });

            // 사용자 정보 가져오기
            const userResponse = await axios.get<User>('/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setIsAuthenticated(true);
            setUser(userResponse.data);
        } catch (error) {
            console.error('인증 실패:', error);
            localStorage.removeItem('access_token');
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = (token: string) => {
        localStorage.setItem('access_token', token);
        setIsAuthenticated(true);
        // 토큰 설정 후 사용자 정보 다시 조회
        checkAuthStatus();
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = '/login';
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
