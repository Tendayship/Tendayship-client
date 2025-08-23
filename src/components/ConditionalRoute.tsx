import { useAuth } from '../contexts';
import MainPage from '../pages/main/main-page';
import LandingPage from '../pages/LandingPage';

const ConditionalRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // 로딩 중일 때는 로딩 화면 표시
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                로딩 중...
            </div>
        );
    }

    // 로딩이 끝난 후에만 페이지 결정
    return isAuthenticated ? <MainPage /> : <LandingPage />;
};

export default ConditionalRoute;
