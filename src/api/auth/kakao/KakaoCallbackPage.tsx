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

            // 팝업 모드인지 확인 (window.opener가 존재하면 팝업)
            const isPopup = window.opener && !window.opener.closed;

            if (!token) {
                console.error('토큰이 없습니다.');

                if (isPopup) {
                    // 팝업 모드에서는 부모창으로 에러 메시지 전송
                    window.opener.postMessage(
                        {
                            type: 'KAKAO_LOGIN_ERROR',
                            error: '토큰을 받아오지 못했습니다.',
                        },
                        window.location.origin
                    );
                    window.close();
                } else {
                    navigate('/login');
                }
                return;
            }

            try {
                if (isPopup) {
                    // 팝업 모드에서는 부모창으로 성공 메시지 전송
                    window.opener.postMessage(
                        {
                            type: 'KAKAO_LOGIN_SUCCESS',
                            token,
                            user_id,
                        },
                        window.location.origin
                    );
                    window.close();
                } else {
                    // 기존 방식: 현재 창에서 직접 로그인 처리
                    login(token);

                    // user_id가 "None"이면 신규 사용자로 판단하여 프로필 페이지로
                    if (user_id === 'None' || user_id === null) {
                        navigate('/profile');
                    } else {
                        // 기존 사용자는 메인 페이지로
                        navigate('/');
                    }
                }
            } catch (err) {
                console.error('로그인 처리 실패:', err);

                if (isPopup) {
                    window.opener.postMessage(
                        {
                            type: 'KAKAO_LOGIN_ERROR',
                            error: '로그인 처리에 실패했습니다.',
                        },
                        window.location.origin
                    );
                    window.close();
                } else {
                    navigate('/login');
                }
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
