import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

    useEffect(() => {
        const subId = searchParams.get('subscription_id');
        setSubscriptionId(subId);
        
        // 5초 후 자동으로 구독 페이지로 이동
        const timer = setTimeout(() => {
            navigate('/mypage/subscription');
        }, 5000);

        return () => clearTimeout(timer);
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">결제가 완료되었습니다!</h1>
                    <p className="text-gray-600">가족 소식 서비스 구독이 시작되었습니다.</p>
                </div>

                {subscriptionId && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">구독 ID</p>
                        <p className="text-sm font-mono text-gray-800">{subscriptionId}</p>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/mypage/subscription')}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        구독 관리로 이동
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        홈으로 돌아가기
                    </button>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                    5초 후 자동으로 구독 관리 페이지로 이동합니다.
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;