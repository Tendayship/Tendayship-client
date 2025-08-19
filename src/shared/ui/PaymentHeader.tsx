import React from 'react';

const PaymentHeader = () => {
    return (
        <header className="fixed top-0 left-0 h-[60px] w-[1920px] border-b [border-bottom-style:solid] border-[#c1c1c1] bg-[#ffffffcc] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]">
            <img
                className="absolute top-5 left-[1780px] h-5 w-[92px]"
                alt="User menu frame"
                src="https://c.animaapp.com/MCJlCgVi/img/frame-1707484832.svg"
            />
            <div className="absolute top-2 left-[896px] aspect-[3] h-10 w-[120px] bg-[url(https://c.animaapp.com/MCJlCgVi/img/group-1707485386@2x.png)] bg-[100%_100%]" />
        </header>
    );
};

export default PaymentHeader;
