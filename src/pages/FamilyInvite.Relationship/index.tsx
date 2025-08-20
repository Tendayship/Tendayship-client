// src/pages/FamilyManagementPage/RelationshipSelect.tsx
import React from 'react';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error: boolean;
    disabled: boolean;
};

const RelationshipSelect = ({ value, onChange, error, disabled }: Props) => {
    return (
        <div className="mb-8 w-full text-left">
            <label
                htmlFor="relationship"
                className="mb-1 block text-sm font-medium text-gray-700"
            >
                관계 선택
            </label>
            <select
                id="relationship"
                value={value}
                onChange={onChange}
                className={`h-12 w-full appearance-none rounded-md border px-4 focus:border-green-500 focus:ring-green-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
                disabled={disabled}
            >
                <option value="" disabled>
                    관계를 선택하세요
                </option>
                <option value="DAUGHTER">딸</option>
                <option value="SON">아들</option>
                <option value="DAUGHTER_IN_LAW">며느리</option>
                <option value="SON_IN_LAW">사위</option>
                <option value="GRANDCHILD">손주</option>
                <option value="OTHER">기타</option>
            </select>
            {error && (
                <p className="mt-1 text-xs text-red-500">
                    관계를 선택해주세요.
                </p>
            )}
        </div>
    );
};

export default RelationshipSelect;
