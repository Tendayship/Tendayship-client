import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [devBypassAuth, setDevBypassAuth] = useState(false);

    useEffect(() => {
        // 컴포넌트 마운트 시 localStorage에서 상태 읽기
        const bypassStatus = localStorage.getItem('dev_bypass_auth') === 'true';
        setDevBypassAuth(bypassStatus);
    }, []);

    const toggleDevBypass = () => {
        const newStatus = !devBypassAuth;
        setDevBypassAuth(newStatus);

        if (newStatus) {
            localStorage.setItem('dev_bypass_auth', 'true');
        } else {
            localStorage.removeItem('dev_bypass_auth');
        }

        // 상태 변경 후 페이지 새로고침
        window.location.reload();
    };

    const navigationLinks = [
        { path: '/', label: '메인 페이지' },
        { path: '/login', label: '로그인' },
        { path: '/profile', label: '프로필 등록' },
        { path: '/family/create', label: '가족 그룹 생성 완료' },
        { path: '/family/join', label: '초대 코드 입력' },
        { path: '/family/group', label: '가족 그룹 생성 하기' },
        { path: '/family/manage', label: '가족 관리' },
        { path: '/address/1', label: '주소 입력 (예시)' },
        { path: '/mypage/profile', label: '마이페이지 프로필' },
        { path: '/mypage/family', label: '마이페이지 가족' },
        { path: '/mypage/subscription', label: '마이페이지 구독' },
        { path: '/subscription/1', label: '구독 설정 (예시)' },
        { path: '/payment/1', label: '결제 (예시)' },
        { path: '/api-test', label: 'API 테스트' },
    ];

    return (
        <header className="relative flex h-[120px] w-full items-center border-b border-[#C2C2C2] bg-[#FFFFFF33] px-[64px]">
            {/* 로고 */}
            <Link to="/" className="mx-auto">
                <img
                    src="/yeo-dream-logo.png"
                    alt="이어드림 로고"
                    className="h-[89px] w-[252px] transition-opacity hover:opacity-80"
                />
            </Link>

            {/* 우측 메뉴 아이콘 */}
            <div className="absolute right-[64px] flex items-center space-x-[48px]">
                {/* 네비게이션 메뉴 버튼 */}
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                        <img
                            src="/3lineslogo.svg"
                            alt="메뉴"
                            className="h-[28px] w-[28px]"
                        />
                    </button>

                    {/* 드롭다운 메뉴 */}
                    {isMenuOpen && (
                        <div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
                            <div className="p-2">
                                <div className="mb-2 border-b pb-2 text-center text-sm font-semibold text-gray-700">
                                    개발용 네비게이션
                                </div>
                                {navigationLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {/* 개발자 도구 섹션 */}
                                <div className="mt-2 border-t pt-2">
                                    <div className="mb-2 text-center text-xs font-medium text-gray-500">
                                        🛠️ 개발자 도구
                                    </div>
                                    <button
                                        onClick={toggleDevBypass}
                                        className={`w-full rounded px-3 py-2 text-sm font-medium transition-colors ${
                                            devBypassAuth
                                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {devBypassAuth
                                            ? '🔓 로그인 우회 ON'
                                            : '🔒 로그인 우회 OFF'}
                                    </button>
                                    {devBypassAuth && (
                                        <div className="mt-1 px-3 py-1 text-xs text-yellow-600">
                                            ⚠️ 모든 보호된 페이지에 접근 가능
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    <img
                        src="/humanlogo.svg"
                        alt="마이페이지"
                        className="h-[28px] w-[28px]"
                    />
                </a>
            </div>

            {/* 메뉴가 열렸을 때 배경 클릭으로 닫기 */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </header>
    );
};

export default Header;
