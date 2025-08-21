import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { id: number; name: string } | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 🔥 더미 로그인: 기본값 true
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ id: number; name: string } | null>({
    id: 1,
    name: "더미유저",
  });

  const login = () => {
    setIsAuthenticated(true);
    setUser({ id: 1, name: "더미유저" });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
