import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/login');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-brand-white overflow-x-hidden">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-white/90 backdrop-blur-sm border-b border-brand-gray-lighter">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/yeo-dream-logo.png" 
              alt="이어드림 로고" 
              className="h-10 w-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="ml-2 h-10 w-28 bg-brand-navy rounded flex items-center justify-center">
              <span className="text-brand-white text-lg font-bold font-pretendard">이어드림</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="주요 네비게이션">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-brand-gray-dark hover:text-brand-navy font-pretendard text-sm font-medium transition-colors"
              aria-label="홈 섹션으로 이동"
            >
              홈
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className="text-brand-gray-dark hover:text-brand-navy font-pretendard text-sm font-medium transition-colors"
              aria-label="서비스 과정으로 이동"
            >
              서비스 과정
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-brand-gray-dark hover:text-brand-navy font-pretendard text-sm font-medium transition-colors"
              aria-label="자주 묻는 질문으로 이동"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-brand-gray-dark hover:text-brand-navy font-pretendard text-sm font-medium transition-colors"
              aria-label="이용 후기로 이동"
            >
              이용 후기
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-navy/20 to-brand-dark-green/10"
        aria-label="메인 소개 섹션"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-brand-white text-4xl md:text-6xl font-light font-pretendard mb-4 leading-tight">
              어르신 댁으로 전해지는
              <br />
              <span className="font-kyobo text-5xl md:text-7xl font-normal">
                가족의 사진과 이야기
              </span>
            </h1>
            <p className="text-brand-white text-xl md:text-2xl font-pretendard mb-12 opacity-90">
              한 권의 책자로 잇는 가족의 마음
            </p>
            <button
              onClick={handleStartClick}
              className="inline-flex items-center gap-3 bg-brand-dark-green/80 hover:bg-brand-dark-green text-brand-white px-8 py-4 rounded-full text-lg font-medium font-pretendard transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"
              aria-label="이어드림 서비스 시작하기"
            >
              <span>시작하기</span>
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section 
        id="process" 
        className="py-20 bg-gradient-to-b from-brand-white to-brand-gray-lighter/30"
        aria-label="서비스 이용 과정"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-brand-black text-3xl md:text-4xl font-medium font-pretendard mb-4">
              일상의 온기를 부모님께
            </h2>
            <p className="text-brand-gray-dark text-lg font-pretendard">
              가족의 마음이 책자로 완성되는 과정
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-yellow-light to-brand-yellow flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <div className="w-32 h-32 bg-brand-white/30 rounded-full flex items-center justify-center">
                  <span className="text-4xl" role="img" aria-label="사진 공유">📷</span>
                </div>
              </div>
              <h3 className="text-brand-black text-xl font-medium font-pretendard mb-2">
                일상의 순간을 공유해요
              </h3>
              <p className="text-brand-gray font-pretendard leading-relaxed">
                가족 누구나 사진과 글을 공유할 수 있습니다.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-navy/20 to-brand-dark-green/20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <div className="w-32 h-32 bg-brand-white/50 rounded-full flex items-center justify-center">
                  <span className="text-4xl" role="img" aria-label="책 제작">📖</span>
                </div>
              </div>
              <h3 className="text-brand-black text-xl font-medium font-pretendard mb-2">
                세상 단 하나뿐인 책으로
              </h3>
              <p className="text-brand-gray font-pretendard leading-relaxed">
                큰 글씨와 따뜻한 디자인의 책으로 만듭니다.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-yellow-light to-brand-yellow flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <div className="w-32 h-32 bg-brand-white/30 rounded-full flex items-center justify-center">
                  <span className="text-4xl" role="img" aria-label="배송">💝</span>
                </div>
              </div>
              <h3 className="text-brand-black text-xl font-medium font-pretendard mb-2">
                부모님께 감동이 도착해요
              </h3>
              <p className="text-brand-gray font-pretendard leading-relaxed">
                매달 세상 단 하나뿐인 책을 보내드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-brand-dark-green/5" aria-label="서비스 소개">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <div className="bg-brand-white rounded-lg shadow-xl p-8">
                <img 
                  src="/mypagebackground.jpg" 
                  alt="이어드림 서비스 소개 이미지"
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTBBNEFFIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCI+7ISc67mE7IqkIOyEnOqwnCDsnbTrr7jsp4A8L3RleHQ+Cjwvc3ZnPg==';
                  }}
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="mb-6">
                <div className="w-52 h-20 bg-brand-dark-green rounded-lg flex items-center justify-center mb-4">
                  <span className="text-brand-white text-2xl font-bold font-pretendard">이어드림</span>
                </div>
              </div>
              <p className="text-brand-dark-green text-lg font-pretendard leading-relaxed mb-6">
                바쁜 일상에, 멀리 있다는 핑계에 소중한 마음을 전하지 못할 때가 많습니다. 
                자주 보여드리고 싶은 아이들의 웃음, 나누고 싶은 우리의 하루들.
              </p>
              <p className="text-brand-dark-green text-lg font-pretendard leading-relaxed mb-6">
                이어드림은 그 아쉬운 마음을 누구보다 잘 알기에 시작되었습니다. 
                디지털 소통이 어려운 부모님과 자녀 세대를 가장 따뜻하고 익숙한 '책'이라는 방법으로 연결합니다.
              </p>
              <p className="text-brand-dark-green text-lg font-pretendard leading-relaxed font-medium">
                저희는 단순한 사진첩이 아닌, 매달 도착하는 '가족의 사랑'을 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-brand-white" aria-label="자주 묻는 질문">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-brand-black text-3xl md:text-4xl font-medium font-pretendard mb-4">
              자주 묻는 질문
            </h2>
            <p className="text-brand-gray-dark text-lg font-pretendard">
              이어드림 서비스에 대한 궁금한 점들을 확인해보세요
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <details className="group bg-brand-gray-lighter/30 rounded-full border border-brand-dark-green overflow-hidden">
              <summary className="cursor-pointer p-6 font-pretendard text-xl font-medium text-brand-black hover:bg-brand-gray-lighter/50 transition-colors list-none">
                <div className="flex items-center gap-5">
                  <span className="text-brand-dark-green font-bold">Q.</span>
                  <span>누구나 참여할 수 있나요?</span>
                  <span className="ml-auto text-brand-dark-green group-open:rotate-180 transition-transform">▼</span>
                </div>
              </summary>
              <div className="px-6 pb-6 bg-brand-dark-green/80 text-brand-white">
                <div className="flex items-start gap-5">
                  <span className="font-bold">A.</span>
                  <p className="font-pretendard text-lg">
                    네, 딸, 아들, 손자, 손녀, 사위, 며느리 등 가족구성원 누구나 참여 가능합니다. 
                    링크만 있으면 별도 로그인 없이 참여할 수 있습니다.
                  </p>
                </div>
              </div>
            </details>

            <details className="group bg-brand-gray-lighter/30 rounded-full border border-brand-dark-green overflow-hidden">
              <summary className="cursor-pointer p-6 font-pretendard text-xl font-medium text-brand-black hover:bg-brand-gray-lighter/50 transition-colors list-none">
                <div className="flex items-center gap-5">
                  <span className="text-brand-dark-green font-bold">Q.</span>
                  <span>가족 소식은 어떻게 보내나요?</span>
                  <span className="ml-auto text-brand-dark-green group-open:rotate-180 transition-transform">▼</span>
                </div>
              </summary>
              <div className="px-6 pb-6 bg-brand-dark-green/80 text-brand-white">
                <div className="flex items-start gap-5">
                  <span className="font-bold">A.</span>
                  <p className="font-pretendard text-lg">
                    책자 제작을 신청하면 가족 전용 입력 링크가 문자로 발송됩니다. 
                    그 링크를 가족들과 공유해서 사진을 업로드하시면 됩니다.
                  </p>
                </div>
              </div>
            </details>

            <details className="group bg-brand-gray-lighter/30 rounded-full border border-brand-dark-green overflow-hidden">
              <summary className="cursor-pointer p-6 font-pretendard text-xl font-medium text-brand-black hover:bg-brand-gray-lighter/50 transition-colors list-none">
                <div className="flex items-center gap-5">
                  <span className="text-brand-dark-green font-bold">Q.</span>
                  <span>책자는 언제 받아볼 수 있나요?</span>
                  <span className="ml-auto text-brand-dark-green group-open:rotate-180 transition-transform">▼</span>
                </div>
              </summary>
              <div className="px-6 pb-6 bg-brand-dark-green/80 text-brand-white">
                <div className="flex items-start gap-5">
                  <span className="font-bold">A.</span>
                  <p className="font-pretendard text-lg">
                    입력 마감일 기준으로 약 5일 이내에 책자가 제작돼요. 
                    정확한 배송 일정은 신청 시 안내드립니다.
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-brand-gray-lighter/20 to-brand-white" aria-label="이용 후기">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-brand-black text-3xl md:text-4xl font-medium font-pretendard mb-4">
              이어드림 사용 후기
            </h2>
            <p className="text-brand-gray-dark text-lg font-pretendard">
              실제 이용자분들의 따뜻한 후기를 확인해보세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { rating: 5, text: "매달 아들 딸 소식을 받아보니 너무 좋아요. 사진도 큼직하게 잘 나오고 글씨도 커서 읽기 편해요.", author: "김○○ 님 (75세)" },
              { rating: 5, text: "손자 손녀 사진을 이렇게 예쁜 책으로 받아보니 정말 감동이에요. 매일매일 보고 또 봐도 행복합니다.", author: "이○○ 님 (70세)" },
              { rating: 5, text: "멀리 사는 자식들 근황을 이렇게 받아볼 수 있어서 너무 감사해요. 이웃들에게도 자랑하고 다녀요.", author: "박○○ 님 (78세)" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-brand-dark-green/80 rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4" aria-label={`${testimonial.rating}점 만점에 ${testimonial.rating}점`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-brand-yellow text-2xl" role="img" aria-hidden="true">★</span>
                  ))}
                </div>
                <blockquote className="text-brand-white font-pretendard text-sm leading-normal mb-6">
                  "{testimonial.text}"
                </blockquote>
                <cite className="text-brand-white/90 font-pretendard text-base not-italic">
                  {testimonial.author}
                </cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark-green text-brand-white py-16" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold font-pretendard mb-6">이어드림</h3>
              <div className="space-y-3 text-brand-gray-light font-pretendard">
                <div className="flex gap-4">
                  <span className="font-semibold">대표자</span>
                  <span>이찬희</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-semibold">주소</span>
                  <span>서울 서대문구 이화여대길 52 201호</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-semibold">고객센터</span>
                  <span>070-8064-2260 (평일 10:00-18:00)</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-semibold">이메일 문의</span>
                  <span>deardreambiz@gmail.com</span>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-brand-white/20">
                <div className="flex flex-wrap gap-6 mb-4">
                  <a href="#" className="text-brand-white hover:text-brand-yellow font-pretendard transition-colors">이용 약관</a>
                  <a href="#" className="text-brand-white hover:text-brand-yellow font-pretendard font-semibold transition-colors">개인정보 처리 방침</a>
                  <a href="#" className="text-brand-white hover:text-brand-yellow font-pretendard transition-colors">쿠키 정책</a>
                  <a href="#" className="text-brand-white hover:text-brand-yellow font-pretendard transition-colors">블로그</a>
                </div>
                <p className="text-brand-gray-light text-sm font-pretendard">
                  ⓒ 2025, 이어드림
                </p>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end items-center">
              <div className="bg-brand-white/5 rounded-lg p-8 max-w-md">
                <div className="text-center">
                  <h4 className="text-xl font-semibold font-pretendard mb-4">함께 만들어요</h4>
                  <p className="text-brand-gray-light font-pretendard mb-6">
                    가족의 소중한 순간들을 아름다운 책자로 완성해보세요
                  </p>
                  <button
                    onClick={handleStartClick}
                    className="w-full bg-brand-dark-green hover:bg-brand-dark-green/80 text-brand-white px-6 py-3 rounded-lg font-medium font-pretendard transition-colors focus:outline-none focus:ring-2 focus:ring-brand-white focus:ring-offset-2 focus:ring-offset-brand-dark-green"
                  >
                    지금 시작하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
