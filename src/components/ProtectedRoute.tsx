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
import { useAuth } from '../contexts';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth();

    // 🚧 개발용: localStorage에 'dev_bypass_auth'가 설정되어 있으면 로그인 우회
    const devBypassAuth = localStorage.getItem('dev_bypass_auth') === 'true';

    // 개발 모드에서 우회가 활성화되어 있으면 바로 children 반환
    if (devBypassAuth) {
        return (
            <div>
                {/* 개발 모드 알림 배너 */}
                <div className="border-l-4 border-yellow-500 bg-yellow-100 p-4 text-sm text-yellow-700">
                    <div className="flex items-center justify-between">
                        <span>🚧 개발 모드: 로그인 보호가 우회되었습니다</span>
                        <button
                            onClick={() => {
                                localStorage.removeItem('dev_bypass_auth');
                                window.location.reload();
                            }}
                            className="font-medium text-yellow-800 hover:text-yellow-900"
                        >
                            우회 해제
                        </button>
                    </div>
                </div>
                {children}
            </div>
        );
    }

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
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
