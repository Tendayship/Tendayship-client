import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts';

const KakaoCallbackPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const handleKakaoCallback = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            const user_id = params.get('user_id');

            console.log('카카오 콜백 파라미터:', { token, user_id });

            if (!token) {
                console.error('토큰이 없습니다.');
                navigate('/login');
                return;
            }

            try {
                // AuthContext의 login 메서드 사용
                login(token);

                // user_id가 "None"이면 신규 사용자로 판단하여 프로필 페이지로
                if (user_id === 'None' || user_id === null) {
                    navigate('/profile');
                } else {
                    // 기존 사용자는 메인 페이지로
                    navigate('/');
                }
            } catch (err) {
                console.error('로그인 처리 실패:', err);
                navigate('/login');
            }
        };

        handleKakaoCallback();
    }, [location, navigate, login]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
                <p className="text-gray-600">로그인 처리 중...</p>
            </div>
        </div>
    );
};

export default KakaoCallbackPage;
