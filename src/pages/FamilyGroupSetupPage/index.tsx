import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setupFamilyGroup, type FamilyGroupSetupPayload } from '../../api/familyApi';
import PostcodeModal from '../../components/PostcodeModal';
import { usePostcode } from '../../hooks/usePostcode';

interface LocationState {
    groupName?: string;
}

export default function FamilyGroupSetupPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;
    
    const [formData, setFormData] = useState<FamilyGroupSetupPayload>({
        group_name: state?.groupName || '',
        deadline_type: 'SECOND_SUNDAY',
        leader_relationship: 'DAUGHTER',
        recipient_name: '',
        recipient_address: '',
        recipient_address_detail: '',
        recipient_postal_code: '',
        recipient_phone: ''
    });
    
    const [errors, setErrors] = useState<{[key: string]: boolean}>({});
    const [isLoading, setIsLoading] = useState(false);

    // Daum 우편번호 서비스 통합
    const { isModalOpen, openModal, closeModal, handleComplete } = usePostcode({
        onComplete: (result) => {
            setFormData(prev => ({
                ...prev,
                recipient_address: result.address + result.addressDetail,
                recipient_postal_code: result.postalCode
            }));
            setErrors(prev => ({ 
                ...prev, 
                recipient_address: false, 
                recipient_postal_code: false 
            }));
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: false }));
    };

    const validateForm = (): boolean => {
        const newErrors: {[key: string]: boolean} = {};

        if (!formData.group_name.trim()) newErrors.group_name = true;
        if (!formData.recipient_name.trim()) newErrors.recipient_name = true;
        if (!formData.recipient_address.trim()) newErrors.recipient_address = true;
        if (!formData.recipient_postal_code.trim()) newErrors.recipient_postal_code = true;
        if (!formData.recipient_phone.trim()) newErrors.recipient_phone = true;
        
        // 전화번호 형식 검증
        const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
        if (formData.recipient_phone && !phoneRegex.test(formData.recipient_phone.replace(/-/g, ''))) {
            newErrors.recipient_phone = true;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            alert('입력 정보를 확인해주세요.');
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await setupFamilyGroup(formData);
            
            alert(`${response.group.group_name} 그룹이 성공적으로 생성되었습니다!\n초대 코드: ${response.group.invite_code}`);
            
            // 성공 시 메인 페이지로 이동
            navigate('/', { 
                state: { 
                    message: '가족 그룹이 성공적으로 생성되었습니다!',
                    groupInfo: response.group 
                } 
            });
            
        } catch (err) {
            console.error('그룹 생성 실패:', err);
            alert('그룹 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const relationshipOptions = [
        { value: 'DAUGHTER', label: '딸' },
        { value: 'SON', label: '아들' },
        { value: 'DAUGHTER_IN_LAW', label: '며느리' },
        { value: 'SON_IN_LAW', label: '사위' },
        { value: 'GRANDCHILD', label: '손주' },
        { value: 'OTHER', label: '기타' }
    ];

    const deadlineOptions = [
        { value: 'SECOND_SUNDAY', label: '매월 둘째 주 일요일' },
        { value: 'FOURTH_SUNDAY', label: '매월 넷째 주 일요일' },
        { value: 'LAST_DAY_OF_MONTH', label: '매월 마지막 날' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            가족 그룹 설정
                        </h1>
                        <p className="text-gray-600">
                            소중한 가족을 위한 그룹을 완성해보세요.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* 그룹 이름 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    그룹 이름
                                </label>
                                <input
                                    type="text"
                                    name="group_name"
                                    value={formData.group_name}
                                    onChange={handleInputChange}
                                    placeholder="예: 우리 가족"
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                                        errors.group_name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    disabled={isLoading}
                                />
                            </div>

                            {/* 마감일 설정 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    소식 마감일
                                </label>
                                <select
                                    name="deadline_type"
                                    value={formData.deadline_type}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    disabled={isLoading}
                                >
                                    {deadlineOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-1 text-sm text-gray-500">
                                    선택한 날짜에 맞춰 소식을 모아 책자로 만들어드립니다.
                                </p>
                            </div>

                            {/* 리더 관계 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    받는 분과의 관계
                                </label>
                                <select
                                    name="leader_relationship"
                                    value={formData.leader_relationship}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    disabled={isLoading}
                                >
                                    {relationshipOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <hr className="my-8" />

                            {/* 받는 분 정보 섹션 */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    책자를 받을 분의 정보
                                </h3>
                                
                                {/* 받는 분 이름 */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        받는 분 성함
                                    </label>
                                    <input
                                        type="text"
                                        name="recipient_name"
                                        value={formData.recipient_name}
                                        onChange={handleInputChange}
                                        placeholder="예: 할머니"
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                                            errors.recipient_name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* 주소 */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        주소
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={formData.recipient_postal_code}
                                            placeholder="우편번호"
                                            className="w-24 p-3 border border-gray-300 rounded-lg bg-gray-50"
                                            disabled
                                        />
                                        <button
                                            type="button"
                                            onClick={openModal}
                                            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                            disabled={isLoading}
                                            aria-label="우편번호 검색 열기"
                                        >
                                            주소 검색
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.recipient_address}
                                        placeholder="주소를 검색해주세요"
                                        className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50"
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        name="recipient_address_detail"
                                        value={formData.recipient_address_detail}
                                        onChange={handleInputChange}
                                        placeholder="상세주소를 입력해주세요"
                                        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* 전화번호 */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        전화번호
                                    </label>
                                    <input
                                        type="tel"
                                        name="recipient_phone"
                                        value={formData.recipient_phone}
                                        onChange={handleInputChange}
                                        placeholder="010-1234-5678"
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                                            errors.recipient_phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* 제출 버튼 */}
                            <div className="flex space-x-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    disabled={isLoading}
                                >
                                    이전
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                                    disabled={isLoading}
                                >
                                    {isLoading ? '생성 중...' : '그룹 생성 완료'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Daum Postcode Modal */}
            <PostcodeModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onComplete={handleComplete}
                title="배송지 주소 검색"
            />
        </div>
    );
}