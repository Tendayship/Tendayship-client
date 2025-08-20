// src/pages/KakaoCallback.js (수정된 버전)
import { useEffect } from 'react';
// axios와 함께 AxiosError를 임포트합니다.
import axios, { AxiosError } from 'axios'; 
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const processKakaoLogin = async () => {
            const code = new URL(window.location.href).searchParams.get('code');
            const purpose = localStorage.getItem('authPurpose');

            if (!code || !purpose) {
                // alert() 대신 커스텀 UI를 사용하는 것을 권장합니다.
                console.error('인증 정보가 올바르지 않습니다.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.post('http://localhost:8080/api/auth/kakao/callback', {
                    code,
                    purpose,
                }, {
                    withCredentials: true // 이전에 논의된 쿠키 전송 옵션
                });

                navigate('/login/success', { state: { user: response.data.user } });
                
            } catch (error) {
                // --- ▼▼▼ [핵심] 오류 타입 확인 로직 추가 ▼▼▼ ---
                let errorMessage = '로그인에 실패했습니다.';

                if (axios.isAxiosError(error)) {
                    // error가 AxiosError 타입임이 확인되었습니다.
                    // 이제 안전하게 error.response에 접근할 수 있습니다.
                    errorMessage = error.response?.data?.message || '서버와 통신 중 오류가 발생했습니다.';
                } else {
                    // Axios 에러가 아닌 다른 종류의 에러 처리 (네트워크 문제 등)
                    console.error('An unexpected error occurred:', error);
                }

                // alert() 대신 사용자에게 오류를 보여줄 UI를 구현하는 것이 좋습니다.
                console.error(errorMessage);
                navigate('/login');
            } finally {
                localStorage.removeItem('authPurpose');
            }
        };

        processKakaoLogin();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">카카오 로그인 처리 중...</h1>
                <p>잠시만 기다려주세요.</p>

            </div>
        </div>
    );
};

export default KakaoCallback;
