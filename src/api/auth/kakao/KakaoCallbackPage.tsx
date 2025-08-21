import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts';
import axiosInstance from '../../../shared/api/axiosInstance';

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('로그인 처리 중...');

  // Check if this window is opened as a popup
  const isPopup = window.opener && window.opener !== window;

  useEffect(() => {
    const handleKakaoCallback = async () => {
      try {
        setStatus('processing');
        setMessage('로그인 정보를 확인하고 있습니다...');

        // URL에서 실패 상태 확인
        const params = new URLSearchParams(location.search);
        const reason = params.get('reason');

        // 실패 콜백 경로인지 확인
        if (location.pathname === '/auth/callback/fail') {
          console.error('카카오 로그인 실패:', reason);
          throw new Error(reason || '로그인에 실패했습니다.');
        }

        // 쿠키 전파 타이밍 완화를 위한 지연
        await new Promise((resolve) => setTimeout(resolve, 200));

        setMessage('인증 정보를 확인하는 중...');
        
        // 쿠키 기반 인증 상태 확인 - axiosInstance 사용
        const res = await axiosInstance.get('/auth/verify');
        if (res.status !== 200 || !res.data.valid) {
          throw new Error('인증 확인에 실패했습니다.');
        }

        setMessage('사용자 정보를 가져오는 중...');
        
        // 사용자 정보 가져오기 - axiosInstance 사용
        const userRes = await axiosInstance.get('/auth/me');
        
        // 팝업 모드인 경우 부모 창에 성공 메시지 전송
        if (isPopup && window.opener) {
          console.log('Sending success message to parent window');
          
          try {
            window.opener.postMessage({
              type: 'KAKAO_LOGIN_SUCCESS',
              user: userRes.data
            }, window.location.origin);
            
            setStatus('success');
            setMessage('로그인이 완료되었습니다. 창이 자동으로 닫힙니다...');
            
            // 메시지 전송 후 짧은 지연 후 창 닫기
            setTimeout(() => {
              try {
                window.close();
              } catch  {
                console.log('Could not close popup automatically');
                setMessage('로그인이 완료되었습니다. 이 창을 닫아주세요.');
              }
            }, 1500);
            
          } catch {
            console.error('Failed to send message to parent:');
            // 메시지 전송 실패 시에도 창 닫기 시도
            setMessage('로그인이 완료되었습니다. 이 창을 닫아주세요.');
            setTimeout(() => {
              try {
                window.close();
              } catch {
                console.log('Could not close popup automatically');
              }
            }, 2000);
          }
          
          return; // 팝업 모드에서는 여기서 종료
        }

        // 일반 모드인 경우 (팝업이 아닌 경우)
        setMessage('로그인 상태를 동기화하는 중...');
        await login();

        // 신규 사용자 판단 로직
        const isNewUser = !userRes.data.name || !userRes.data.phone;
        
        setStatus('success');
        setMessage('로그인이 완료되었습니다. 페이지를 이동합니다...');
        
        // 페이지 이동
        setTimeout(() => {
          if (isNewUser) {
            navigate('/profile', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        }, 500);

      } catch (err) {
        console.error('로그인 처리 실패:', err);
        const errorMessage = err instanceof Error ? err.message : '로그인 처리 중 오류가 발생했습니다.';
        
        setStatus('error');
        setMessage(errorMessage);
        
        // 팝업 모드인 경우 부모 창에 에러 메시지 전송
        if (isPopup && window.opener) {
          console.log('Sending error message to parent window');
          
          try {
            window.opener.postMessage({
              type: 'KAKAO_LOGIN_ERROR',
              error: errorMessage
            }, window.location.origin);
          } catch {
            console.error('Failed to send error message to parent:');
          }
          
          // 에러 시에도 창 닫기
          setTimeout(() => {
            try {
              window.close();
            } catch {
              console.log('Could not close popup automatically');
              setMessage(errorMessage + ' 이 창을 닫아주세요.');
            }
          }, 3000);
          
          return;
        }
        
        // 일반 모드인 경우 로그인 페이지로 리다이렉트
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    };

    handleKakaoCallback();
  }, [location, navigate, login, isPopup]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        {status === 'processing' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-700 font-medium">{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="mt-4 text-green-700 font-medium">{message}</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <p className="mt-4 text-red-700 font-medium">{message}</p>
          </>
        )}
        
        {isPopup && (
          <p className="mt-2 text-sm text-gray-500">
            {status === 'processing' ? '잠시만 기다려주세요...' : '창이 곧 닫힙니다.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default KakaoCallbackPage;
