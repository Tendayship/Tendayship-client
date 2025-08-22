import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts';

const LandingPage = () => {
    const { isAuthenticated } = useAuth();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Hero Section */}
            <section className="relative h-[1080px] min-h-screen overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-yellow-50 px-6">
                <div className="absolute inset-0 bg-[url('/landing-page-bg.svg')] bg-cover bg-center"></div>
                <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col content-center justify-center gap-[60px]">
                    <div className="gap-4">
                        <div className="text-[28px] font-light text-white">
                            어르신 댁으로 전해지는 가족의 사진과 이야기
                        </div>
                        <h1 className="font-kyobo text-[56px]">
                            한 권의 책자로 잇는 가족의 마음
                        </h1>
                    </div>
                    <div>
                        {isAuthenticated ? (
                            <Link to="/family/create">
                                <div className="flex h-[50px] w-[170px] shrink-0 items-center justify-center gap-2 rounded-[30px] bg-[rgba(1,137,65,0.60)] [box-shadow:0_54px_55px_0_rgba(0,0,0,0.25),0_-12px_30px_0_rgba(0,0,0,0.12),0_4px_6px_0_rgba(0,0,0,0.12),0_12px_13px_0_rgba(0,0,0,0.17),0_-3px_5px_0_rgba(0,0,0,0.09)]">
                                    <span className="font-sans text-[18px] leading-[normal] font-medium tracking-[-0.45px] text-white">
                                        가족 그룹 만들기
                                    </span>
                                    <img
                                        src="/icons/arrow-right.svg"
                                        alt="arrow right"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <div className="flex h-[50px] w-[170px] shrink-0 items-center justify-center gap-2 rounded-[30px] bg-[rgba(1,137,65,0.60)] [box-shadow:0_54px_55px_0_rgba(0,0,0,0.25),0_-12px_30px_0_rgba(0,0,0,0.12),0_4px_6px_0_rgba(0,0,0,0.12),0_12px_13px_0_rgba(0,0,0,0.17),0_-3px_5px_0_rgba(0,0,0,0.09)]">
                                    <span className="font-sans text-[18px] leading-[normal] font-medium tracking-[-0.45px] text-white">
                                        시작하기
                                    </span>
                                    <img
                                        src="/icons/arrow-right.svg"
                                        alt="arrow right"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative pt-[120px]">
                {/* Background Shapes */}
                <div className="pointer-events-none absolute inset-x-0 top-[140px] z-[1] h-[300px] rounded-tl-[0px] rounded-tr-[150px] rounded-br-[150px] rounded-bl-[0px] bg-[#02542D] shadow-[0_30px_60px_-12px_rgba(50,50,93,0.25),_0_18px_36px_-18px_rgba(0,0,0,0.30)]"></div>
                <div className="pointer-events-none absolute top-[260px] right-0 z-0 h-[190px] w-[1250px] rounded-tl-[95px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[95px] bg-[#DCDA98] shadow-[0_5px_30px_0_rgba(149,157,165,0.05)]"></div>
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-[48px] text-gray-900 md:text-4xl">
                            일상의 온기를 부모님께
                        </h2>
                        <p className="text-[18px] text-[#6A6A6A]">
                            가족의 마음이 책자로 완성되는 과정
                        </p>
                    </div>

                    <div className="relative z-20 grid gap-8 md:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="group text-center">
                            <div className="mx-auto mb-6 h-[200px] w-[200px] shrink-0 rounded-[105px] bg-[lightgray] bg-[url('/landpage-1.png')] bg-[length:150.588%_100%] bg-[position:-91.623px_5.596px] bg-no-repeat shadow-lg transition-transform group-hover:scale-110"></div>
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
                            <div className="mx-auto mb-6 h-[200px] w-[200px] shrink-0 rounded-[105px] bg-[lightgray] bg-[url('/landpage-2.png')] bg-[length:150.588%_100%] bg-[position:-91.623px_5.596px] bg-no-repeat shadow-lg transition-transform group-hover:scale-110"></div>
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
                            <div className="mx-auto mb-6 h-[200px] w-[200px] shrink-0 rounded-[105px] bg-[lightgray] bg-[url('/landpage-3.png')] bg-[length:150.588%_100%] bg-[position:-91.623px_5.596px] bg-no-repeat shadow-lg transition-transform group-hover:scale-110"></div>
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
};

export default LandingPage;
