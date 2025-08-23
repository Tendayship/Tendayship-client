// src/pages/SubscriptionPage/index.tsx (연결 및 개선 완료)
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSubscription } from '../../api/subscriptionApi';

// 수령일 옵션을 const 객체로 정의하여 타입 안정성 및 가독성 향상
const DeliveryDate = {
    SecondSunday: 'SECOND_SUNDAY',
    FourthSunday: 'FOURTH_SUNDAY',
} as const;

type DeliveryDateType = typeof DeliveryDate[keyof typeof DeliveryDate];

const SubscriptionPage = () => {
    const navigate = useNavigate();
    const { groupId } = useParams<{ groupId: string }>();
    const [selectedDate, setSelectedDate] = useState<DeliveryDateType | null>(null);
    const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

    // '정기 구독 시작하기' 버튼 클릭 핸들러
    const handleSubscription = async () => {
        if (!groupId) {
            alert('잘못된 접근입니다. 그룹 ID가 없습니다.');
            return;
        }
        if (!selectedDate) {
            alert('수령일을 선택해주세요.');
            return;
        }

        setIsSubscribing(true);
        try {
            const subscription = await createSubscription(groupId, {
                deliveryDate: selectedDate,
            });
            
            if (subscription && subscription.subscriptionId && subscription.nextPaymentDate) {
                alert(
                    `구독 신청이 완료되었습니다. 다음 결제일은 ${subscription.nextPaymentDate} 입니다.`
                );
                navigate(`/payment/${subscription.subscriptionId}`);
            } else {
                console.error('구독 생성 후 유효하지 않은 응답:', subscription);
                alert('구독 처리 중 예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('구독 생성 실패:', error);
            alert('구독 처리 중 오류가 발생했습니다.');
        } finally {
            setIsSubscribing(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F1F1F1] p-4">
            <div className="h-auto w-[500px] border border-[#C2C2C2] bg-[#FFF] p-[50px] text-center">
                <h1 className="mt-[-10px] mb-[20px] text-[32px] font-bold text-[#000]">
                    소식 책자 정기 구독
                </h1>
                <p className="mb-4 text-[18px] text-[#6A6A6A]">
                    월 6,900원으로 가족의 이야기를 책으로 받아보세요.
                </p>
                <p className="mb-8 text-lg font-semibold">수령일 선택</p>

                <div className="mb-[74px] flex justify-center space-x-4">
                    {/* 둘째 주 버튼: HTML 디자인 적용 */}
                    <button
                        className={`h-[48px] w-[180px] rounded-[5px] text-lg font-semibold transition-colors
                            ${selectedDate === DeliveryDate.SecondSunday
                                ? 'bg-[#018941] text-white'
                                : 'bg-[#FFFFFF] text-[#018941] border border-[#018941] hover:bg-[#018941] hover:text-[#FFFFFF]'
                            }`}
                        onClick={() => setSelectedDate(DeliveryDate.SecondSunday)}
                        disabled={isSubscribing}
                    >
                        매월 둘째 주
                    </button>
                    {/* 넷째 주 버튼: HTML 디자인 적용 */}
                    <button
                        className={`h-[48px] w-[180px] rounded-[5px] text-lg font-semibold transition-colors
                            ${selectedDate === DeliveryDate.FourthSunday
                                ? 'bg-[#018941] text-white'
                                : 'bg-[#FFFFFF] text-[#018941] border border-[#018941] hover:bg-[#018941] hover:text-[#FFFFFF]'
                            }`}
                        onClick={() => setSelectedDate(DeliveryDate.FourthSunday)}
                        disabled={isSubscribing}
                    >
                        매월 넷째 주
                    </button>
                </div>

                {/* 정기 구독 시작하기 버튼 */}
                <button
                    className="h-[48px] w-[350px] rounded-[5px] bg-green-600 text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
                    onClick={handleSubscription}
                    disabled={isSubscribing}
                >
                    <span className="text-[20px] font-semibold">
                        {isSubscribing ? '처리 중...' : '정기 구독 시작하기'}
                    </span>
                </button>
            </div>
        </main>
    );
};

export default SubscriptionPage;