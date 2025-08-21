// src/api/familyApi.ts

import axiosInstance from '../shared/api/axiosInstance';

// --- 기존 함수들 (변경 없음) ---

export interface CreateGroupPayload {
    name: string;
}

export interface FamilyGroup {
    id: string;
    name: string;
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
        `/family/group/${groupId}`
    );
    return response.data;
};

// --- [추가된 함수] ---

/**
 * 가족 그룹 가입 요청을 보냅니다.
 * (POST /api/members/join)
 */
export interface JoinGroupPayload {
    inviteCode: string;
    relationship: string;
}

export interface JoinedGroupInfo {
    // API 명세서 응답에 따라 groupId, groupName 등을 포함하도록 정의
    groupId: string;
    groupName: string;
    message: string;
}

export const joinGroupByCode = async (
    payload: JoinGroupPayload
): Promise<JoinedGroupInfo> => {
    const response = await axiosInstance.post<JoinedGroupInfo>(
        '/members/join',
        payload
    );
    return response.data;
};


// --- 카카오페이 관련 함수 (기존과 동일) ---

export interface PaymentReadyResponse {
    tid: string;
    next_redirect_pc_url: string;
    next_redirect_mobile_url: string;
    partner_order_id: string;
}

export const preparePayment = async (): Promise<PaymentReadyResponse> => {
    const response = await axiosInstance.post<PaymentReadyResponse>(
        '/subscription/payment/ready',
        {}
    );
    return response.data;
};