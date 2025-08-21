import React from 'react';
import { Link } from 'react-router-dom';

// ✅ 1. LoginPage에서 사용하던 KakaoLoginButton을 import 합니다.
import KakaoLoginButton from '../../features/auth/KakaoLoginButton';

const RegisterPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F1F1F1] p-4">
            <div className="w-[520px] rounded-lg border border-[#C2C2C2] bg-[#FFF] px-[50px] py-[40px] text-center">
                <h1 className="font-pretendard mb-[20px] text-[32px] text-[#000]">
                    회원가입
                </h1>
                <p className="font-pretendard mb-[74px] text-[18px] text-[#6A6A6A]">
                    "이어드림은 카카오로 간편하게 시작할 수 있습니다."
                </p>

                {/* ✅ 2. 기존 버튼 대신 KakaoLoginButton 컴포넌트를 직접 사용합니다. */}
<KakaoLoginButton>카카오로 1초 만에 시작하기</KakaoLoginButton>

                <hr className="my-[20px] w-full border-[#C2C2C2]" />

                <div className="text-sm">
                    <p className="font-pretendard text-[16px] text-[#6A6A6A]">
                        이미 계정이 있으신가요?{' '}
                        <Link
                            to="/login"
                            className="font-pretendard text-[18px] text-[#018941] hover:underline"
                        >
                            로그인
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;