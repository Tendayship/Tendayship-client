import React from 'react';

const PaymentHeader = () => {
  return (
    <header className="fixed w-[1920px] h-[60px] top-0 left-0 bg-[#ffffffcc] border-b [border-bottom-style:solid] border-[#c1c1c1] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]">
      <img
        className="absolute w-[92px] h-5 top-5 left-[1780px]"
        alt="User menu frame"
        src="https://c.animaapp.com/MCJlCgVi/img/frame-1707484832.svg"
      />
      <div className="absolute w-[120px] h-10 top-2 left-[896px] aspect-[3] bg-[url(https://c.animaapp.com/MCJlCgVi/img/group-1707485386@2x.png)] bg-[100%_100%]" />
    </header>
  );
};

export default PaymentHeader;