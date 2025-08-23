import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { prepareSubscriptionPayment, approvePayment } from '../../api/subscriptionApi';

export default function PaymentPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [paymentInfo] = useState({
        amount: 6900,
        itemName: '텐데이 가족 소식 정기구독'
    });

    // 카카오페이 결제 승인 처리
    useEffect(() => {
        const pgToken = searchParams.get('pg_token');
        const partnerOrderId = searchParams.get('partner_order_id');

        if (pgToken && partnerOrderId) {
            handlePaymentApproval(pgToken, partnerOrderId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const handlePaymentApproval = async (pgToken: string, partnerOrderId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const result = await approvePayment(pgToken, partnerOrderId);
            
            alert('결제가 성공적으로 완료되었습니다!');
            navigate('/', { 
                state: { 
                    message: '구독이 시작되었습니다!',
                    paymentResult: result 
                } 
            });
        } catch (err) {
            console.error('결제 승인 실패:', err);
            setError('결제 승인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePayment = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await prepareSubscriptionPayment();
            
            // 카카오페이 결제 페이지로 리다이렉트
            window.location.href = response.next_redirect_pc_url;
        } catch (err) {
            console.error('결제 준비 실패:', err);
            setError('결제 준비 중 오류가 발생했습니다. 다시 시도해주세요.');
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('결제를 취소하시겠습니까?')) {
            navigate(-1);
        }
    };

    // 결제 승인 중인 경우
    if (searchParams.get('pg_token')) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-md">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        결제 승인 중...
                    </h2>
                    <p className="text-gray-600">
                        잠시만 기다려주세요. 결제를 승인하고 있습니다.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-md mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            구독 결제
                        </h1>
                        <p className="text-gray-600">
                            텐데이 가족 소식 서비스를 시작해보세요.
                        </p>
                    </div>

                    {/* Payment Info Card */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-white">
                            <h3 className="text-lg font-semibold">
                                정기구독 서비스
                            </h3>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">서비스</span>
                                    <span className="font-medium">{paymentInfo.itemName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">결제 주기</span>
                                    <span className="font-medium">월 1회</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">이용 혜택</span>
                                    <span className="font-medium">무제한 소식 작성</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600"></span>
                                    <span className="font-medium">월 1회 책자 발송</span>
                                </div>
                                
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">결제 금액</span>
                                        <span className="text-2xl font-bold text-green-600">
                                            {paymentInfo.amount.toLocaleString()}원
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 text-right mt-1">
                                        VAT 포함
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">결제 방법</h4>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                            <img
                                src="/kakao_pay_logo.png"
                                alt="카카오페이"
                                className="w-8 h-8"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                            <div>
                                <p className="font-medium text-gray-900">카카오페이</p>
                                <p className="text-sm text-gray-500">
                                    간편하고 안전한 결제
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handlePayment}
                            disabled={isLoading}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:text-gray-600"
                        >
                            {isLoading ? '결제 준비 중...' : '카카오페이로 결제하기'}
                        </button>
                        
                        <button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                            취소
                        </button>
                    </div>

                    {/* Terms */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>결제를 진행하시면 <span className="text-green-600">서비스 이용약관</span> 및</p>
                        <p><span className="text-green-600">개인정보처리방침</span>에 동의한 것으로 간주됩니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}