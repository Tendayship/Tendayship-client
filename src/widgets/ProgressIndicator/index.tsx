import React from 'react';

interface ProgressIndicatorProps {
    stepData: {
        number: number;
        isActive: boolean;
        bgColor: string;
    }[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ stepData }) => {
    const getStepBgColor = (step: { isActive?: boolean; isCompleted?: boolean }) => {
        if (step.isActive) {
            return 'bg-green-600'; // Active step
        }
        if (step.isCompleted) {
            return 'bg-[#709ECD]'; // Completed step
        }
        return 'bg-gray-400'; // Future step
    };

    const getLineBgColor = (index: number) => {
        const currentStep = stepData[index];
        const nextStep = stepData[index + 1];
        if (currentStep?.isCompleted && (nextStep?.isActive || nextStep?.isCompleted)) {
            return 'bg-[#709ECD]';
        }
        return 'bg-[#d9d9d9]';
    };

    return (
        <nav
            className="fixed top-[100px] left-[719px] h-[45px] w-[483px]"
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
                        className={`${step.bgColor} relative h-[45px] w-[70px] rounded-[20px]`}
                    >
                        <div className="absolute top-[7px] left-[27px] [font-family:'Pretendard-Medium',Helvetica] text-2xl leading-[normal] font-medium tracking-[0] text-white">
                            {step.number}
                        </div>
                    </div>
                </div>
            ))}
            <div className="absolute top-5 left-[87px] h-[5px] w-[100px] bg-[#d9d9d9]" />
            <div className="absolute top-5 left-[297px] h-[5px] w-[100px] bg-[#d9d9d9]" />
        </nav>
    );
};

export default ProgressIndicator;
