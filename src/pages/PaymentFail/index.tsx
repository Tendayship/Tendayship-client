import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentFailPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const error = searchParams.get('error');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">결제에 실패했습니다</h1>
                    <p className="text-gray-600">결제 처리 중 문제가 발생했습니다.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-sm text-red-600">
                            <strong>오류 내용:</strong> {decodeURIComponent(error)}
                        </p>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/subscription/payment')}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        다시 시도하기
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        홈으로 돌아가기
                    </button>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">문제가 지속될 경우</h3>
                    <p className="text-sm text-gray-600">
                        고객센터로 문의해 주세요.<br />
                        이메일: support@tendayapp.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailPage;