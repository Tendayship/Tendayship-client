import { useState, useCallback } from 'react';
import type { DaumPostcodeData } from 'react-daum-postcode';

export interface PostcodeResult {
  /** 우편번호 */
  postalCode: string;
  /** 기본 주소 (도로명 주소 또는 지번 주소) */
  address: string;
  /** 상세 주소용 추가 정보 (법정동, 건물명 등) */
  addressDetail: string;
  /** 원본 데이터 */
  rawData: DaumPostcodeData;
}

export interface UsePostcodeReturn {
  /** 우편번호 검색 모달 열림/닫힘 상태 */
  isModalOpen: boolean;
  /** 우편번호 검색 모달 열기 */
  openModal: () => void;
  /** 우편번호 검색 모달 닫기 */
  closeModal: () => void;
  /** 주소 검색 완료 핸들러 */
  handleComplete: (data: DaumPostcodeData) => PostcodeResult;
}

export interface UsePostcodeProps {
  /** 주소 검색 완료 시 실행될 콜백 함수 */
  onComplete?: (result: PostcodeResult) => void;
}

/**
 * Daum 우편번호 서비스를 위한 커스텀 훅
 */
export const usePostcode = ({ onComplete }: UsePostcodeProps = {}): UsePostcodeReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleComplete = useCallback((data: DaumPostcodeData): PostcodeResult => {
    // 도로명 주소를 우선으로, 없으면 지번 주소 사용
    const mainAddress = data.roadAddress || data.address;
    
    // 상세 주소 정보 구성
    const addressDetails = [];
    if (data.bname && data.addressType === 'R') {
      addressDetails.push(data.bname);
    }
    if (data.buildingName) {
      addressDetails.push(data.buildingName);
    }
    
    const addressDetailString = addressDetails.length > 0 ? ` (${addressDetails.join(', ')})` : '';

    const result: PostcodeResult = {
      postalCode: data.zonecode,
      address: mainAddress,
      addressDetail: addressDetailString,
      rawData: data
    };

    // 외부 콜백 실행
    if (onComplete) {
      onComplete(result);
    }

    // 모달 자동 닫기
    setIsModalOpen(false);

    return result;
  }, [onComplete]);

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleComplete
  };
};