import KakaoLoginButton from '../../features/auth/KakaoLoginButton';

const LoginPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F1F1F1] p-4">
            <div className="h-[450px] w-[520px] border border-[#C2C2C2] bg-[#FFF] px-[50px] py-[40px] text-center">
                <h1 className="font-pretendard mb-[20px] text-[32px] text-[#000]">
                    로그인
                </h1>
                <p className="font-pretendard mb-[74px] text-[18px] text-[#6A6A6A]">
                    "소중한 이야기, 가족과 함께 이어드립니다."
                </p>

                <KakaoLoginButton />

                <div className="mt-[20px] mb-[50px] flex items-center justify-center">
                    <input
                        type="checkbox"
                        id="keep-logged-in"
                        className="form-checkbox h-4 w-4 rounded text-gray-600"
                    />
                    <label
                        htmlFor="keep-logged-in"
                        className="font-pretendard ml-2 text-[16px] text-[#6A6A6A]"
                    >
                        로그인 상태 유지
                    </label>
                </div>

                <hr className="mb-[16px] w-full border-[#C2C2C2]" />
                <div className="text-sm">
                    <p className="font-pretendard text-[16px] text-[#6A6A6A]">
                        아직 계정이 없으신가요?{' '}
                        <a
                            href="/register"
                            className="font-pretendard text-[18px] text-[#018941] hover:underline"
                        >
                            회원가입
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;