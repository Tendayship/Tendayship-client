// 파일명: src/pages/AddressPage/index.tsx (수정 완료)

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// [수정] .js 확장자 제거
import Header from '../../shared/ui/Header';
import ProgressIndicator from '../../widgets/ProgressIndicator';
import { registerRecipient } from '../../api/familyApi';
import type { RecipientPayload } from '../../api/familyApi';
import PostcodeModal from '../../components/PostcodeModal';
import { usePostcode } from '../../hooks/usePostcode';

const AddressPage = () => {
    const navigate = useNavigate();
    const { groupId } = useParams<{ groupId: string }>();

    const [addressInfo, setAddressInfo] = useState<RecipientPayload>({
        name: '',
        postcode: '',
        detailAddress: '',
        phoneNumber: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    // Daum 우편번호 서비스 통합
    const { isModalOpen, openModal, closeModal, handleComplete } = usePostcode({
        onComplete: (result) => {
            setAddressInfo(prev => ({
                ...prev,
                postcode: result.postalCode,
                detailAddress: result.address + result.addressDetail
            }));
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAddressInfo((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!groupId) {
            alert('잘못된 접근입니다. 그룹 ID가 없습니다.');
            return;
        }

        if (
            Object.values(addressInfo).some(
                (value) => !(value as string).trim()
            )
        ) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        setIsLoading(true);
        try {
            await registerRecipient(groupId, addressInfo);
            alert('주소 정보가 성공적으로 등록되었습니다!');
            navigate(`/family/create-complete/${groupId}`);
        } catch (error) {
            console.error('주소 등록 실패:', error);
            alert('주소 등록 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const stepData = [
        { number: 1, isActive: false, isCompleted: true },
        { number: 2, isActive: true, isCompleted: false },
        { number: 3, isActive: false, isCompleted: false },
    ];

    return (
        <>
            <div className="flex min-h-screen flex-col bg-gray-100">
                <Header />
                <div className="mt-20 flex flex-col items-center">
                    <ProgressIndicator stepData={stepData} />
                    <main className="mt-10 w-[500px] rounded-lg bg-white p-10 text-center shadow-lg">
                        <h1 className="mb-2 text-3xl font-bold">주소</h1>
                        <p className="mb-8 text-gray-600">
                            배송 받으실 주소를 입력해 주세요
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-start space-y-4"
                        >
                            {/* 받는 사람 */}
                            <div className="w-full text-left">
                                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">받는 분</label>
                                <input id="name" type="text" value={addressInfo.name} onChange={handleInputChange} className="h-12 w-full rounded-md border border-gray-300 px-4" placeholder="받는 분 성함을 입력하세요" />
                            </div>

                            {/* 우편 번호 */}
                            <div className="w-full text-left">
                                <label htmlFor="postcode" className="mb-1 block text-sm font-medium text-gray-700">우편 번호</label>
                                <div className="flex space-x-2">
                                    <input type="text" id="postcode" value={addressInfo.postcode} className="h-12 flex-1 rounded-md border border-gray-300 px-4" placeholder="우편 번호" readOnly />
                                    <button type="button" onClick={openModal} className="h-12 rounded-md bg-[#709ECD] px-4 text-white hover:bg-[#5a8ac4] focus:outline-none focus:ring-2 focus:ring-[#709ECD] focus:ring-offset-2 transition-colors" aria-label="우편번호 검색">우편 번호 찾기</button>
                                </div>
                            </div>

                            {/* 주소 */}
                            <div className="w-full text-left">
                                <label htmlFor="detailAddress" className="mb-1 block text-sm font-medium text-gray-700">주소</label>
                                <input id="detailAddress" type="text" value={addressInfo.detailAddress} onChange={handleInputChange} className="h-12 w-full rounded-md border border-gray-300 px-4" placeholder="상세 주소를 입력하세요" />
                            </div>

                            {/* 전화번호 */}
                            <div className="w-full text-left">
                                <label htmlFor="phoneNumber" className="mb-1 block text-sm font-medium text-gray-700">연락처</label>
                                <input id="phoneNumber" type="text" value={addressInfo.phoneNumber} onChange={handleInputChange} className="h-12 w-full rounded-md border border-gray-300 px-4" placeholder="'-' 없이 숫자만 입력" />
                            </div>

                            <button type="submit" className="mt-6 h-12 w-full rounded-lg bg-green-600 font-semibold text-white transition-colors hover:bg-green-700 disabled:bg-gray-400" disabled={isLoading}>
                                {isLoading ? '등록 중...' : '등록'}
                            </button>
                        </form>
                    </main>
                </div>
            </div>

            {/* Daum Postcode Modal */}
            <PostcodeModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onComplete={handleComplete}
                title="배송지 주소 검색"
            />
        </>
    );
};

export default AddressPage;