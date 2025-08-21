// KakaoLoginButton.tsx
import { useCallback, useState, type ReactNode } from 'react'; // ReactNode added
import axios from 'axios';
import { useAuth } from '../../contexts';
import kakaoLogo from '../../assets/kakao_talk.png';

type KakaoUrlResponse = { login_url?: string; loginUrl?: string };

// Props type definition
type KakaoLoginButtonProps = {
    children?: ReactNode; // ✅ children prop is now accepted
};

const BUTTON_BASE =
    'flex h-16 w-[400px] items-center justify-center rounded-[10px] bg-[#FEE500] text-[#371D1E] text-[22px] font-Pretendard focus:outline-none transition-colors hover:bg-[#FDE133] disabled:opacity-70 disabled:cursor-not-allowed';

export default function KakaoLoginButton({ children }: KakaoLoginButtonProps) { // ✅ children destructured from props
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    const handleLogin = useCallback(async () => {
        // ... (the rest of the handleLogin function is unchanged) ...
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await axios.get<KakaoUrlResponse>(
                '/api/auth/kakao/url',
                { withCredentials: true }
            );
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

                // 메시지 리스너 등록
                const handleMessage = (event: MessageEvent) => {
                    // 보안을 위해 origin 체크 (개발환경에서는 localhost 허용)
                    if (event.origin !== window.location.origin) {
                        return;
                    }

                    if (event.data.type === 'KAKAO_LOGIN_SUCCESS') {
                        const { token, user_id } = event.data;

                        // AuthContext의 login 메서드 사용
                        login(token);

                        // user_id가 "None"이면 신규 사용자로 판단하여 프로필 페이지로
                        if (user_id === 'None' || user_id === null) {
                            window.location.href = '/profile';
                        } else {
                            // 기존 사용자는 메인 페이지로
                            window.location.href = '/';
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
                const axiosError = err as { response?: { data?: { message?: string } } };
                msg = axiosError.response?.data?.message ?? msg;
            } else if (err instanceof Error) {
                msg = err.message;
            }
            setError(msg);
            setIsLoading(false);
        }
    }, [isLoading, login]);

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
                    '처리 중...'
                ) : (
                    <>
                        <img
                            src={kakaoLogo}
                            alt="카카오톡 로고"
                            className="mr-4 h-7 w-7"
                            loading="lazy"
                            decoding="async"
                        />
                        {/* ✅ Replaced hardcoded text with children, with a default value */}
                        {children || '카카오로 로그인 하기'}
                    </>
                )}
            </button>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}