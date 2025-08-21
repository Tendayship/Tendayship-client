// src/pages/FamilyManagementPage/FamilyCodeInput.tsx
import React from 'react';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    disabled: boolean;
};

const FamilyCodeInput = ({ value, onChange, error, disabled }: Props) => {
    return (
        <div className="mb-6 w-full text-left">
            <label
                htmlFor="family-code"
                className="mb-1 block text-sm font-medium text-gray-700"
            >
                가족 코드 입력
            </label>
            <input
                type="text"
                id="family-code"
                placeholder="가족 코드를 입력하세요"
                value={value}
                onChange={onChange}
                className={`h-12 w-full rounded-md border px-4 focus:border-green-500 focus:ring-green-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
                disabled={disabled}
            />
            {error && (
                <p className="mt-1 text-xs text-red-500">
                    가족 코드를 입력해주세요.
                </p>
            )}
        </div>
    );
};

export default FamilyCodeInput;
