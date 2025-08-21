import KakaoLoginButton from '../../features/auth/KakaoLoginButton';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {/* 메인 콘텐츠 */}
            <main className="container mx-auto px-6 py-16 lg:px-12">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* 텍스트 섹션 */}
                    <div className="text-center lg:text-left">
                        <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 lg:text-5xl">
                            소중한 이야기,
                            <br />
                            <span className="text-green-600">가족과 함께</span>
                            <br />
                            이어드립니다
                        </h1>
                        <p className="mb-8 text-lg text-gray-600 lg:text-xl">
                            가족들의 일상을 모아 아름다운 책자로 만들어보세요.
                            <br />
                            할머니, 할아버지께 우리의 이야기를 전해드릴 수
                            있어요.
                        </p>

                        {/* 로그인 버튼 */}
                        <div className="flex justify-center lg:justify-start">
                            <KakaoLoginButton />
                        </div>
                    </div>

                    {/* 이미지 섹션 */}
                    <div className="flex justify-center">
                        <div className="rounded-2xl bg-white p-8 shadow-xl">
                            <img
                                src="/yeo-dream-logo.png"
                                alt="가족 이야기 책자"
                                className="h-64 w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* 특징 섹션 */}
                <section className="mt-24">
                    <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
                        이어드림의 특별한 점
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <svg
                                    className="h-8 w-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                아름다운 책자
                            </h3>
                            <p className="text-gray-600">
                                가족들의 소식을 모아 정성스러운 책자로
                                제작해드립니다.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <svg
                                    className="h-8 w-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                가족 참여
                            </h3>
                            <p className="text-gray-600">
                                온 가족이 함께 참여하여 소중한 추억을 남길 수
                                있어요.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <svg
                                    className="h-8 w-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                정기 배송
                            </h3>
                            <p className="text-gray-600">
                                매월 정기적으로 새로운 이야기를 담은 책자를
                                받아보세요.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* 푸터 */}
            <footer className="bg-gray-900 py-8 text-white">
                <div className="container mx-auto px-6 text-center lg:px-12">
                    <p>&copy; 2024 이어드림. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
