// src/api/familyApi.ts
import axiosInstance from '../shared/api/axiosInstance';

// --- 기존 함수들 (변경 없음) ---

export interface CreateGroupPayload {
    name: string;
}

export interface FamilyGroup {
    id: string; // API 명세서에 따라 string (uuid) 일 수 있습니다. number로 되어있다면 수정해주세요.
    name:string;
    inviteCode: string;
}

export const createFamilyGroup = async (
    payload: CreateGroupPayload
): Promise<FamilyGroup> => {
    const response = await axiosInstance.post<FamilyGroup>(
        '/family/create', 
        payload
    );
    return response.data;
};

export interface RecipientPayload {
    name: string;
    postcode: string;
    detailAddress: string;
    phoneNumber: string;
}

export const registerRecipient = async (
    groupId: string,
    payload: RecipientPayload
): Promise<void> => {
    await axiosInstance.post(`/family/${groupId}/recipient`, payload);
};

export const getGroupDetails = async (
    groupId: string
): Promise<FamilyGroup> => {
    const response = await axiosInstance.get<FamilyGroup>(
        `/family/group/${groupId}` // 실제 백엔드 경로에 맞춰주세요.
    );
    return response.data;
};


// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ [이 부분이 추가/수정되어야 합니다] ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

// 카카오페이 결제 준비 API 응답 타입
export interface PaymentReadyResponse {
    tid: string;
    next_redirect_pc_url: string;
    next_redirect_mobile_url: string;
    partner_order_id: string;
}

/**
 * 구독 결제를 준비하는 API (카카오페이)
 * @description API 명세서의 POST /api/subscription/payment/ready 를 호출합니다.
 * @returns Promise<PaymentReadyResponse> - 카카오페이 결제 준비 정보
 */
export const preparePayment = async (): Promise<PaymentReadyResponse> => {
    const response = await axiosInstance.post<PaymentReadyResponse>(
        '/subscription/payment/ready',
        {} // 요청 본문이 비어있음
    );
    return response.data;
};
