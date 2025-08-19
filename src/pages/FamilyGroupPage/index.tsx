import React, { useState } from 'react';
import Header from '../../shared/ui/Header';

const FamilyGroupPage = () => {
    // useState를 이용해 입력값을 관리합니다.
    const [groupName, setGroupName] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    // 입력값이 변경될 때마다 state를 업데이트하는 핸들러 함수
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value);
        // 입력 시 에러 메시지 초기화
        setError(false);
    };

    // '등록' 버튼 클릭 시 실행될 함수
    const handleRegister = () => {
        if (!groupName.trim()) {
            setError(true);
            return;
        }

        // 유효성 검사를 통과한 후 실행될 로직
        console.log(`새로운 가족 그룹 이름: "${groupName}"`);
        alert(`"${groupName}" 가족 그룹이 성공적으로 생성되었습니다!`);

        // API 호출 로직을 여기에 추가할 수 있습니다.
        // 예시: const response = await fetch('/api/create-group', { method: 'POST', body: JSON.stringify({ name: groupName }) });
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#F1F1F1]">
            <Header />
            <main className="flex flex-grow items-center justify-center p-4">
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
                        />
                    </div>

                    {/* 에러 메시지 */}
                    {error && (
                        <p className="mt-[-50px] mb-[30px] w-[400px] self-start text-[14px] text-red-500">
                            이름을 입력해주세요.
                        </p>
                    )}

                    <button
                        id="register-button"
                        className="h-[48px] w-[400px] rounded-[5px] bg-[#018941] text-[#FFF] transition-colors hover:bg-[#018941]/90"
                        onClick={handleRegister}
                    >
                        <span className="text-[20px] font-semibold">등록</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default FamilyGroupPage;
