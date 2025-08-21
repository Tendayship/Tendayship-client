// 파일명: src/pages/FamilyCreationPage/FamilyCreationCompletePage.tsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGroupDetails } from '../../api/familyApi';
import icon from '../../assets/Copy.svg';
import image from '../../assets/Share.svg';
// import Header from '../../shared/ui/Header';
import ProgressIndicator from '../../widgets/ProgressIndicator';

interface Step {
    number: number;
    isActive: boolean;
    bgColor: string;
}

const stepData: Step[] = [
    { number: 1, isActive: false, bgColor: "bg-green-600" }, // 완료된 단계
    { number: 2, isActive: false, bgColor: "bg-green-600" }, // 완료된 단계
    { number: 3, isActive: true, bgColor: "bg-green-600" },  // 현재 활성화된 단계
];

const FamilyCreationCompletePage = () => {
    const navigate = useNavigate();
    const { groupId } = useParams<{ groupId: string }>();

    const [inviteCode, setInviteCode] = useState("로딩 중...");

    useEffect(() => {
        const fetchGroupInfo = async () => {
            if (!groupId) return;
            try {
                const groupInfo = await getGroupDetails(groupId);
                setInviteCode(groupInfo.inviteCode);
            } catch (error) {
                console.error("그룹 정보 조회 실패:", error);
                setInviteCode("코드 조회 실패");
            }
        };
        fetchGroupInfo();
    }, [groupId]);

    const handleCopyCode = () => {
        if (inviteCode !== "로딩 중..." && inviteCode !== "코드 조회 실패") {
            navigator.clipboard.writeText(inviteCode);
            alert('초대 코드가 복사되었습니다!');
        }
    };
    
    const handleShareCode = () => {
        if (navigator.share) {
            navigator.share({
                title: "가족 그룹에 초대합니다!",
                text: `[이어드림] 가족 초대코드: ${inviteCode}`,
            }).catch(error => console.log('공유 실패:', error));
        } else {
            alert('이 브라우저에서는 공유하기 기능을 지원하지 않습니다.');
        }
    };


    const handleConfirm = () => {
        navigate('/my-group'); // 최종 목적지 경로
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#f1f1f1]">
            {/* <Header /> */}
            <div className="mt-20 flex flex-col items-center">
                <ProgressIndicator stepData={stepData} />
                <main className="mt-10 w-[500px] rounded-lg bg-white p-10 text-center shadow-lg">
                    <h1 className="text-2xl font-semibold">
                        가족 그룹 생성이 완료 되었습니다!
                    </h1>
                    <p className="mt-4 text-gray-600">
                        이어드림에 오신 여러분을 환영합니다
                    </p>

                    <section className="mt-10">
                        <p className="text-lg">
                            <span className="font-medium">가족 코드</span>를 공유해
                            가족들을 초대하세요.
                        </p>
                        <div className="mt-4 flex items-center justify-between rounded-md bg-[#f1f1f1] p-3">
                            <span className="text-xl font-medium tracking-widest">{inviteCode}</span>
                            <div className="flex space-x-2">
                                <button onClick={handleCopyCode} className="p-2 transition-opacity hover:opacity-70" aria-label="코드 복사">
                                    <img src={icon} alt="복사" className="h-6 w-6" />
                                </button>
                                <button onClick={handleShareCode} className="p-2 transition-opacity hover:opacity-70" aria-label="코드 공유">
                                    <img src={image} alt="공유" className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </section>

                    <button
                        onClick={handleConfirm}
                        className="mt-8 h-12 w-full rounded-lg bg-green-600 font-semibold text-white transition-colors hover:bg-green-700"
                    >
                        확인
                    </button>
                </main>
            </div>
        </div>
    );
};

export default FamilyCreationCompletePage;