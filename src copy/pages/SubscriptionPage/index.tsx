// src/pages/SubscriptionPage/index.tsx (연결 및 개선 완료)
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../shared/ui/Header';
import { createSubscription } from '../../api/subscriptionApi'; // ◀️ API 함수 import

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();

  // ◀️ API에 보낼 구체적인 값 ('SECOND_SUNDAY' 등)을 상태로 관리
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

  // '정기 구독 시작하기' 버튼 클릭 핸들러
  const handleSubscription = async () => {
    if (!groupId) {
      alert("잘못된 접근입니다. 그룹 ID가 없습니다.");
      return;
    }
    if (!selectedDate) {
      alert('수령일을 선택해주세요.');
      return;
    }

    setIsSubscribing(true);
    try {
      // ◀️ API 호출
      const subscription = await createSubscription(groupId, { deliveryDay: selectedDate });
      // const subscription = await undefined;
      
      alert(`구독 신청이 완료되었습니다. 다음 결제일은 ${subscription.nextPaymentDate} 입니다.`);
      
      // ◀️ 성공 시, 해당 구독에 대한 결제 페이지로 이동
      navigate(`/payment/${subscription.subscriptionId}`);

    } catch (error) {
      console.error("구독 생성 실패:", error);
      alert("구독 처리 중 오류가 발생했습니다.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="bg-[#F1F1F1] flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[#FFF] w-[500px] h-auto p-[50px] border border-[#C2C2C2] text-center">
          <h1 className="text-[32px] text-[#000] mt-[-10px] mb-[20px] font-bold">소식 책자 정기 구독</h1>
          <p className="text-[#6A6A6A] text-[18px] mb-4">월 6,900원으로 가족의 이야기를 책으로 받아보세요.</p>
          <p className="text-lg font-semibold mb-8">수령일 선택</p>
          
          <div className="flex justify-center space-x-4 mb-[74px]">
            {/* ◀️ onClick 핸들러에서 API에 보낼 값을 직접 설정 */}
            <button
              className={`w-[180px] h-[48px] rounded-[5px] text-lg font-semibold transition-colors ${
                selectedDate === 'SECOND_SUNDAY'
                  ? 'bg-[#018941] text-white'
                  : 'bg-[#F1F1F1] text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedDate('SECOND_SUNDAY')}
              disabled={isSubscribing}
            >
              매월 둘째 주
            </button>
            <button
              className={`w-[180px] h-[48px] rounded-[5px] text-lg font-semibold transition-colors ${
                selectedDate === 'FOURTH_SUNDAY'
                  ? 'bg-[#018941] text-white'
                  : 'bg-[#F1F1F1] text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedDate('FOURTH_SUNDAY')}
              disabled={isSubscribing}
            >
              매월 넷째 주
            </button>
          </div>
          
          <button
            className="bg-green-600 text-white w-[350px] h-[48px] rounded-[5px] hover:bg-green-700 transition-colors disabled:bg-gray-400"
            onClick={handleSubscription}
            disabled={isSubscribing}
          >
            <span className="text-[20px] font-semibold">
              {isSubscribing ? '처리 중...' : '정기 구독 시작하기'}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionPage;