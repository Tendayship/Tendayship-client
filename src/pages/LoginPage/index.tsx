import Header from '../../shared/ui/Header';
import KakaoLoginButton from '../../features/auth/KakaoLoginButton';

const LoginPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[#F1F1F1]">
            <Header />
            <main className="flex flex-grow items-center gap-2.5 justify-center p-4 ">
                <div className="h-[400px] w-[500px] bg-[#FFF] px-[50px] py-[40px] text-center rounded-[15px] shadow-[var(--)]">
                    <h1 className="font-pretendard mb-[20px] text-[32px] text-[#000]">
                        로그인
                    </h1>
                    <p className="font-pretendard mb-[56px] text-[18px] text-[#6A6A6A]">
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

                    <hr className="mb-[16px] w-[400px] background-[#C2C2C2] height-[1.5px]" />
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
        </div>
    );
};

export default LoginPage;
