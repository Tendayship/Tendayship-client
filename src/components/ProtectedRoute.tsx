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
    // ⚠️ 원래 로그인 체크 관련 코드
    // const { isAuthenticated, isLoading } = useAuth();

    // 로딩 처리 (주석 처리)
    // if (isLoading) {
    //     return (
    //         <div className="flex min-h-screen items-center justify-center bg-gray-50">
    //             <div className="text-center">
    //                 <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
    //                 <p className="text-gray-600">로딩 중...</p>
    //             </div>
    //         </div>
    //     );
    // }

    // 로그인 체크 (주석 처리)
    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    // ✅ 로그인 없이 바로 접근 가능
    return <>{children}</>;
};

export default ProtectedRoute;
