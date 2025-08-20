import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../shared/ui/Header';
// [삭제] import { createSubscription } from '../../api/familyApi';

const SubscriptionPage = () => {
    const navigate = useNavigate();
    const { groupId } = useParams<{ groupId: string }>();


    const handleStartPayment = () => {
        if (!groupId) {
            alert('잘못된 접근입니다. 그룹 ID가 없습니다.');
            return;
        }
        // [수정] API 호출 없이, groupId를 가지고 결제 페이지로 바로 이동합니다.
        navigate(`/payment/${groupId}`);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#F1F1F1]">
            <Header />
            <main className="flex flex-grow items-center justify-center p-4">
                <div className="h-auto w-[500px] border border-[#C2C2C2] bg-[#FFF] p-[50px] text-center">
                    <h1 className="mt-[-10px] mb-[20px] text-[32px] font-bold text-[#000]">
                        소식 책자 정기 구독
                    </h1>
                    <p className="mb-4 text-[18px] text-[#6A6A6A]">
                        월 6,900원으로 가족의 이야기를 책으로 받아보세요.
                    </p>
                    <p className="mb-8 text-lg font-semibold">
                        아래 버튼을 눌러 결제를 진행해주세요.
                    </p>
                    

                    <button
                        className="h-[48px] w-[350px] rounded-[5px] bg-green-600 text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
                        onClick={handleStartPayment}
                    >
                        <span className="text-[20px] font-semibold">
                            결제 페이지로 이동
                        </span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SubscriptionPage;