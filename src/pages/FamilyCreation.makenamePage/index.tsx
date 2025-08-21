import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFamilyGroup } from '../../api/familyApi';

// This component handles the creation of a new family group by name.
const FamilyCreationNamePage = () => {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // State to show messages to the user
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | null } | null>(null);

    // Handles changes to the input field
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value);
        if (e.target.value.trim()) {
            setError(false);
        }
    };

    // Handles the 'Register' button click
    const handleRegister = async () => {
        // Validate input
        if (!groupName.trim()) {
            setError(true);
            return;
        }

        setIsLoading(true);
        setMessage(null); // Clear previous messages

        try {
            // Call the API function to create the family group
            // The actual API call is mocked in '../../api/familyApi.ts'
            const newGroup = await createFamilyGroup({ name: groupName });
            
            // Set a success message
            setMessage({
                text: `"${newGroup.name}" 가족 그룹이 성공적으로 생성되었습니다!`,
                type: 'success',
            });

            // Navigate to the next page upon success
            navigate(`/family/create-address/${newGroup.id}`);
        } catch (err) {
            console.error('가족 그룹 생성 실패:', err);
            // Set an error message
            setMessage({
                text: '그룹 생성 중 오류가 발생했습니다.',
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F1F1F1] p-4 font-inter">
            <div className="flex h-auto w-[500px] flex-col items-center rounded-lg border border-[#C2C2C2] bg-[#FFF] p-[50px] text-center shadow-md">
                <h1 className="mt-0 mb-3 text-[28px] font-bold text-[#000]">
                    가족 그룹 생성하기
                </h1>
                <p className="mb-8 text-lg text-[#6A6A6A]">
                    "우리 가족만의 소식책자 이름을 생성하세요"
                </p>

                <div className="mb-10 flex w-[400px] items-center space-x-[15px] self-start">
                    <label
                        htmlFor="group-name"
                        className="flex-shrink-0 text-[16px] font-semibold text-[#000]"
                    >
                        소식책자 이름
                    </label>
                    <input
                        type="text"
                        id="group-name"
                        placeholder="소식 책자 이름을 입력하세요"
                        className={`h-[52px] w-full rounded-[5px] border-2 bg-[#F1F1F1] p-[16px] text-lg focus:border-green-600 focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
                        value={groupName}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                </div>

                {error && (
                    <p className="mt-[-50px] mb-[30px] w-[400px] self-start text-sm text-red-500">
                        이름을 입력해주세요.
                    </p>
                )}

                <button
                    id="register-button"
                    className="h-[48px] w-[400px] rounded-[5px] bg-green-600 text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
                    onClick={handleRegister}
                    disabled={isLoading}
                >
                    <span className="text-[20px] font-semibold">
                        {isLoading ? '생성 중...' : '등록'}
                    </span>
                </button>

                {/* UI for displaying messages */}
                {message && (
                    <div className={`mt-5 w-[400px] p-4 text-center rounded-md ${
                        message.type === 'success'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {message.text}
                    </div>
                )}
            </div>
        </main>
    );
};

export default FamilyCreationNamePage;
