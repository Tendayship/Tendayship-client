// src/pages/FamilyManagementPage/index.tsx (연결 및 개선 완료)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinGroupByCode } from '../../api/familyApi'; // API 함수 import

const FamilyManagementPage = () => {
    const navigate = useNavigate();
    const [familyCode, setFamilyCode] = useState<string>('');
    const [selectedRelationship, setSelectedRelationship] =
        useState<string>(''); // 초기값을 빈 문자열로 변경
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({ code: false, relationship: false }); // 에러 상태 관리

    const handleFamilyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFamilyCode(e.target.value);
        if (e.target.value) setErrors((prev) => ({ ...prev, code: false }));
    };

    const handleRelationshipChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedRelationship(e.target.value);
        if (e.target.value)
            setErrors((prev) => ({ ...prev, relationship: false }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        const codeError = !familyCode.trim();
        const relationshipError = !selectedRelationship;
        if (codeError || relationshipError) {
            setErrors({ code: codeError, relationship: relationshipError });
            return;
        }

        setIsLoading(true);
        try {
            // API 호출
            const joinedGroup = await joinGroupByCode({
                inviteCode: familyCode,
                relationship: selectedRelationship,
            });

            alert(`'${joinedGroup.groupName}' 그룹에 성공적으로 가입했습니다!`);
            navigate(`/family/${joinedGroup.groupId}`); // 성공 시 가입한 그룹 페이지로 이동
        } catch (error: unknown) {
            console.error('그룹 가입 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-10 text-center shadow-lg">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold">가족 그룹 가입</h1>
                    <p className="text-gray-600">
                        가족의 코드를 입력하고 관계를 설정하세요.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center"
                >
                    <div className="mb-6 w-full text-left">
                        <label
                            htmlFor="family-code"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            가족 코드 입력
                        </label>
                        <input
                            type="text"
                            id="family-code"
                            placeholder="가족 코드를 입력하세요"
                            value={familyCode}
                            onChange={handleFamilyCodeChange}
                            className={`h-12 w-full rounded-md border px-4 focus:border-green-500 focus:ring-green-500 ${errors.code ? 'border-red-500' : 'border-gray-300'}`}
                            disabled={isLoading}
                        />
                        {errors.code && (
                            <p className="mt-1 text-xs text-red-500">
                                가족 코드를 입력해주세요.
                            </p>
                        )}
                    </div>

                    <div className="mb-8 w-full text-left">
                        <label
                            htmlFor="relationship"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            관계 선택
                        </label>
                        <select
                            id="relationship"
                            value={selectedRelationship}
                            onChange={handleRelationshipChange}
                            className={`h-12 w-full appearance-none rounded-md border px-4 focus:border-green-500 focus:ring-green-500 ${errors.relationship ? 'border-red-500' : 'border-gray-300'}`}
                            disabled={isLoading}
                        >
                            <option value="" disabled>
                                관계를 선택하세요
                            </option>
                            <option value="DAUGHTER">딸</option>
                            <option value="SON">아들</option>
                            <option value="DAUGHTER_IN_LAW">며느리</option>
                            <option value="SON_IN_LAW">사위</option>
                            <option value="GRANDCHILD">손주</option>
                            <option value="OTHER">기타</option>
                        </select>
                        {errors.relationship && (
                            <p className="mt-1 text-xs text-red-500">
                                관계를 선택해주세요.
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="h-12 w-full rounded-lg bg-green-600 font-semibold text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
                        disabled={isLoading}
                    >
                        {isLoading ? '가입 중...' : '등록'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default FamilyManagementPage;
