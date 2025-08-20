// KakaoLoginButton.tsx
import { useCallback, useState } from 'react';
import axiosInstance from '../../shared/api/axiosInstance';
import { useAuth } from '../../contexts';
import kakaoLogo from '../../assets/kakao_talk.png';

type KakaoUrlResponse = { login_url?: string; loginUrl?: string };

const BUTTON_BASE =
  'flex h-16 w-[400px] items-center justify-center rounded-[10px] bg-[#FEE500] text-[#371D1E] text-[22px] font-Pretendard focus:outline-none transition-colors hover:bg-[#FDE133] disabled:opacity-70 disabled:cursor-not-allowed';

export default function KakaoLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      // axiosInstance 사용 - withCredentials 자동 적용
      const { data } = await axiosInstance.get<KakaoUrlResponse>('/auth/kakao/url');
      
      const loginUrl = data?.login_url ?? data?.loginUrl;
      if (!loginUrl) throw new Error('로그인 URL을 받아오지 못했습니다.');

      if (typeof window !== 'undefined') {
        // 팝업창 열기
        const popup = window.open(
          loginUrl,
          'kakaoLogin',
          'width=500,height=600,scrollbars=yes,resizable=yes'
        );

        if (!popup) {
          throw new Error(
            '팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.'
          );
        }

        // 메시지 리스너를 async 함수로 선언
        const handleMessage = async (event: MessageEvent) => {
          // 보안을 위해 origin 체크
          if (event.origin !== window.location.origin) {
            return;
          }

          if (event.data.type === 'KAKAO_LOGIN_SUCCESS') {
            try {
              // 타이밍 이슈 완화를 위한 짧은 지연 추가
              setTimeout(async () => {
                // 쿠키 기반 인증이므로 서버 상태 동기화
                await login();
                
                // 사용자 정보 확인하여 라우팅 - axiosInstance 사용
                const userRes = await axiosInstance.get('/auth/me');
                
                // 신규 사용자 판단 로직
                const isNewUser = !userRes.data.name || !userRes.data.phone;
                if (isNewUser) {
                  window.location.href = '/profile';
                } else {
                  window.location.href = '/';
                }
              }, 150); // 150ms 지연으로 쿠키 전파 타이밍 이슈 완화
            } catch (err) {
              console.error('로그인 후 처리 실패:', err);
              setError('로그인 처리에 실패했습니다.');
            }

            popup.close();
            setIsLoading(false);
            window.removeEventListener('message', handleMessage);
          } else if (event.data.type === 'KAKAO_LOGIN_ERROR') {
            setError(event.data.error || '로그인에 실패했습니다.');
            popup.close();
            setIsLoading(false);
            window.removeEventListener('message', handleMessage);
          }
        };

        window.addEventListener('message', handleMessage);

        // 팝업이 닫혔을 때 정리
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            setIsLoading(false);
            window.removeEventListener('message', handleMessage);
          }
        }, 1000);
      }
    } catch (err: unknown) {
      console.error('카카오 로그인 URL 조회 실패', err);
      let msg = '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.';
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        msg = axiosError.response?.data?.message ?? msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      setIsLoading(false);
    }
  }, [isLoading, login]);

  return (
    <div>
      <button 
        className={BUTTON_BASE}
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          '로그인 중...'
        ) : (
          <>
            <img src={kakaoLogo} alt="카카오" className="w-5 h-5 mr-2" />
            카카오로 로그인 하기
          </>
        )}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
