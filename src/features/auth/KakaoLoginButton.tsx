// KakaoLoginButton.tsx
import { useCallback, useState } from 'react';
import axios from 'axios';
import kakaoLogo from '../../assets/kakao_talk.png';

type KakaoUrlResponse = { login_url?: string; loginUrl?: string };

const BUTTON_BASE =
  'flex h-16 w-[400px] items-center justify-center rounded-[10px] bg-[#FEE500] text-[#371D1E] text-[22px] font-Pretendard focus:outline-none transition-colors hover:bg-[#FDE133] disabled:opacity-70 disabled:cursor-not-allowed';

export default function KakaoLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    if (isLoading) return; // 더블클릭 방지
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get<KakaoUrlResponse>('/api/auth/kakao/url', {
        withCredentials: true,
      });

      const loginUrl = data?.login_url ?? data?.loginUrl;
      if (!loginUrl) throw new Error('로그인 URL을 받아오지 못했습니다.');

      if (typeof window !== 'undefined') {
        window.location.href = loginUrl;
      }
    } catch (err: any) {
      console.error('카카오 로그인 URL 조회 실패', err);
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.';
      setError(msg);
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleLogin}
        disabled={isLoading}
        className={BUTTON_BASE}
        aria-busy={isLoading}
        aria-live="polite"
      >
        {isLoading ? (
          '로그인 중...'
        ) : (
          <>
            <img
              src={kakaoLogo}
              alt="카카오톡 로고"
              className="mr-4 h-7 w-7"
              loading="lazy"
              decoding="async"
            />
            카카오로 로그인 하기
          </>
        )}
      </button>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
