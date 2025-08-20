import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts';
import axiosInstance from '../../../shared/api/axiosInstance';

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      // URL에서 실패 상태 확인
      const params = new URLSearchParams(location.search);
      const reason = params.get('reason');

      // 실패 콜백 경로인지 확인
      if (location.pathname === '/auth/callback/fail') {
        console.error('카카오 로그인 실패:', reason);
        navigate('/login');
        return;
      }

      try {
        // 쿠키 전파 타이밍 완화를 위한 지연
        await new Promise((resolve) => setTimeout(resolve, 200));

        // 쿠키 기반 인증 상태 확인 - axiosInstance 사용
        const res = await axiosInstance.get('/auth/verify');
        if (res.status !== 200) {
          throw new Error('verify_failed');
        }

        // 사용자 정보 가져오기 - axiosInstance 사용
        const userRes = await axiosInstance.get('/auth/me');

        // 현재 창에서 직접 로그인 처리
        await login();

        // 신규 사용자 판단 로직
        const isNewUser = !userRes.data.name || !userRes.data.phone;
        if (isNewUser) {
          navigate('/profile');
        } else {
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
};

export default KakaoCallbackPage;
