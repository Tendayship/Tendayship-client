import React from 'react';
import { useNavigate } from 'react-router-dom';

// 데이터 타입 정의
interface NavLink {
  id: string;
  title: string;
}

interface Feature {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface Testimonial {
  text: string;
  author: string;
}

// 텍스트 콘텐츠 데이터
const navLinks: NavLink[] = [
  { id: 'features', title: '서비스 특징' },
  { id: 'about', title: '소개' },
  { id: 'faq', title: '자주 묻는 질문' },
  { id: 'testimonials', title: '사용자 후기' },
];

const features: Feature[] = [
  {
    title: '손쉬운 공유',
    description: '가족 누구나 사진과 글을 간편하게 공유할 수 있습니다.',
  },
  {
    title: '따뜻한 디자인',
    description: '큰 글씨와 온기 가득한 디자인의 책으로 만듭니다.',
  },
  {
    title: '정기적인 배송',
    description: '매달 세상 단 하나뿐인 소중한 책을 보내드립니다.',
  },
];

const faqs: FaqItem[] = [
    {
        question: "가족 구성원 누구나 참여할 수 있나요?",
        answer: "네, 딸, 아들, 손자, 손녀, 사위, 며느리 등 가족구성원 누구나 참여 가능합니다. 링크만 있으면 별도 로그인 없이 참여할 수 있습니다."
    },
    {
        question: "사진과 글은 어떻게 업로드하나요?",
        answer: "책자 제작을 신청하면 가족 전용 입력 링크가 문자로 발송됩니다. 그 링크를 가족들과 공유해서 사진과 글을 업로드하시면 됩니다."
    },
    {
        question: "책자는 언제쯤 받아볼 수 있나요?",
        answer: "입력 마감일 기준으로 약 5일 이내에 책자가 제작되어 발송됩니다. 정확한 배송 일정은 신청 시 상세히 안내드립니다."
    }
];

const testimonials: Testimonial[] = [
  {
    text: '이어드림 덕분에 멀리 계신 부모님과 더 가까워진 기분이에요. 매달 책을 기다리는 설렘이 생겼습니다.',
    author: '김민준 님',
  },
  {
    text: '아이들이 커가는 모습을 생생하게 담아 부모님께 선물할 수 있어 정말 좋습니다. 최고의 서비스예요!',
    author: '이서연 님',
  },
];


// 스크롤 유틸리티 함수
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth' });
};

// 자식 컴포넌트들
const Header: React.FC = () => (
  <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">이어드림</h1>
      <nav className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            {link.title}
          </button>
        ))}
      </nav>
    </div>
  </header>
);

const HeroSection: React.FC<{ onStartClick: () => void }> = ({ onStartClick }) => (
  <section className="text-center py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">한 권의 책자로 잇는 가족의 마음</h2>
      <p className="text-lg text-gray-600 mb-8">가족의 소중한 순간들이 모여, 매달 한 권의 특별한 책이 완성됩니다.</p>
      <button
        onClick={onStartClick}
        className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
      >
        지금 시작하기
      </button>
    </div>
  </section>
);

const FeaturesSection: React.FC = () => (
  <section id="features" className="py-16">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutSection: React.FC = () => (
    <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">우리의 이야기</h2>
            <p className="text-gray-700 leading-relaxed">
                바쁜 일상과 멀리 있다는 핑계에 소중한 마음을 전하지 못할 때가 많습니다. 자주 보여드리고 싶은 아이들의 웃음, 나누고 싶은 우리의 하루들.
                <br /><br />
                이어드림은 그 아쉬운 마음을 누구보다 잘 알기에 시작되었습니다. 디지털 소통이 어려운 부모님과 자녀 세대를 가장 따뜻하고 익숙한 '책'이라는 매개체로 연결합니다. 저희는 단순한 사진첩이 아닌, 매달 도착하는 '가족의 사랑'을 만듭니다.
            </p>
        </div>
    </section>
);

const FaqSection: React.FC = () => (
  <section id="faq" className="py-16">
    <div className="container mx-auto px-6 max-w-3xl">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">자주 묻는 질문</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800">{faq.question}</h3>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TestimonialsSection: React.FC = () => (
  <section id="testimonials" className="py-16 bg-indigo-50">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">따뜻한 후기</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <blockquote key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 italic">"{testimonial.text}"</p>
            <footer className="mt-4 text-right font-semibold text-indigo-600">- {testimonial.author}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
    <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
            <p>&copy; {new Date().getFullYear()} 이어드림. All Rights Reserved.</p>
            <p className="text-sm text-gray-400 mt-2">가족의 마음을 잇습니다.</p>
        </div>
    </footer>
);


// 메인 랜딩 페이지 컴포넌트
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 font-sans antialiased">
      <Header />
      <main>
        <HeroSection onStartClick={handleStartClick} />
        <FeaturesSection />
        <AboutSection />
        <FaqSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
