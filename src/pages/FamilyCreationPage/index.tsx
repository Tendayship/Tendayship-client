// src/pages/FamilyCreationPage/index.tsx (연결 및 개선 완료)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ◀️ 페이지 이동 hook
import Header from '../../shared/ui/Header';
import { createFamilyGroup } from '../../api/familyApi'; // ◀️ 우리가 만든 API 함수

const FamilyCreationPage = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // ◀️ 로딩 상태 추가

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
    if (e.target.value.trim()) {
      setError(false);
    }
  };

  // '등록' 버튼 클릭 시 실행될 함수
  const handleRegister = async () => {
    if (!groupName.trim()) {
      setError(true);
      return;
    }
    
    setIsLoading(true);

    try {
      // ◀️ API 호출: groupName을 payload에 담아 전송
      const newGroup = await createFamilyGroup({ name: groupName });

      alert(`"${newGroup.name}" 가족 그룹이 성공적으로 생성되었습니다!`);
      
      // ◀️ 성공 시, 생성된 그룹의 상세 페이지로 이동 (ID 활용)
      navigate(`/family/${newGroup.id}`); 
      
    } catch (err) {
      console.error("가족 그룹 생성 실패:", err);
      alert("그룹 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F1F1F1] flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[#FFF] w-[500px] h-auto p-[50px] border border-[#C2C2C2] text-center flex flex-col items-center">
          <h1 className="text-[28px] text-[#000] font-bold mt-[0px] mb-[13px]">가족 그룹 생성하기</h1>
          <p className="text-[#6A6A6A] text-[18px] mb-[32px]">"우리 가족만의 소식책자 이름을 생성하세요"</p>
          
          <div className="w-[400px] flex items-center mb-[60px] space-x-[15px] self-start">
            <label htmlFor="group-name" className="text-[16px] text-[#000] font-semibold flex-shrink-0">소식책자 이름</label>
            <input
              type="text"
              id="group-name"
              placeholder="소식 책자 이름을 입력하세요"
              className={`w-full h-[52px] p-[16px] bg-[#F1F1F1] rounded-[5px] text-[18px] focus:outline-none focus:border-[#018941] ${error ? 'border-red-500' : ''}`}
              value={groupName}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-[14px] mt-[-50px] mb-[30px] self-start w-[400px]">이름을 입력해주세요.</p>
          )}

          <button
            id="register-button"
            className="bg-[#018941] text-[#FFF] w-[400px] h-[48px] rounded-[5px] hover:bg-[#018941]/90 transition-colors disabled:bg-gray-400"
            onClick={handleRegister}
            disabled={isLoading}
          >
            <span className="text-[20px] font-semibold">
              {isLoading ? "생성 중..." : "등록"}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default FamilyCreationPage;