// src/pages/FamilyManagementPage/index.tsx (연결 및 개선 완료)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/ui/Header';
import { joinGroupByCode } from '../../api/familyApi'; // ◀️ API 함수 import

const FamilyManagementPage = () => {
  const navigate = useNavigate();
  const [familyCode, setFamilyCode] = useState<string>('');
  const [selectedRelationship, setSelectedRelationship] = useState<string>(''); // ◀️ 초기값을 빈 문자열로 변경
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({ code: false, relationship: false }); // ◀️ 에러 상태 관리

  const handleFamilyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyCode(e.target.value);
    if (e.target.value) setErrors(prev => ({ ...prev, code: false }));
  };

  const handleRelationshipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRelationship(e.target.value);
    if (e.target.value) setErrors(prev => ({ ...prev, relationship: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ◀️ 유효성 검사
    const codeError = !familyCode.trim();
    const relationshipError = !selectedRelationship;
    if (codeError || relationshipError) {
      setErrors({ code: codeError, relationship: relationshipError });
      return;
    }

    setIsLoading(true);
    try {
      // ◀️ API 호출
      const joinedGroup = await joinGroupByCode({
        inviteCode: familyCode,
        relationship: selectedRelationship,
      });

      alert(`'${joinedGroup.groupName}' 그룹에 성공적으로 가입했습니다!`);
      navigate(`/family/${joinedGroup.groupId}`); // ◀️ 성공 시 가입한 그룹 페이지로 이동

    } catch (error: any) {
      console.error('그룹 가입 실패:', error);
      // 서버에서 구체적인 에러 메시지를 보냈을 경우
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('유효하지 않은 코드이거나 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">가족 그룹 가입</h1>
            <p className="text-gray-600">가족의 코드를 입력하고 관계를 설정하세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="w-full mb-6 text-left">
              <label htmlFor="family-code" className="block text-sm font-medium text-gray-700 mb-1">가족 코드 입력</label>
              <input
                type="text"
                id="family-code"
                placeholder="가족 코드를 입력하세요"
                value={familyCode}
                onChange={handleFamilyCodeChange}
                className={`w-full h-12 px-4 border rounded-md focus:ring-green-500 focus:border-green-500 ${errors.code ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading}
              />
              {errors.code && <p className="text-red-500 text-xs mt-1">가족 코드를 입력해주세요.</p>}
            </div>

            <div className="w-full mb-8 text-left">
              <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">관계 선택</label>
              <select
                id="relationship"
                value={selectedRelationship}
                onChange={handleRelationshipChange}
                className={`w-full h-12 px-4 border rounded-md appearance-none focus:ring-green-500 focus:border-green-500 ${errors.relationship ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading}
              >
                <option value="" disabled>관계를 선택하세요</option>
                <option value="DAUGHTER">딸</option>
                <option value="SON">아들</option>
                <option value="DAUGHTER_IN_LAW">며느리</option>
                <option value="SON_IN_LAW">사위</option>
                <option value="GRANDCHILD">손주</option>
                <option value="OTHER">기타</option>
              </select>
              {errors.relationship && <p className="text-red-500 text-xs mt-1">관계를 선택해주세요.</p>}
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? '가입 중...' : '등록'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FamilyManagementPage;