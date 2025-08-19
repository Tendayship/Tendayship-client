import React from 'react';

const Header = () => {
  return (
    <header className="relative bg-[#FFFFFF33] w-full h-[120px] flex items-center px-[64px] border-b border-[#C2C2C2]">
      {/* 로고 */}
      <img
        src="image/images/images/yeo-dream-logo.png"
        alt="이어드림 로고"
        className="h-[89px] w-[252px] mx-auto"
      />

      {/* 우측 메뉴 아이콘 */}
      <div className="flex items-center space-x-[48px] absolute right-[64px]">
        <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
          <img
            src="image/images/images/3lineslogo.svg"
            alt="메뉴"
            className="h-[28px] w-[28px]"
          />
        </button>
        <a
          href="#"
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <img
            src="image/images/images/humanlogo.svg"
            alt="마이페이지"
            className="h-[28px] w-[28px]"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
