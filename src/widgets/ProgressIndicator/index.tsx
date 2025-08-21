import React from 'react';

interface Step {
    number: number;
    isActive: boolean;
    // bgColor 대신 isCompleted를 받아서 동적으로 색을 결정하도록 변경
    isCompleted: boolean; 
}

interface ProgressIndicatorProps {
    stepData: Step[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ stepData }) => {
    
    // 각 단계의 배경색을 결정하는 함수
    const getStepBgColor = (step: Step): string => {
        if (step.isActive) return 'bg-green-600'; // 현재 단계
        if (step.isCompleted) return 'bg-[#709ECD]'; // 완료된 단계
        return 'bg-gray-400'; // 미완료 단계
    };

    // 단계 사이의 선 색상을 결정하는 함수
    const getLineBgColor = (index: number): string => {
        // 현재 단계가 완료되었을 때만 선 색상을 변경
        if (stepData[index]?.isCompleted) {
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
            <div className="flex items-center w-full h-full">
                {stepData.map((step, index) => (
                    <React.Fragment key={step.number}>
                        {/* 단계 번호 동그라미 */}
                        <div
                            className={`${getStepBgColor(step)} relative h-[45px] w-[70px] rounded-[20px] flex items-center justify-center`}
                        >
                            <span className="text-2xl font-medium text-white">
                                {step.number}
                            </span>
                        </div>

                        {/* 마지막 단계가 아닐 경우에만 선을 렌더링 */}
                        {index < stepData.length - 1 && (
                            <div className={`${getLineBgColor(index)} h-[5px] flex-1 max-w-[136px] mx-1`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </nav>
    );
};

export default ProgressIndicator;