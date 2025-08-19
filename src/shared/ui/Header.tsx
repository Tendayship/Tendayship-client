import logo from '../../assets/erdream.png';
import menuIcon from '../../assets/3lines.svg';
import mypageIcon from '../../assets/humanIcon.svg';

const Header = () => {
    return (

        <header className="flex h-[120px] w-full items-center justify-between border-b border-[#C2C2C2] bg-[#FFFFFF33] px-[64px]">
            <div className="w-[104px]" />

            <img
                src={logo}
                alt="이어드림 로고"
                className="h-[89px] w-[252px]"
            />

            <div className="flex items-center space-x-[48px]">
                <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
                    <img
                        src={menuIcon}
                        alt="메뉴"
                        className="h-[28px] w-[28px]"
                    />
                </button>
                <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    <img
                        src={mypageIcon}
                        alt="마이페이지"
                        className="h-[28px] w-[28px]"
                    />
                </a>
            </div>
        </header>
    );
};

export default Header;