import { useState, useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";

import {
    getRecipientInfo,
    getFamilyMembers,
    getMyGroup,
    removeMember,
    getCurrentUserId,
    type RecipientData,
    type FamilyMember,
    type MyGroupData
} from "../../api/userApi";

// 이미지 import
import frame1707484832 from "../../assets/erdream.png";
import defaultAvatar from '../../assets/GangJiwon.png';
import userIcon from "../../assets/Iconblack.svg";
import calendarIcon from "../../assets/vector.svg";
import phoneIcon from "../../assets/Icon_call.svg";
import locationIcon from "../../assets/PhoneNumber.svg";
// import navBg from "../../assets/erdream.png";

const relationshipMap: { [key: string]: string } = {
    DAUGHTER: "딸",
    SON: "아들",
    DAUGHTER_IN_LAW: "며느리",
    SON_IN_LAW: "사위",
    LEADER: "리더"
};

const MyFamilyPageComponent = (): JSX.Element => {
    const navigate = useNavigate();
    const [recipient, setRecipient] = useState<RecipientData | null>(null);
    const [members, setMembers] = useState<FamilyMember[]>([]);
    const [myGroup, setMyGroup] = useState<MyGroupData | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [recipientData, membersData, groupData, userId] = await Promise.all([
                getRecipientInfo(),
                getFamilyMembers(),
                getMyGroup(),
                getCurrentUserId()
            ]);
            setRecipient(recipientData);
            setMembers(membersData);
            setMyGroup(groupData);
            setCurrentUserId(userId);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "데이터를 불러오는데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleRemoveMember = async (member: FamilyMember) => {
        const isSelf = member.user_id === currentUserId;
        const confirmMessage = isSelf ? "정말 그룹을 나가시겠습니까?" : `'${member.user_name}' 님을 내보내시겠습니까?`;

        if (window.confirm(confirmMessage)) {
            try {
                await removeMember(member.id);
                alert(isSelf ? "그룹에서 나갔습니다." : "멤버를 내보냈습니다.");
                fetchData(); // 목록 새로고침
            } catch (err) {
                alert("멤버를 내보내는 데 실패했습니다.");
                console.error(err);
            }
        }
    };

    const handleInvite = () => {
        if (myGroup?.invite_code) {
            navigator.clipboard.writeText(myGroup.invite_code)
                .then(() => alert(`초대 코드가 복사되었습니다: ${myGroup.invite_code}`))
                .catch(() => alert(`초대 코드: ${myGroup.invite_code}`));
        } else {
            alert("초대 코드를 불러올 수 없습니다.");
        }
    };
    
    if (isLoading) return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">오류: {error}</div>;

    const currentUserIsLeader = members.find(m => m.user_id === currentUserId)?.role === 'LEADER';
    
    return (
        <div className="bg-[#f1f1f1] grid justify-items-center [align-items:start] w-screen">
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
            <h1 className="absolute top-[139px] left-[909px] font-medium text-black text-2xl">마이페이지</h1>
            <div className="inline-flex items-start absolute top-[180px] left-[812px]">
                <button onClick={() => navigate('/mypage/profile')} className="px-6 py-1 relative border-b border-gray-300">
                    <div className="w-fit text-gray-500">프로필</div>
                </button>
                <button onClick={() => navigate('/mypage/subscription')} className="px-6 py-1 relative border-b border-gray-300">
                    <div className="w-fit text-gray-500">구독 및 결제 관리</div>
                </button>
                <button onClick={() => navigate('/mypage/family')} className="px-6 py-1 relative border-b-2 border-black">
                    <div className="w-fit font-semibold text-black">나의 가족</div>
                </button>
            </div>

            <main className="absolute w-[700px] min-h-[850px] top-[230px] left-[610px] bg-white rounded-[15px] p-6">
                <section>
                    <p className="text-[#6a6a6a] text-sm mb-2">배송 받는 분의 정보</p>
                    <div className="p-4 bg-white rounded-[10px] border border-solid border-[#c1c1c1] flex items-center relative">
                        <img className="w-20 h-20 rounded-full object-cover mr-6" alt="Recipient" src={recipient?.profile_image_url || defaultAvatar} />
                        <div>
                            <div className="flex items-center mb-1.5"><img src={userIcon} className="w-4 h-4 mr-2" alt="user" /><span className="font-semibold">{recipient?.name}</span></div>
                            <div className="flex items-center mb-1.5"><img src={calendarIcon} className="w-4 h-4 mr-2" alt="calendar" />{recipient?.birth_date || '생일 정보 없음'}</div>
                            <div className="flex items-center mb-1.5"><img src={phoneIcon} className="w-4 h-4 mr-2" alt="phone" />{recipient?.phone}</div>
                            <div className="flex items-center"><img src={locationIcon} className="w-4 h-4 mr-2" alt="location" />{`${recipient?.address} ${recipient?.address_detail}`}</div>
                        </div>
                    </div>
                </section>
                
                <section className="mt-8">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-[#6a6a6a] text-sm">가족 멤버 목록</p>
                        <button onClick={handleInvite} className="px-4 py-1.5 bg-[#018941] text-white text-sm rounded-md hover:bg-[#016a35]">
                            +&nbsp;초대하기
                        </button>
                    </div>

                    <div className="border rounded-[5px] border-[#c1c1c1]">
                        <div className="flex items-center h-10 px-4 bg-gray-50 text-sm text-[#6a6a6a]">
                            <div className="w-[25%]">프로필</div>
                            <div className="w-[20%]">이름</div>
                            <div className="w-[20%]">관계</div>
                            <div className="w-[25%]">가입일</div>
                            <div className="w-[10%] text-center">관리</div>
                        </div>

                        {members.map((member) => (
                             <div key={member.id} className="flex items-center h-16 px-4 border-t border-[#d9d9d9]">
                                <div className="w-[25%] flex items-center">
                                    <img className="w-10 h-10 rounded-full object-cover mr-4" alt={member.user_name} src={member.user_profile_image || defaultAvatar} />
                                </div>
                                <div className="w-[20%] font-medium">{member.user_name}</div>
                                <div className="w-[20%]">{relationshipMap[member.member_relationship] || member.member_relationship}</div>
                                <div className="w-[25%]">{new Date(member.joined_at).toLocaleDateString()}</div>
                                <div className="w-[10%] text-center">
                                    {(currentUserIsLeader && member.user_id !== currentUserId) || (!currentUserIsLeader && member.user_id === currentUserId) ? (
                                        <button onClick={() => handleRemoveMember(member)} className="px-2 py-0.5 text-xs text-red-600 border border-red-600 rounded hover:bg-red-50">
                                            {member.user_id === currentUserId ? '나가기' : '내보내기'}
                                        </button>
                                    ) : null }
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
          </div>
        </div>
    );
};
export default MyFamilyPageComponent;