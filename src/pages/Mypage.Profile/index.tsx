import React, { useState, useEffect, useRef, type JSX } from "react";
import { useNavigate } from 'react-router-dom';

import {
    getMyProfile,
    updateProfile,
    uploadProfileImage,
    logoutUser,
    type UserProfileData
} from "../../api/userApi";

// 이미지 import
import defaultAvatar from "../../assets/GangJiwon.png";
import frame1707484832 from "../../assets/erdream.png";
import editIcon from "../../assets/Edit.svg";
import userIcon from "../../assets/Iconblack.svg";
import phoneIcon from "../../assets/Icon_call.svg";
import calendarIcon from "../../assets/vector.svg";
import logo from "../../assets/erdream.png";
import navBg from "../../assets/erdream.png";

const ProfileComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", phone: "", birth_date: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getMyProfile();
        setUserProfile(data);
        setEditData({
          name: data.name || "",
          phone: data.phone || "",
          birth_date: data.birth_date || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "프로필을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { profile_image_url } = await uploadProfileImage(file);
      setUserProfile(prev => prev ? { ...prev, profile_image_url } : null);
      alert("프로필 이미지가 변경되었습니다.");
    } catch (uploadError) {
      alert("이미지 업로드에 실패했습니다.");
      console.error(uploadError);
    }
  };
  
  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
        try {
            await logoutUser();
        } catch (err) {
            console.error("서버 로그아웃 중 오류 발생:", err);
        } finally {
            localStorage.removeItem("accessToken");
            navigate('/login');
        }
    }
  };

  const handleWithdraw = () => {
    if (window.confirm("정말 회원에서 탈퇴하시겠습니까? 모든 정보가 영구적으로 삭제됩니다.")) {
        alert("회원 탈퇴 기능은 아직 지원되지 않습니다.");
    }
  };
  
  const handleEditClick = () => {
    if (!userProfile) return;
    setEditData({
      name: userProfile.name,
      phone: userProfile.phone,
      birth_date: userProfile.birth_date,
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // ✅ userApi.ts의 updateProfile 함수를 사용합니다.
      const updatedProfile = await updateProfile({ ...editData });
      setUserProfile(updatedProfile);
      setIsEditing(false);
      alert("프로필이 성공적으로 업데이트되었습니다.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "프로필 업데이트에 실패했습니다.");
    }
  };
  
  if (isLoading) return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">오류: {error}</div>;

  return (
    <div className="bg-[#f1f1f1] grid justify-items-center [align-items:start] w-screen">
      <div className="bg-[#f1f1f1] w-[1920px] h-[1080px] relative">
        <header className="absolute w-[1920px] h-[60px] top-0 left-0 bg-white border-b [border-bottom-style:solid] border-[#c1c1c1]">
            <img className="absolute w-[92px] h-5 top-5 left-[1780px]" alt="Frame" src={frame1707484832} />
            <div style={{ backgroundImage: `url(${logo})`}} className="absolute w-[120px] h-10 top-2 left-[896px] bg-[100%_100%]" />
        </header>

        <nav style={{ backgroundImage: `url(${navBg})`}} className="absolute w-[1920px] h-[45px] top-[60px] left-0 bg-cover bg-[50%_50%]">
            <div className="flex w-[499px] items-center justify-center gap-[100px] relative top-3.5 left-[711px]">
                {["홈", "소식작성", "소식함", "마이페이지"].map((item) => (
                    <div key={item} className="relative w-fit text-white text-sm cursor-pointer">{item}</div>
                ))}
            </div>
        </nav>
        
        <h1 className="absolute top-[139px] left-[909px] font-medium text-black text-2xl">마이페이지</h1>

        <div className="inline-flex items-start absolute top-[180px] left-[812px]">
            <button onClick={() => navigate('/mypage/profile')} className="px-6 py-1 relative border-b-2 border-black">
                <div className="w-fit font-semibold text-black">프로필</div>
            </button>
            <button onClick={() => navigate('/mypage/subscription')} className="px-6 py-1 relative border-b border-gray-300">
                <div className="w-fit text-gray-500">구독 및 결제 관리</div>
            </button>
            <button onClick={() => navigate('/mypage/family')} className="px-6 py-1 relative border-b border-gray-300">
                <div className="w-fit text-gray-500">나의 가족</div>
            </button>
        </div>

        <main className="absolute w-[700px] h-[850px] top-[230px] left-[610px] bg-white rounded-[15px] border border-solid border-[#a8a8a8]">
            {isEditing ? (
                <div className="p-8">
                    <h2 className="text-lg font-semibold mb-6">프로필 수정</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                        <input type="text" name="name" value={editData.name} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                        <input type="tel" name="phone" value={editData.phone} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">생년월일 (YYYY-MM-DD)</label>
                        <input type="date" name="birth_date" value={editData.birth_date} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-200 rounded-md">취소</button>
                        <button onClick={handleSaveProfile} className="px-4 py-2 bg-[#018941] text-white rounded-md">저장</button>
                    </div>
                </div>
            ) : (
                <div className="relative p-6">
                    <p className="text-[#6a6a6a] text-sm mb-2">기본 정보</p>
                    <div className="flex items-center">
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} accept="image/*" />
                        <img className="w-[100px] h-[100px] object-cover rounded-full cursor-pointer mr-8" alt="Profile Avatar" src={userProfile?.profile_image_url || defaultAvatar} onClick={handleAvatarClick} />
                        <div>
                            <div className="flex items-center mb-3">
                                <img className="w-5 h-5 mr-3" alt="User Icon" src={userIcon} />
                                <span className="text-base">{userProfile?.name}</span>
                            </div>
                            <div className="flex items-center mb-3">
                                <img className="w-5 h-5 mr-3" alt="Calendar Icon" src={calendarIcon} />
                                <span className="text-base">{userProfile?.birth_date}</span>
                            </div>
                            <div className="flex items-center">
                                <img className="w-5 h-5 mr-3" alt="Phone Icon" src={phoneIcon} />
                                <span className="text-base">{userProfile?.phone}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleEditClick} className="absolute top-6 right-6" aria-label="Edit Profile">
                        <img className="w-5 h-5" alt="Edit Icon" src={editIcon} />
                    </button>
                     <div className="mt-20 text-center">
                        <button onClick={handleLogout} className="w-[150px] h-10 bg-[#018941] rounded-[20px] text-white text-base hover:bg-[#016a35] transition-colors">
                            로그아웃
                        </button>
                        <div className="mt-4">
                            <button onClick={handleWithdraw} className="text-[#a8a8a8] text-sm underline cursor-pointer hover:text-[#888888] transition-colors">
                                회원 탈퇴
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};
export default ProfileComponent;