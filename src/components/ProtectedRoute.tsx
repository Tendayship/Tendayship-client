import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { storeReturnUrl } from '../shared/utils/pathUtils';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Store the current path for post-login redirect
    const currentPath = location.pathname + location.search + location.hash;
    
    // Avoid storing login/auth paths
    if (!currentPath.includes('/login') && !currentPath.includes('/auth/')) {
      storeReturnUrl(currentPath);
    }
    
    // Redirect to login with returnUrl parameter
    const returnUrl = encodeURIComponent(currentPath);
    return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
