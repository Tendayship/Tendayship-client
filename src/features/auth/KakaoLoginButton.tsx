<<<<<<< Updated upstream
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
=======
// src/components/KakaoLoginButton.tsx

import { useState } from 'react';
>>>>>>> Stashed changes
import axios from 'axios';
import kakaoLogo from '../../assets/kakao_talk.png';


// 버튼 스타일을 상수로 분리하여 가독성 향상
const buttonStyles = "flex h-[64px] w-[400px] items-center justify-center rounded-[10px] bg-[#FEE500] text-[#371D1E] text-[22px] font-Pretendard focus:outline-none";

const KakaoLoginButton = () => {
<<<<<<< Updated upstream
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
=======
    // --- 로그인 로직을 컴포넌트 안으로 다시 합침 ---
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 1️⃣ 백엔드에서 카카오 로그인 URL 요청
            const response = await axios.get('/api/auth/kakao/url');
            const loginUrl = response.data.login_url;

            if (!loginUrl) {
                throw new Error('로그인 URL을 받아오지 못했습니다.');
            }

            // 2️⃣ 받은 URL로 페이지 이동
            window.location.href = loginUrl;

        } catch (err) {
            console.error('카카오 로그인 처리 중 에러 발생', err);
            setError('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
            setIsLoading(false); // 에러 발생 시 로딩 상태 해제
        }
    };
    // --- 로직 끝 ---

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleLogin}
                disabled={isLoading}
                className={buttonStyles}
            >
                {isLoading ? (
                    '로그인 중...'
                ) : (
                    <>
                        <img src={kakaoLogo} alt="카카오톡 로고" className="h-[28px] w-[28px] mr-[16px]" />
                        카카오로 로그인 하기
                    </>
                )}
            </button>
            {/* 에러가 있을 경우 메시지를 UI에 표시 */}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
>>>>>>> Stashed changes
};

export default KakaoLoginButton;