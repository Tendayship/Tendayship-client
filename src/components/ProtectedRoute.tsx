// import type { ReactNode } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// interface ProtectedRouteProps {
//     children: ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//     const { isAuthenticated, isLoading } = useAuth();

//     if (isLoading) {
//         return (
//             <div className="flex min-h-screen items-center justify-center bg-gray-50">
//                 <div className="text-center">
//                     <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
//                     <p className="text-gray-600">로딩 중...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!isAuthenticated) {
//         return <Navigate to="/login" replace />;
//     }

//     return <>{children}</>;
// };

// export default ProtectedRoute;


import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // 로딩 중일 때는 리다이렉트하지 않음
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        로딩 중...
      </div>
    );
  }
  
  // 로딩이 끝난 후에만 인증 상태 확인
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
