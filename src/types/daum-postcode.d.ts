declare module 'react-daum-postcode' {
  export interface DaumPostcodeData {
    /** 주소 */
    address: string;
    /** 주소 타입 (R: 도로명, J: 지번) */
    addressType: 'R' | 'J';
    /** 법정동명 */
    bname: string;
    /** 건물명 */
    buildingName: string;
    /** 우편번호 */
    zonecode: string;
    /** 시도 */
    sido: string;
    /** 시군구 */
    sigungu: string;
    /** 읍면동 */
    roadname?: string;
    /** 건물번호본 */
    buildingCode?: string;
    /** 지번주소 */
    jibunAddress?: string;
    /** 도로명주소 */
    roadAddress?: string;
  }

  export interface DaumPostcodeProps {
    /** 주소검색 완료 시 실행될 콜백함수 */
    onComplete: (data: DaumPostcodeData) => void;
    /** 우편번호검색창의 가로크기 */
    width?: number | string;
    /** 우편번호검색창의 세로크기 */  
    height?: number | string;
    /** 애니메이션 효과 */
    animation?: boolean;
    /** 검색 후 자동닫기 */
    autoClose?: boolean;
    /** 기본 검색어 */
    defaultQuery?: string;
    /** 테마 설정 */
    theme?: {
      bgColor?: string;
      searchBgColor?: string;
      contentBgColor?: string;
      pageBgColor?: string;
      textColor?: string;
      queryTextColor?: string;
      postcodeTextColor?: string;
      emphTextColor?: string;
      outlineColor?: string;
    };
    /** 검색 조건 */
    submitMode?: boolean;
    /** 검색어 입력란 존재 여부 */
    hideMapBtn?: boolean;
    /** 지도 버튼 숨김 여부 */
    hideEngBtn?: boolean;
    /** 영문 주소 버튼 숨김 여부 */
    alwaysShowEngAddr?: boolean;
  }

  const DaumPostcode: React.ComponentType<DaumPostcodeProps>;
  export default DaumPostcode;
}