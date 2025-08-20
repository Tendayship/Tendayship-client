<<<<<<< Updated upstream:src/pages/FamilyCreationPage/index.tsx
// src/pages/FamilyCreationPage/index.tsx (연결 및 개선 완료)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ◀️ 페이지 이동 hook
import { createFamilyGroup } from '../../api/familyApi'; // ◀️ 우리가 만든 API 함수
=======
// 파일명: src/pages/FamilyCreationPage/FamilyCreationNamePage.tsx
>>>>>>> Stashed changes:src/pages/FamilyCreation.makenamePage/index.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/ui/Header';
import { createFamilyGroup } from '../../api/familyApi';

const FamilyCreationNamePage = () => {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value);
        if (e.target.value.trim()) {
            setError(false);
        }
    };

    const handleRegister = async () => {
        if (!groupName.trim()) {
            setError(true);
            return;
        }

        setIsLoading(true);

        try {
            const newGroup = await createFamilyGroup({ name: groupName });
            alert(`"${newGroup.name}" 가족 그룹이 성공적으로 생성되었습니다!`);
            navigate(`/family/create-address/${newGroup.id}`);
        } catch (err) {
            console.error('가족 그룹 생성 실패:', err);
            alert('그룹 생성 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F1F1F1] p-4">
            <div className="flex h-auto w-[500px] flex-col items-center border border-[#C2C2C2] bg-[#FFF] p-[50px] text-center">
                <h1 className="mt-[0px] mb-[13px] text-[28px] font-bold text-[#000]">
                    가족 그룹 생성하기
                </h1>
                <p className="mb-[32px] text-[18px] text-[#6A6A6A]">
                    "우리 가족만의 소식책자 이름을 생성하세요"
                </p>

                <div className="mb-[60px] flex w-[400px] items-center space-x-[15px] self-start">
                    <label
                        htmlFor="group-name"
                        className="flex-shrink-0 text-[16px] font-semibold text-[#000]"
                    >
                        소식책자 이름
                    </label>
                    <input
                        type="text"
                        id="group-name"
                        placeholder="소식 책자 이름을 입력하세요"
                        className={`h-[52px] w-full rounded-[5px] bg-[#F1F1F1] p-[16px] text-[18px] focus:border-[#018941] focus:outline-none ${error ? 'border-red-500' : ''}`}
                        value={groupName}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                </div>

                {error && (
                    <p className="mt-[-50px] mb-[30px] w-[400px] self-start text-[14px] text-red-500">
                        이름을 입력해주세요.
                    </p>
                )}

                <button
                    id="register-button"
                    className="h-[48px] w-[400px] rounded-[5px] bg-[#018941] text-[#FFF] transition-colors hover:bg-[#018941]/90 disabled:bg-gray-400"
                    onClick={handleRegister}
                    disabled={isLoading}
                >
                    <span className="text-[20px] font-semibold">
                        {isLoading ? '생성 중...' : '등록'}
                    </span>
                </button>
            </div>
        </main>
    );
};

export default FamilyCreationNamePage;