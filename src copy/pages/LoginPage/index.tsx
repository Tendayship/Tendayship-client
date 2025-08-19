import React from 'react';
import Header from '../../shared/ui/Header';
import KakaoLoginButton from '../../features/auth/KakaoLoginButton';

const LoginPage = () => {
  return (
    <div className="bg-[#F1F1F1] flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[#FFF] w-[520px] h-[450px] px-[50px] py-[40px] border border-[#C2C2C2] text-center">
          <h1 className="text-[32px] text-[#000] mb-[20px] font-pretendard">로그인</h1>
          <p className="text-[#6A6A6A] text-[18px] mb-[74px] font-pretendard">
            "소중한 이야기, 가족과 함께 이어드립니다."
          </p>

          <KakaoLoginButton />

          <div className="flex items-center justify-center mt-[20px] mb-[50px]">
            <input
              type="checkbox"
              id="keep-logged-in"
              className="form-checkbox h-4 w-4 text-gray-600 rounded"
            />
            <label htmlFor="keep-logged-in" className="ml-2 text-[16px] text-[#6A6A6A] font-pretendard">
              로그인 상태 유지
            </label>
          </div>

          <hr className="border-[#C2C2C2] mb-[16px] w-full" />
          <div className="text-sm">
            <p className="text-[#6A6A6A] text-[16px] font-pretendard">
              아직 계정이 없으신가요?{' '}
              <a href="/register" className="text-[#018941] text-[18px] font-pretendard hover:underline">
                회원가입
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
