import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const KakaoCallbackPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleKakaoCallback = async () => {
            const params = new URLSearchParams(location.search);
            const code = params.get('code');
            if (!code) return;

            try {
                const response = await axios.post('/api/auth/kakao', { code });
                const data = response.data;

                console.log('백엔드 응답:', data); // 여기서 data 구조 확인

                if (!data || !data.access_token) {
                    console.error('응답이 올바르지 않음', data);
                    return;
                }

                localStorage.setItem('access_token', data.access_token);

                if (data.is_new_user) {
                    navigate('/profile');
                } else {
                    navigate('/');
                }
            } catch (err) {
                console.error('카카오 로그인 실패', err);
            }
        };

        handleKakaoCallback();
    }, [location, navigate]);

    return <div>로그인 처리 중...</div>;
};

export default KakaoCallbackPage;
