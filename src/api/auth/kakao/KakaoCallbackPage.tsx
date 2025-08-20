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
      
      // 팝업 모드인지 확인
      const isPopup = window.opener && !window.opener.closed;

      // 실패 콜백 경로인지 확인
      if (location.pathname === '/auth/callback/fail') {
        console.error('카카오 로그인 실패:', reason);
        if (isPopup) {
          window.opener.postMessage(
            {
              type: 'KAKAO_LOGIN_ERROR',
              error: reason || '카카오 로그인에 실패했습니다.',
            },
            window.location.origin
          );
          // 팝업 닫기에 짧은 지연 추가
          setTimeout(() => window.close(), 50);
        } else {
          navigate('/login');
        }
        return;
      }

      try {
        // 쿠키 기반 인증 상태 확인 - axiosInstance 사용
        const res = await axiosInstance.get('/auth/verify');
        if (res.status !== 200) {
          throw new Error('verify_failed');
        }

        // 사용자 정보 가져오기 - axiosInstance 사용
        const userRes = await axiosInstance.get('/auth/me');

        if (isPopup) {
          // 팝업 모드에서는 부모창으로 성공 메시지 전송
          window.opener.postMessage(
            {
              type: 'KAKAO_LOGIN_SUCCESS',
              user: userRes.data,
            },
            window.location.origin
          );
          // 팝업 닫기에 짧은 지연 추가
          setTimeout(() => window.close(), 50);
        } else {
          // 현재 창에서 직접 로그인 처리
          await login();
          
          // 신규 사용자 판단 로직
          const isNewUser = !userRes.data.name || !userRes.data.phone;
          if (isNewUser) {
            navigate('/profile');
          } else {
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
          setTimeout(() => window.close(), 50);
        } else {
          navigate('/login');
        }
      }
    };

    handleKakaoCallback();
  }, [location, navigate, login]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      로그인 처리 중...
    </div>
  );
};

export default KakaoCallbackPage;
