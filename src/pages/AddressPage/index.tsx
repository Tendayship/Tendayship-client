// src/pages/AddressPage/index.tsx (연결 및 개선 완료)
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode'; // ◀️ 우편번호 라이브러리 import
import ProgressIndicator from '../../widgets/ProgressIndicator';
import { registerRecipient } from '../../api/familyApi.js'; // ◀️ API 함수 import
import type { RecipientPayload } from '../../api/familyApi.js';

interface DaumPostcodeData {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
}

const AddressPage = () => {
    const navigate = useNavigate();
    const { groupId } = useParams<{ groupId: string }>(); // ◀️ URL에서 groupId 가져오기

    const [addressInfo, setAddressInfo] = useState<RecipientPayload>({
        name: '',
        postcode: '',
        detailAddress: '',
        phoneNumber: '',
    });

    const [isPostcodeModalOpen, setIsPostcodeModalOpen] = useState(false); // ◀️ 우편번호 모달 상태
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAddressInfo((prev) => ({ ...prev, [id]: value }));
    };

    // ◀️ 우편번호 검색 완료 후 실행될 콜백 함수
    const handleCompletePostcode = (data: DaumPostcodeData) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress +=
                    extraAddress !== ''
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        // 주소 정보 업데이트
        setAddressInfo((prev) => ({
            ...prev,
            postcode: data.zonecode,
            detailAddress: fullAddress, // 기본 주소를 상세주소 필드에 미리 채워줌
        }));

        setIsPostcodeModalOpen(false); // 모달 닫기
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!groupId) {
            alert('잘못된 접근입니다. 그룹 ID가 없습니다.');
            return;
        }

        // 간단한 유효성 검사
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
            navigate(`/subscription/${groupId}`); // ◀️ 성공 시 구독 페이지로 이동
        } catch (error) {
            console.error('주소 등록 실패:', error);
            alert('주소 등록 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const stepData = [
        { number: 1, isActive: false, bgColor: 'bg-[#c1c1c1]' },
        { number: 2, isActive: true, bgColor: 'bg-[#018941]' },
        { number: 3, isActive: false, bgColor: 'bg-[#c1c1c1]' },
    ];

    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-20">
                <ProgressIndicator stepData={stepData} />
                <main className="mt-10 w-[500px] rounded-lg bg-white p-10 text-center shadow-lg">
                    <h1 className="mb-2 text-3xl font-bold">주소</h1>
                    <p className="mb-8 text-gray-600">
                        배송 받으실 주소를 입력해 주세요
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center space-y-6"
                    >
                        {/* 받는 사람, 상세 주소, 전화번호 입력 필드는 생략 (기존 코드와 동일) */}

                        {/* 우편 번호 필드 */}
                        <div className="w-full text-left">
                            <label
                                htmlFor="postcode"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                우편 번호
                            </label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    id="postcode"
                                    placeholder="우편 번호를 입력하세요"
                                    value={addressInfo.postcode}
                                    onChange={handleInputChange}
                                    className="h-12 flex-1 rounded-md border border-gray-300 px-4"
                                    readOnly
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsPostcodeModalOpen(true)} // ◀️ 클릭 시 모달 열기
                                    className="h-12 rounded-md bg-[#709ECD] px-4 text-white hover:bg-[#5a8ac4]"
                                >
                                    우편 번호 찾기
                                </button>
                            </div>
                        </div>

                        {/* ... 상세주소, 전화번호 input ... */}

                        <button
                            type="submit"
                            className="mt-6 h-12 w-full rounded-lg bg-green-600 font-semibold text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
                            disabled={isLoading}
                        >
                            {isLoading ? '등록 중...' : '등록'}
                        </button>
                    </form>
                </main>
            </div>

            {/* ◀️ 우편번호 검색 모달 */}
            {isPostcodeModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 100,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white',
                            padding: '20px',
                        }}
                    >
                        <DaumPostcode onComplete={handleCompletePostcode} />
                        <button
                            onClick={() => setIsPostcodeModalOpen(false)}
                            style={{ marginTop: '10px' }}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddressPage;
