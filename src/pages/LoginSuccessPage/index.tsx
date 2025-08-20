// src/pages/LoginSuccessPage.js
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // KakaoCallback 페이지에서 state로 넘겨준 사용자 정보를 받습니다.
  const userName = location.state?.user?.nickname || '사용자';

  useEffect(() => {
    // 2초 후에 메인 페이지로 이동하는 타이머 설정
    const timer = setTimeout(() => {
      navigate('/'); // 메인 페이지 경로로 이동
    }, 2000); // 2000ms = 2초

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        {/* 체크 아이콘 SVG */}
        <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="mt-4 text-3xl font-bold text-gray-800">
          로그인 성공!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          환영합니다, <strong className="text-green-600">{userName}</strong>님!
        </p>
        <p className="mt-4 text-sm text-gray-500">
          잠시 후 메인 페이지로 자동 이동합니다...
        </p>
      </div>
    </div>
  );
};

export default LoginSuccessPage;