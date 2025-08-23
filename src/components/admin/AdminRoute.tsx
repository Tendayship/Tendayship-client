import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAdminAccess } from '../../api/adminApi';
import { useAuth } from '../../contexts/useAuth';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [hasAdminAccess, setHasAdminAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAdminAccess = async () => {
      if (!isAuthenticated || !user) {
        setHasAdminAccess(false);
        setIsLoading(false);
        return;
      }

      try {
        const hasAccess = await checkAdminAccess();
        setHasAdminAccess(hasAccess);
      } catch (error) {
        console.error('Admin access check failed:', error);
        setHasAdminAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAdminAccess();
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">관리자 권한 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (hasAdminAccess === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            접근 권한이 없습니다
          </h1>
          <p className="text-gray-600 mb-6">
            관리자 권한이 필요한 페이지입니다.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            이전 페이지로
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;