

// import React,
import { useState, useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";

import {
    getMySubscription,
    cancelSubscription,
    type SubscriptionData
} from "../../api/userApi";

// 이미지 import
import frame1707484832 from "../../assets/erdream.png";
// import navBg from "../../assets/erdream.png";
import subscriptionBg from '../../assets/mypagebackground.jpg';

const SubscriptionPageComponent = (): JSX.Element => {
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
    const [visibleRecords, setVisibleRecords] = useState(5);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchSubscriptionData = async () => {
        try {
            setIsLoading(true);
            const data = await getMySubscription();
            setSubscription(data);
        } catch(err) {
            setError(err instanceof Error ? err.message : "구독 정보를 불러오지 못했습니다.");
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchSubscriptionData();
    }, []);

    const handleCancelSubscription = async () => {
        if (!subscription) return;
        const reason = window.prompt("구독을 해지하는 이유를 간단히 적어주세요.");
        if(reason !== null) {
            try {
                await cancelSubscription(subscription.id, reason);
                alert("구독이 성공적으로 해지되었습니다.");
                fetchSubscriptionData();
            } catch {
                alert("구독 해지에 실패했습니다.");
            }
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">오류: {error}</div>;

    return (
        <div className="bg-[#f1f1f1] grid justify-items-center w-screen">
          <div className="bg-[#f1f1f1] w-[1920px] h-[1080px] relative">
            <header className="absolute w-[1920px] h-[60px] top-0 left-0 bg-white border-b border-[#c1c1c1]">
                <img className="absolute w-[92px] h-5 top-5 left-[1780px]" alt="Frame" src={frame1707484832} />
            </header>
            {/* <nav style={{ backgroundImage: `url(${navBg})`}} className="absolute w-[1920px] h-[45px] top-[60px] left-0 bg-cover bg-[50%_50%]"> */}
                <div className="flex w-[499px] items-center justify-center gap-[100px] relative top-3.5 left-[711px]">
                     {["홈", "소식작성", "소식함", "마이페이지"].map((item) => (
                        <div key={item} className="relative w-fit text-white text-sm cursor-pointer">{item}</div>
                    ))}
                </div>
            {/* </nav> */}
            <h1 className="absolute top-[139px] left-[906px] font-medium text-black text-2xl">마이페이지</h1>
            <div className="inline-flex items-start absolute top-[180px] left-[811px]">
                <button onClick={() => navigate('/mypage/profile')} className="px-6 py-1 relative border-b border-gray-300">
                    <div className="w-fit text-gray-500">프로필</div>
                </button>
                <button onClick={() => navigate('/mypage/subscription')} className="px-6 py-1 relative border-b-2 border-black">
                    <div className="w-fit font-semibold text-black">구독 및 결제 관리</div>
                </button>
                <button onClick={() => navigate('/mypage/family')} className="px-6 py-1 relative border-b border-gray-300">
                    <div className="w-fit text-gray-500">나의 가족</div>
                </button>
            </div>
            
            <main className="absolute w-[700px] min-h-[850px] top-[230px] left-[610px] bg-white rounded-[15px] p-6 border border-solid border-[#a8a8a8]">
                <section>
                    <p className="text-[#6a6a6a] text-sm mb-2">구독 현황</p>
                    <div style={{backgroundImage: `url(${subscriptionBg})`}} className="p-6 rounded-md text-white relative">
                        <p className="font-semibold text-base mb-4">월 정기구독 ({subscription?.status === 'active' ? '구독중' : '해지됨'})</p>
                        <div className="grid grid-cols-2 gap-y-2 text-base">
                            <span>구독 시작일</span><span>{subscription?.start_date}</span>
                            <span>다음 결제일</span><span>{subscription?.next_billing_date}</span>
                        </div>
                        {subscription?.status === 'active' && (
                            <button onClick={handleCancelSubscription} className="absolute bottom-4 right-6 text-xs text-gray-300 underline hover:text-white">
                                구독 해지
                            </button>
                        )}
                    </div>
                </section>

                <section className="mt-6">
                    <p className="text-[#6a6a6a] text-sm mb-2">결제 수단</p>
                    <div className="p-4 rounded-[5px] border border-solid border-[#a8a8a8] flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sm">현재 자동 결제중</p>
                            <p className="text-sm mt-1">{subscription?.payment_info}</p>
                        </div>
                         <button onClick={() => alert("결제 수단 변경 기능은 준비 중입니다.")} className="px-3 py-1 bg-[#018941] text-white text-xs rounded-[5px]">
                            결제 수단 변경 및 삭제
                        </button>
                    </div>
                    <div className="text-right mt-1">
                        <button onClick={() => alert("자동 결제 해지 기능은 '구독 해지'를 통해 가능합니다.")} className="text-xs text-[#a8a8a8] underline">
                            자동 결제 해지
                        </button>
                    </div>
                </section>
                
                <section className="mt-6">
                     <p className="text-[#6a6a6a] text-sm mb-2">결제 기록</p>
                    <div className="border rounded-[5px] border-[#a8a8a8]">
                        <div className="flex h-10 items-center px-4 bg-gray-50 text-sm text-[#6a6a6a]">
                            <div className="w-1/4">날짜</div>
                            <div className="w-1/4">플랜명</div>
                            <div className="w-1/4">결제 수단</div>
                            <div className="w-1/4 text-right">금액</div>
                        </div>
                        <div>
                            {subscription?.payment_records.slice(0, visibleRecords).map((record) => (
                                <div key={record.id} className="flex h-12 items-center px-4 border-t">
                                    <div className="w-1/4 text-sm text-[#6a6a6a]">{record.payment_date}</div>
                                    <div className="w-1/4 text-base">{record.plan_name}</div>
                                    <div className="w-1/4 text-base">{record.payment_method}</div>
                                    <div className="w-1/4 text-base text-right font-medium">
                                        {record.amount.toLocaleString()}원
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {subscription && subscription.payment_records.length > visibleRecords && (
                        <div className="text-center mt-6">
                            <button onClick={() => setVisibleRecords(prev => prev + 5)} className="w-[120px] h-7 rounded-[14px] border border-solid border-black text-sm">
                                더보기
                            </button>
                        </div>
                    )}
                </section>
            </main>
          </div>
        </div>
    );
};
export default SubscriptionPageComponent;