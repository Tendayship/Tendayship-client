import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts';
import axiosInstance from '../../../shared/api/axiosInstance';
import { ensureSafePath, getStoredReturnUrl, storeReturnUrl } from '../../../shared/utils/pathUtils';

const KakaoCallbackPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>(
        'processing'
    );
    const [message, setMessage] = useState('로그인 처리 중...');

    // Check if this window is opened as a popup
    const isPopup = window.opener && window.opener !== window;

    useEffect(() => {
        const handleKakaoCallback = async () => {
            try {
                setStatus('processing');
                setMessage('로그인 정보를 확인하고 있습니다...');

                // URL에서 state와 실패 상태 확인
                const params = new URLSearchParams(location.search);
                const reason = params.get('reason');
                const stateParam = params.get('state');

                // 실패 콜백 경로인지 확인
                if (location.pathname === '/auth/callback/fail') {
                    console.error('카카오 로그인 실패:', reason);
                    
                    // 실패 시에도 returnUrl을 유지하여 재로그인시 같은 경로로 복귀
                    if (stateParam) {
                        const decodedReturnUrl = decodeURIComponent(stateParam);
                        storeReturnUrl(decodedReturnUrl);
                    }
                    
                    throw new Error(reason || '로그인에 실패했습니다.');
                }

                // Store state parameter as returnUrl if present
                if (stateParam) {
                    const decodedReturnUrl = decodeURIComponent(stateParam);
                    console.log('State parameter found:', decodedReturnUrl);
                    storeReturnUrl(decodedReturnUrl);
                }

                console.log('=== 카카오 콜백 디버깅 ===');
                console.log('Current pathname:', location.pathname);
                console.log('Search params:', location.search);
                console.log('Reason parameter:', reason);

                // 쿠키 전파 타이밍 완화를 위한 지연
                await new Promise((resolve) => setTimeout(resolve, 200));

                setMessage('인증 정보를 확인하는 중...');

                // 쿠키 기반 인증 상태 확인 - axiosInstance 사용
                console.log('Calling /auth/verify...');
                const res = await axiosInstance.get('/auth/verify');
                console.log('/auth/verify response:', res.status, res.data);
                if (res.status !== 200 || !res.data.valid) {
                    throw new Error('인증 확인에 실패했습니다.');
                }

                setMessage('사용자 정보를 가져오는 중...');

                // 사용자 정보 가져오기 - axiosInstance 사용
                console.log('Calling /auth/me...');
                const userRes = await axiosInstance.get('/auth/me');
                console.log('/auth/me response:', userRes.status, userRes.data);

                // 팝업 모드인 경우 부모 창에 성공 메시지 전송
                if (isPopup && window.opener) {
                    console.log('Sending success message to parent window');

                    try {
                        window.opener.postMessage(
                            {
                                type: 'KAKAO_LOGIN_SUCCESS',
                                user: userRes.data,
                            },
                            window.location.origin
                        );

                        setStatus('success');
                        setMessage(
                            '로그인이 완료되었습니다. 창이 자동으로 닫힙니다...'
                        );

                        // 메시지 전송 후 짧은 지연 후 창 닫기
                        setTimeout(() => {
                            try {
                                window.close();
                            } catch {
                                console.log(
                                    'Could not close popup automatically'
                                );
                                setMessage(
                                    '로그인이 완료되었습니다. 이 창을 닫아주세요.'
                                );
                            }
                        }, 1500);
                    } catch {
                        console.error('Failed to send message to parent:');
                        // 메시지 전송 실패 시에도 창 닫기 시도
                        setMessage(
                            '로그인이 완료되었습니다. 이 창을 닫아주세요.'
                        );
                        setTimeout(() => {
                            try {
                                window.close();
                            } catch {
                                console.log(
                                    'Could not close popup automatically'
                                );
                            }
                        }, 2000);
                    }

                    return; // 팝업 모드에서는 여기서 종료
                }

                // 일반 모드인 경우 (팝업이 아닌 경우)
                setMessage('로그인 상태를 동기화하는 중...');
                await login();

                // 신규 사용자 판단 로직
                const userIsNew = !userRes.data.name || !userRes.data.phone;
                
                // Get returnUrl from state or stored session
                const storedReturnUrl = getStoredReturnUrl();
                const targetUrl = ensureSafePath(storedReturnUrl);

                setStatus('success');
                setMessage('로그인이 완료되었습니다. 페이지를 이동합니다...');

                console.log('Navigation decision:', { userIsNew, targetUrl });

                // 페이지 이동 - 신규 사용자는 프로필 완성 우선
                setTimeout(() => {
                    if (userIsNew) {
                        navigate('/profile', { replace: true });
                    } else {
                        navigate(targetUrl, { replace: true });
                    }
                }, 500);
            } catch (err) {
                console.error('로그인 처리 실패:', err);
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : '로그인 처리 중 오류가 발생했습니다.';

                setStatus('error');
                setMessage(errorMessage);

                // 팝업 모드인 경우 부모 창에 에러 메시지 전송
                if (isPopup && window.opener) {
                    console.log('Sending error message to parent window');

                    try {
                        window.opener.postMessage(
                            {
                                type: 'KAKAO_LOGIN_ERROR',
                                error: errorMessage,
                            },
                            window.location.origin
                        );
                    } catch {
                        console.error(
                            'Failed to send error message to parent:'
                        );
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

                // 일반 모드인 경우 로그인 페이지로 리다이렉트 (returnUrl 유지)
                setTimeout(() => {
                    const storedReturnUrl = getStoredReturnUrl();
                    const returnUrlParam = storedReturnUrl !== '/' ? `?returnUrl=${encodeURIComponent(storedReturnUrl)}` : '';
                    navigate(`/login${returnUrlParam}`, { replace: true });
                }, 2000);
            }
        };

        handleKakaoCallback();
    }, [location, navigate, login, isPopup]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
                {status === 'processing' && (
                    <>
                        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-yellow-500"></div>
                        <p className="mt-4 font-medium text-gray-700">
                            {message}
                        </p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>
                        <p className="mt-4 font-medium text-green-700">
                            {message}
                        </p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <svg
                                className="h-6 w-6 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </div>
                        <p className="mt-4 font-medium text-red-700">
                            {message}
                        </p>
                    </>
                )}

                {isPopup && (
                    <p className="mt-2 text-sm text-gray-500">
                        {status === 'processing'
                            ? '잠시만 기다려주세요...'
                            : '창이 곧 닫힙니다.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default KakaoCallbackPage;
