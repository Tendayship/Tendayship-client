import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoLoginButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            // 1️⃣ 백엔드에서 카카오 로그인 URL 요청
            const response = await axios.get('/api/auth/kakao/url');
            const loginUrl = response.data.login_url;

            // 2️⃣ 로그인 URL로 리다이렉트
            window.location.href = loginUrl;
        } catch (error) {
            console.error('카카오 로그인 URL 조회 실패', error);
            alert('카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
            setIsLoading(false);
            navigate('/');
        }
    };

    return (
        <button
            onClick={handleLogin}
            disabled={isLoading}
            className="flex h-[64px] w-full items-center justify-center rounded-lg bg-[#FEE500] px-7 py-3 text-[#371D1E] transition-colors hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
            {isLoading ? '로그인 중...' : '카카오로 로그인 하기'}
        </button>
    );
};

export default KakaoLoginButton;
