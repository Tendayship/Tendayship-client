import { useAuth } from '../contexts/AuthContext';
import LandingPage from '../pages/LandingPage';
import MainPage from '../pages/main/main-page';

const ConditionalRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

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

    // 로그인되어 있으면 메인 페이지, 아니면 랜딩 페이지
    return isAuthenticated ? <MainPage /> : <LandingPage />;
};

export default ConditionalRoute;
