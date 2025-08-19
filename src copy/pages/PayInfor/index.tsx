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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'general' | 'kakao'>('general');
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
      newAgreements.all = newAgreements.required && newAgreements.optional;
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
    console.log(`Processing payment with ${selectedPaymentMethod} method...`);
    // 성공 시 다른 페이지로 이동 등
  };

  return (
    <div className="bg-[#f1f1f1] flex flex-col min-h-screen">
      <PaymentHeader />
      <div className="flex-grow flex items-center justify-center pt-[60px] bg-[#018941]">
        <h1 className="absolute top-[69px] left-[710px] font-pretendard-semibold text-white text-[28px] tracking-[-0.7px]">
          가족의 사랑을 한 권의 책으로
        </h1>

        <main className="w-[500px] h-auto top-[115px] bg-white rounded-lg p-12 overflow-y-auto">
          <h2 className="text-center font-pretendard-medium text-black text-[28px] tracking-[-0.7px] mb-8">
            결제 정보 입력
          </h2>

          {/* 구독 정보 섹션 */}
          <section className="mb-8">
            <h3 className="font-pretendard-medium text-[#040404] text-lg tracking-[-0.45px] mb-2">
              구독 정보
            </h3>
            <div className="border border-solid border-[#c1c1c1] rounded-[5px] p-4">
              <div className="text-sm text-[#6a6a6a]">
                <p>{subscriptionInfo.product}</p>
                <p>{subscriptionInfo.period}</p>
                <p>{subscriptionInfo.nextPayment}</p>
              </div>
            </div>
          </section>

          {/* 결제 금액 섹션 */}
          <section className="mb-8">
            <h3 className="font-pretendard-medium text-[#040404] text-lg tracking-[-0.45px] mb-2">
              결제 금액
            </h3>
            <div className="border border-solid border-black rounded-[5px] p-4">
              <div className="flex justify-between items-center text-base text-[#6a6a6a]">
                <span>{paymentInfo.productPrice}</span>
              </div>
              <hr className="my-2 border-[#d9d9d9]" />
              <div className="flex justify-between items-center font-pretendard-medium text-xl">
                <span className="text-[#6a6a6a]">총 결제 금액</span>
                <span className="text-black font-pretendard-semibold">{paymentInfo.totalAmount}</span>
              </div>
            </div>
          </section>

          {/* 결제 수단 섹션 */}
          <section className="mb-8">
            <h3 className="font-pretendard-medium text-[#040404] text-lg tracking-[-0.45px] mb-2">
              결제 수단
            </h3>
            <div className="flex gap-5">
              <button
                onClick={() => handlePaymentMethodChange('general')}
                className={`flex-1 h-[34px] rounded-[5px] transition-colors ${
                  selectedPaymentMethod === 'general' ? 'bg-[#018941] text-white' : 'bg-[#d9d9d9] text-black'
                }`}
              >
                <span className="font-pretendard-medium text-sm">일반 결제</span>
              </button>
              <button
                onClick={() => handlePaymentMethodChange('kakao')}
                className={`flex-1 h-[34px] rounded-[5px] transition-colors ${
                  selectedPaymentMethod === 'kakao' ? 'bg-[#fee500] text-[#371d1e]' : 'bg-[#d9d9d9] text-black'
                }`}
              >
                <span className="font-pretendard-medium text-sm">카카오페이</span>
              </button>
            </div>
          </section>

          {/* 약관 동의 섹션 */}
          <section className="mb-8">
            <h3 className="font-pretendard-medium text-[#040404] text-lg tracking-[-0.45px] mb-2">
              약관 동의
            </h3>
            <div className="border border-solid border-[#a8a8a8] rounded-lg p-4">
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={agreements.all}
                  onChange={() => handleAgreementChange('all')}
                  className="w-4 h-4 rounded border-[#a8a8a8]"
                />
                <span className="font-pretendard-medium text-base text-black">전체 동의</span>
              </label>
              <div className="flex flex-col pl-6">
                <label className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={agreements.required}
                    onChange={() => handleAgreementChange('required')}
                    className="w-4 h-4 rounded-lg border-[#a8a8a8]"
                  />
                  <span className="text-sm font-pretendard-regular text-[#6a6a6a]">[필수] ~~~</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={agreements.optional}
                    onChange={() => handleAgreementChange('optional')}
                    className="w-4 h-4 rounded-lg border-[#a8a8a8]"
                  />
                  <span className="text-sm font-pretendard-regular text-[#6a6a6a]">[선택] ~~~</span>
                </label>
              </div>
            </div>
          </section>

          {/* 결제 버튼 */}
          <button
            onClick={handlePayment}
            className="w-full h-12 bg-[#018941] rounded-[10px] font-pretendard-semibold text-white text-[22px] hover:bg-[#017a39] transition-colors"
          >
            결제하기
          </button>
        </main>
      </div>
    </div>
  );
};

export default PaymentPage;