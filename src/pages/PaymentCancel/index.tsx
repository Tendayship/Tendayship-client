import { useNavigate } from "react-router-dom";

const PaymentCancelPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">결제가 취소되었습니다</h1>
                    <p className="text-gray-600">결제를 다시 시도하거나 나중에 구독을 진행하실 수 있습니다.</p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/subscription/payment')}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        다시 결제하기
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        홈으로 돌아가기
                    </button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">구독 혜택</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 월 1회 가족 소식 책자 발송</li>
                        <li>• 무제한 사진 업로드</li>
                        <li>• 가족 멤버 초대 기능</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelPage;