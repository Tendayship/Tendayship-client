import { useState } from 'react';
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
    <div className="bg-[#F1F1F1] flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[#FFF] w-[500px] h-auto p-[50px] border border-[#C2C2C2] text-center flex flex-col items-center">
          <h1 className="text-[28px] text-[#000] font-bold mt-[0px] mb-[13px]">가족 코드 입력</h1>
          <p className="text-[#6A6A6A] text-[18px] mb-[32px]">"소중한 이야기, 가족과 함께 이어드립니다."</p>
          
          <div className="w-[400px] flex items-center mb-[60px] space-x-[15px] self-start">
            <label htmlFor="group-name" className="text-[14px] text-[#000] font-semibold flex-shrink-0">마이페이지 가족 관리 에서 확인하실 수 있습니다</label>
            <input
              type="text"
              id="group-name"
              placeholder="가족 코드를 입력하세요."
              className={`w-full h-[52px] p-[16px] bg-[#F1F1F1] rounded-[5px] text-[18px] focus:outline-none focus:border-[#018941] ${error ? 'border-red-500' : ''}`}
              value={groupName}
              onChange={handleInputChange}
            />
          </div>
          
          {/* 에러 메시지 */}
          {error && (
            <p className="text-red-500 text-[14px] mt-[-50px] mb-[30px] self-start w-[400px]">가족 코드를 입력해주세요.</p>
          )}

          <button
            id="register-button"
            className="bg-[#018941] text-[#FFF] w-[400px] h-[48px] rounded-[5px] hover:bg-[#018941]/90 transition-colors"
            onClick={handleRegister}
          >
            <span className="text-[20px] font-semibold text-[#018941]">확인</span>
                        <p className="text-[#6A6A6A] text-[14px]">아직 가족 그룹이 없으신가요?</p>
                        <p className="text-[#018941] text-[18px]">결제 및 그룹 생성하기</p>
          </button>
        </div>
      </main>
    </div>
  );
};

export default FamilyGroupPage;