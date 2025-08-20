import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function MainPage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 py-8">
                {/* 환영 메시지 */}
                <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">
                        안녕하세요, {user?.name || '사용자'}님! 👋
                    </h1>
                    <p className="text-gray-600">
                        오늘도 가족들과 소중한 이야기를 나누어보세요.
                    </p>
                </div>

                {/* 주요 기능 카드들 */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* 가족 그룹 관리 */}
                    <Link
                        to="/family/create"
                        className="block rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                            <svg
                                className="h-6 w-6 text-blue-600"
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
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            가족 그룹 생성
                        </h3>
                        <p className="text-gray-600">
                            새로운 가족 그룹을 만들어 멤버들을 초대하세요.
                        </p>
                    </Link>

                    {/* 소식 작성 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            소식 작성
                        </h3>
                        <p className="text-gray-600">
                            오늘의 이야기를 가족들과 공유해보세요.
                        </p>
                    </div>

                    {/* 책자 보기 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                            <svg
                                className="h-6 w-6 text-purple-600"
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
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            나의 책자
                        </h3>
                        <p className="text-gray-600">
                            지금까지 만들어진 가족 이야기 책자를 확인하세요.
                        </p>
                    </div>

                    {/* 구독 관리 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                            <svg
                                className="h-6 w-6 text-orange-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            구독 관리
                        </h3>
                        <p className="text-gray-600">
                            정기 구독 현황을 확인하고 관리하세요.
                        </p>
                    </div>

                    {/* 프로필 관리 */}
                    <Link
                        to="/profile"
                        className="block rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                            <svg
                                className="h-6 w-6 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            프로필 관리
                        </h3>
                        <p className="text-gray-600">
                            내 정보를 수정하고 프로필 사진을 변경하세요.
                        </p>
                    </Link>

                    {/* API 테스트 */}
                    <Link
                        to="/api-test"
                        className="block rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                            <svg
                                className="h-6 w-6 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            API 테스트
                        </h3>
                        <p className="text-gray-600">
                            개발자용 API 테스트 페이지입니다.
                        </p>
                    </Link>
                </div>

                {/* 최근 활동 */}
                <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">
                        최근 활동
                    </h2>
                    <div className="text-center text-gray-500">
                        <p>아직 활동 내역이 없습니다.</p>
                        <p className="mt-2">
                            가족 그룹을 만들고 첫 소식을 작성해보세요! 📝
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
