import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts';

export default function MainPage() {
    const { isAuthenticated, user } = useAuth();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 환영 메시지 */}
            <div className="container mx-auto px-6 py-8">
                <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">
                        안녕하세요, {user?.name || '사용자'}님!
                    </h1>
                    <p className="text-gray-600">
                        오늘도 가족들과 소중한 이야기를 나누어보세요.
                    </p>
                </div>
            </div>

            {/* 주요 기능 카드들 */}
            <section className="px-6 py-12">
                <div className="mx-auto max-w-7xl">
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
                                가족 그룹
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
                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="group text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg transition-transform group-hover:scale-110">
                                <svg
                                    className="h-10 w-10"
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
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">
                                일상의 순간 공유하기
                            </h3>
                            <p className="text-gray-600">
                                오늘 하루 있었던 소소한 일들을 사진과 함께
                                가족들과 나누어보세요.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg transition-transform group-hover:scale-110">
                                <svg
                                    className="h-10 w-10"
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
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">
                                매월 책으로 제작하기
                            </h3>
                            <p className="text-gray-600">
                                한 달 동안의 이야기들을 모아 아름다운 가족
                                책자로 만들어드립니다.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg transition-transform group-hover:scale-110">
                                <svg
                                    className="h-10 w-10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">
                                가족만의 추억 보관함
                            </h3>
                            <p className="text-gray-600">
                                소중한 가족의 기억들을 안전하게 보관하고 언제든
                                다시 꺼내볼 수 있어요.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Section */}
            <section className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <div className="mb-6 inline-block rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">
                                아이드림
                            </div>
                            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                                가족의 이야기를 담는
                                <br />
                                <span className="text-green-600">
                                    특별한 공간
                                </span>
                            </h2>
                            <p className="mb-8 text-lg text-gray-600">
                                매일의 소중한 순간들을 기록하고, 가족 간의
                                소통을 더욱 원활하게 만들어주는 서비스입니다.
                                멀리 떨어져 있어도 마음은 더 가까워질 수 있도록
                                도와드립니다.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-700">
                                    <svg
                                        className="mr-3 h-5 w-5 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    간편한 일상 기록 및 공유
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <svg
                                        className="mr-3 h-5 w-5 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    프리미엄 퀄리티 책자 제작
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <svg
                                        className="mr-3 h-5 w-5 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    안전한 클라우드 저장
                                </li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <div className="relative mx-auto h-80 w-60 rounded-2xl bg-white p-6 shadow-2xl">
                                <div className="mb-4 h-8 w-8 rounded-lg bg-green-600"></div>
                                <div className="mb-4 text-left text-lg font-bold text-gray-900">
                                    아이드림
                                </div>
                                <div className="space-y-3">
                                    <div className="h-3 w-full rounded bg-gray-200"></div>
                                    <div className="h-3 w-3/4 rounded bg-gray-200"></div>
                                    <div className="h-20 w-full rounded bg-green-100"></div>
                                    <div className="h-3 w-full rounded bg-gray-200"></div>
                                    <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-6 py-20">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                            자주 묻는 질문
                        </h2>
                        <p className="text-lg text-gray-600">
                            궁금한 점이 있으시면 언제든 문의해주세요.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                question: '누구나 쉽게 사용할 수 있나요?',
                                answer: '네! 간단한 글쓰기와 사진 업로드만으로 누구나 쉽게 가족 이야기를 기록할 수 있습니다. 직관적인 인터페이스로 어르신분들도 편리하게 사용하실 수 있어요.',
                            },
                            {
                                question:
                                    '지금 투고한 이야기들은 언제 책으로 만들어지나요?',
                                answer: '매월 말일에 한 달 동안의 이야기들을 모아 자동으로 책자가 제작됩니다. 제작된 책자는 이메일로 미리보기를 보내드리며, 원하시면 실물 책자로도 주문하실 수 있습니다.',
                            },
                            {
                                question: '작성한 내용은 수정할 수 있나요?',
                                answer: '물론입니다! 언제든지 내가 작성한 글과 사진을 수정하거나 삭제할 수 있습니다. 단, 이미 책자 제작이 시작된 후에는 해당 월의 내용은 수정이 제한될 수 있어요.',
                            },
                            {
                                question:
                                    '가족이 많은 경우에도 모두 사용할 수 있나요?',
                                answer: '네! 한 가족 그룹에 최대 20명까지 초대할 수 있습니다. 모든 가족 구성원이 각자의 이야기를 올리고, 서로의 글에 댓글을 달며 소통할 수 있어요.',
                            },
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="rounded-lg bg-white shadow-sm"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <span className="text-lg font-semibold text-gray-900">
                                        {faq.question}
                                    </span>
                                    <svg
                                        className={`h-5 w-5 text-gray-500 transition-transform ${
                                            openFaq === index
                                                ? 'rotate-180'
                                                : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {openFaq === index && (
                                    <div className="border-t px-6 pt-4 pb-6">
                                        <p className="text-gray-600">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-50 px-6 py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                            아이드림 사용 후기
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
                        {[
                            {
                                name: '김영희',
                                role: '주부',
                                rating: 5,
                                comment:
                                    '매일의 소소한 일상이 이렇게 특별한 책이 될 줄 몰랐어요. 아이들도 너무 좋아해요!',
                            },
                            {
                                name: '박민수',
                                role: '회사원',
                                rating: 5,
                                comment:
                                    '멀리 있는 부모님과 더 가까워진 느낌이에요. 매일 가족 소식을 확인하는 재미가 있어요.',
                            },
                            {
                                name: '이수진',
                                role: '대학생',
                                rating: 5,
                                comment:
                                    '가족들의 일상을 책으로 받아보니 정말 감동적이었어요. 평생 간직하고 싶은 선물이에요.',
                            },
                            {
                                name: '정대원',
                                role: '자영업',
                                rating: 5,
                                comment:
                                    '조작이 간단해서 어머니도 쉽게 사용하세요. 가족 소통이 훨씬 늘어났어요.',
                            },
                            {
                                name: '한미래',
                                role: '교사',
                                rating: 5,
                                comment:
                                    '아이들 성장기록을 남기기에 정말 좋아요. 나중에 큰 보물이 될 것 같아요.',
                            },
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="rounded-lg bg-white p-6 shadow-sm"
                            >
                                <div className="mb-4 flex">
                                    {[...Array(testimonial.rating)].map(
                                        (_, i) => (
                                            <svg
                                                key={i}
                                                className="h-5 w-5 text-yellow-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        )
                                    )}
                                </div>
                                <p className="mb-4 text-sm text-gray-600">
                                    {testimonial.comment}
                                </p>
                                <div className="text-sm">
                                    <div className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-gray-500">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-20 text-white">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        오늘부터 가족의 이야기를 시작해보세요
                    </h2>
                    <p className="mb-8 text-lg opacity-90">
                        소중한 일상의 순간들이 모여 특별한 가족의 책이 됩니다.
                    </p>
                    {isAuthenticated ? (
                        <Link
                            to="/family/create"
                            className="inline-block rounded-full bg-white px-8 py-4 text-lg font-semibold text-green-600 transition-all hover:bg-gray-100 hover:shadow-lg"
                        >
                            가족 그룹 만들기 →
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="inline-block rounded-full bg-white px-8 py-4 text-lg font-semibold text-green-600 transition-all hover:bg-gray-100 hover:shadow-lg"
                        >
                            지금 시작하기 →
                        </Link>
                    )}
                </div>
            </section>
        </div>
    );
}
