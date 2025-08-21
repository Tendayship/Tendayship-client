// src/pages/SubscriptionPage/index.tsx (연결 및 개선 완료)
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSubscription } from '../../api/familyApi'; // ◀️ API 함수 import

const SubscriptionPage = () => {
    const navigate = useNavigate();
    const { groupId } = useParams<{ groupId: string }>();

    // ◀️ API에 보낼 구체적인 값 ('SECOND_SUNDAY' 등)을 상태로 관리
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
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
            // ◀️ API 호출
            const subscription = await createSubscription(groupId, {
                deliveryDate: selectedDate,
            });
            // const subscription = await undefined;
            
            // ◀️ API 응답이 유효한지 확인하여 안정성 강화
            if (subscription && subscription.subscriptionId && subscription.nextPaymentDate) {
                alert(
                    `구독 신청이 완료되었습니다. 다음 결제일은 ${subscription.nextPaymentDate} 입니다.`
                );
    
                // ◀️ 성공 시, 해당 구독에 대한 결제 페이지로 이동
                navigate(`/payment/${subscription.subscriptionId}`);
            } else {
                // ◀️ API가 성공적으로 호출되었지만 예상치 못한 응답을 반환한 경우
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
                    {/* ◀️ onClick 핸들러에서 API에 보낼 값을 직접 설정 */}
                    <button
                        className={`h-[48px] w-[180px] rounded-[5px] text-lg font-semibold transition-colors ${
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
                        className={`h-[48px] w-[180px] rounded-[5px] text-lg font-semibold transition-colors ${
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
