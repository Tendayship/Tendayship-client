import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { preparePayment } from '../../api/familyApi';
// import PaymentHeader from '../../shared/ui/PaymentHeader.js';

// Subscription and payment info (for future use)
// const subscriptionInfo = {
//     product: '패밀리 뉴스 서비스 정기 구독',
//     period: '매월 자동 결제',
//     nextPayment: '구독 시작일로부터 1개월 뒤',
// };

// const paymentInfo = {
//     productPrice: '상품 가격',
//     totalAmount: '6,900원',
// };


const PaymentPage = () => {

    const { groupId } = useParams<{ groupId: string }>(); 
    const [isProcessing, setIsProcessing] = useState(false);

    const [selectedPaymentMethod] = useState<
        'general' | 'kakao'
    >('kakao');
    const [agreements] = useState({
        all: false,
        required: false,
        optional: false,
    });

    // const handleAgreementChange = (type: 'all' | 'required' | 'optional') => {
    //     if (type === 'all') {
    //         const newValue = !agreements.all;
    //         setAgreements({
    //             all: newValue,
    //             required: newValue,
    //             optional: newValue,
    //         });
    //     } else {
    //         const newAgreements = { ...agreements, [type]: !agreements[type] };
    //         newAgreements.all =
    //             newAgreements.required && newAgreements.optional;
    //         setAgreements(newAgreements);
    //     }
    // };


    // const handlePaymentMethodChange = (method: 'general' | 'kakao') => {
    //     setSelectedPaymentMethod(method);
    // };


    const handlePayment = async () => {
        if (selectedPaymentMethod !== 'kakao') {
            alert('현재 카카오페이 결제만 지원합니다.');
            return;
        }
        if (!agreements.required) {
            alert('필수 약관에 동의해주세요.');
            return;
        }
        if (!groupId) {
            alert('결제에 필요한 그룹 정보가 없습니다.');
            return;
        }

        setIsProcessing(true); // 결제 시작, 버튼 비활성화

        try {
            // 1. 서버에 결제 준비 요청 (API 호출)
            const response = await preparePayment();

            // 2. 성공 시, 카카오페이 결제 페이지로 리다이렉트
            if (response.next_redirect_pc_url) {
                window.location.href = response.next_redirect_pc_url;
            } else {
                alert('카카오페이 페이지로 이동하는데 실패했습니다.');
            }
        } catch (error) {
            console.error('결제 준비 실패:', error);
            alert('결제 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsProcessing(false); // API 호출 완료 후, 버튼 다시 활성화
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#f1f1f1]">
            {/* <PaymentHeader /> */}
            <div className="flex flex-grow items-center justify-center bg-[#018941] pt-[60px]">

                <main className="top-[115px] h-auto w-[500px] overflow-y-auto rounded-lg bg-white p-12">

                    <button
                        onClick={handlePayment}
                        disabled={isProcessing} 
                        className="font-pretendard-semibold h-12 w-full rounded-[10px] bg-[#018941] text-[22px] text-white transition-colors hover:bg-[#017a39] disabled:bg-gray-400"
                    >
                        {isProcessing ? '처리 중...' : '결제하기'}
                    </button>
                </main>
            </div>
        </div>
    );
};

export default PaymentPage;