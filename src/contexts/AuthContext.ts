import { createContext } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    birth_date?: string;
    profile_image_url?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    refreshAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
