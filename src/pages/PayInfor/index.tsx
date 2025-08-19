import React, { useState } from 'react';
import PaymentHeader from '../../shared/ui/PaymentHeader.js';

const subscriptionInfo = {
    product: '구독상품',
    period: '구독기간',
    nextPayment: '다음 결제일',
};

const paymentInfo = {
    productPrice: '상품 가격',
    totalAmount: '6,900원',
};

const PaymentPage = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
        'general' | 'kakao'
    >('general');
    const [agreements, setAgreements] = useState({
        all: false,
        required: false,
        optional: false,
    });

    const handleAgreementChange = (type: 'all' | 'required' | 'optional') => {
        if (type === 'all') {
            const newValue = !agreements.all;
            setAgreements({
                all: newValue,
                required: newValue,
                optional: newValue,
            });
        } else {
            const newAgreements = { ...agreements, [type]: !agreements[type] };
            newAgreements.all =
                newAgreements.required && newAgreements.optional;
            setAgreements(newAgreements);
        }
    };

    const handlePaymentMethodChange = (method: 'general' | 'kakao') => {
        setSelectedPaymentMethod(method);
    };

    const handlePayment = () => {
        if (!agreements.required) {
            alert('필수 약관에 동의해주세요.');
            return;
        }
        // 실제 결제 로직: selectedPaymentMethod에 따라 일반 결제 또는 카카오페이 로직 호출
        console.log(
            `Processing payment with ${selectedPaymentMethod} method...`
        );
        // 성공 시 다른 페이지로 이동 등
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#f1f1f1]">
            <PaymentHeader />
            <div className="flex flex-grow items-center justify-center bg-[#018941] pt-[60px]">
                <h1 className="font-pretendard-semibold absolute top-[69px] left-[710px] text-[28px] tracking-[-0.7px] text-white">
                    가족의 사랑을 한 권의 책으로
                </h1>

                <main className="top-[115px] h-auto w-[500px] overflow-y-auto rounded-lg bg-white p-12">
                    <h2 className="font-pretendard-medium mb-8 text-center text-[28px] tracking-[-0.7px] text-black">
                        결제 정보 입력
                    </h2>

                    {/* 구독 정보 섹션 */}
                    <section className="mb-8">
                        <h3 className="font-pretendard-medium mb-2 text-lg tracking-[-0.45px] text-[#040404]">
                            구독 정보
                        </h3>
                        <div className="rounded-[5px] border border-solid border-[#c1c1c1] p-4">
                            <div className="text-sm text-[#6a6a6a]">
                                <p>{subscriptionInfo.product}</p>
                                <p>{subscriptionInfo.period}</p>
                                <p>{subscriptionInfo.nextPayment}</p>
                            </div>
                        </div>
                    </section>

                    {/* 결제 금액 섹션 */}
                    <section className="mb-8">
                        <h3 className="font-pretendard-medium mb-2 text-lg tracking-[-0.45px] text-[#040404]">
                            결제 금액
                        </h3>
                        <div className="rounded-[5px] border border-solid border-black p-4">
                            <div className="flex items-center justify-between text-base text-[#6a6a6a]">
                                <span>{paymentInfo.productPrice}</span>
                            </div>
                            <hr className="my-2 border-[#d9d9d9]" />
                            <div className="font-pretendard-medium flex items-center justify-between text-xl">
                                <span className="text-[#6a6a6a]">
                                    총 결제 금액
                                </span>
                                <span className="font-pretendard-semibold text-black">
                                    {paymentInfo.totalAmount}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* 결제 수단 섹션 */}
                    <section className="mb-8">
                        <h3 className="font-pretendard-medium mb-2 text-lg tracking-[-0.45px] text-[#040404]">
                            결제 수단
                        </h3>
                        <div className="flex gap-5">
                            <button
                                onClick={() =>
                                    handlePaymentMethodChange('general')
                                }
                                className={`h-[34px] flex-1 rounded-[5px] transition-colors ${
                                    selectedPaymentMethod === 'general'
                                        ? 'bg-[#018941] text-white'
                                        : 'bg-[#d9d9d9] text-black'
                                }`}
                            >
                                <span className="font-pretendard-medium text-sm">
                                    일반 결제
                                </span>
                            </button>
                            <button
                                onClick={() =>
                                    handlePaymentMethodChange('kakao')
                                }
                                className={`h-[34px] flex-1 rounded-[5px] transition-colors ${
                                    selectedPaymentMethod === 'kakao'
                                        ? 'bg-[#fee500] text-[#371d1e]'
                                        : 'bg-[#d9d9d9] text-black'
                                }`}
                            >
                                <span className="font-pretendard-medium text-sm">
                                    카카오페이
                                </span>
                            </button>
                        </div>
                    </section>

                    {/* 약관 동의 섹션 */}
                    <section className="mb-8">
                        <h3 className="font-pretendard-medium mb-2 text-lg tracking-[-0.45px] text-[#040404]">
                            약관 동의
                        </h3>
                        <div className="rounded-lg border border-solid border-[#a8a8a8] p-4">
                            <label className="mb-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={agreements.all}
                                    onChange={() =>
                                        handleAgreementChange('all')
                                    }
                                    className="h-4 w-4 rounded border-[#a8a8a8]"
                                />
                                <span className="font-pretendard-medium text-base text-black">
                                    전체 동의
                                </span>
                            </label>
                            <div className="flex flex-col pl-6">
                                <label className="mb-1 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={agreements.required}
                                        onChange={() =>
                                            handleAgreementChange('required')
                                        }
                                        className="h-4 w-4 rounded-lg border-[#a8a8a8]"
                                    />
                                    <span className="font-pretendard-regular text-sm text-[#6a6a6a]">
                                        [필수] ~~~
                                    </span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={agreements.optional}
                                        onChange={() =>
                                            handleAgreementChange('optional')
                                        }
                                        className="h-4 w-4 rounded-lg border-[#a8a8a8]"
                                    />
                                    <span className="font-pretendard-regular text-sm text-[#6a6a6a]">
                                        [선택] ~~~
                                    </span>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* 결제 버튼 */}
                    <button
                        onClick={handlePayment}
                        className="font-pretendard-semibold h-12 w-full rounded-[10px] bg-[#018941] text-[22px] text-white transition-colors hover:bg-[#017a39]"
                    >
                        결제하기
                    </button>
                </main>
            </div>
        </div>
    );
};

export default PaymentPage;
