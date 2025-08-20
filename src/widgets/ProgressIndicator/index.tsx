import React from "react";

interface ProgressIndicatorProps {
  stepData: {
    number: number;
    isActive: boolean;
    bgColor: string;
  }[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ stepData }) => {
  return (
    <nav
      className="fixed w-[483px] h-[45px] top-[100px] left-[719px]"
      role="navigation"
      aria-label="Progress steps"
    >
      {stepData.map((step, index) => (
        <div
          key={step.number}
          className="absolute top-0"
          style={{ left: `${index * 206.5}px` }}
        >
          <div
            className={`${step.bgColor} w-[70px] h-[45px] rounded-[20px] relative`}
          >
            <div className="absolute top-[7px] left-[27px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-white text-2xl tracking-[0] leading-[normal]">
              {step.number}
            </div>
          </div>
        </div>
      ))}
      <div className="left-[87px] absolute w-[100px] h-[5px] top-5 bg-[#d9d9d9]" />
      <div className="left-[297px] absolute w-[100px] h-[5px] top-5 bg-[#d9d9d9]" />
    </nav>
  );
};

export default ProgressIndicator;