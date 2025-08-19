import React, { useState } from 'react';
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
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="bg-[#FEE500] text-[#371D1E] py-3 px-7 rounded-lg w-full flex items-center justify-center h-[64px] hover:bg-yellow-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? '로그인 중...' : '카카오로 로그인 하기'}
    </button>
  );
};

export default KakaoLoginButton;
