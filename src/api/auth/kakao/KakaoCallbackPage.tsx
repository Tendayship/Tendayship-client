import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const KakaoCallbackPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
                // 백엔드에서 이미 발급된 토큰을 저장
                localStorage.setItem('access_token', token);

                // 토큰 검증하여 사용자 정보 확인
                const verifyResponse = await axios.get('/api/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('토큰 검증 응답:', verifyResponse.data);

                // user_id가 "None"이면 신규 사용자로 판단
                if (user_id === 'None' || user_id === null) {
                    navigate('/profile');
                } else {
                    navigate('/');
                }
            } catch (err) {
                console.error('토큰 검증 실패:', err);
                localStorage.removeItem('access_token');
                navigate('/login');
            }
        };

        handleKakaoCallback();
    }, [location, navigate]);

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
