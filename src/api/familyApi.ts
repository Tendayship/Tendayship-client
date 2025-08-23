// src/api/familyApi.ts

import axiosInstance from '../shared/api/axiosInstance';

// 가족 그룹 생성 관련 타입들
export interface FamilyGroupSetupPayload {
    group_name: string;
    deadline_type: 'SECOND_SUNDAY' | 'FOURTH_SUNDAY' | 'LAST_DAY_OF_MONTH';
    leader_relationship: 'DAUGHTER' | 'SON' | 'DAUGHTER_IN_LAW' | 'SON_IN_LAW' | 'GRANDCHILD' | 'OTHER';
    recipient_name: string;
    recipient_address: string;
    recipient_address_detail: string;
    recipient_postal_code: string;
    recipient_phone: string;
}

export interface FamilyGroupSetupResponse {
    message: string;
    group: {
        id: string;
        group_name: string;
        invite_code: string;
        deadline_type: string;
        status: string;
    };
    recipient: {
        id: string;
        name: string;
        address: string;
    };
    issue: {
        id: string;
        issue_number: number;
        deadline_date: string;
        status: string;
    };
}

export interface MyGroupResponse {
    id: string;
    group_name: string;
    invite_code: string;
    deadline_type: string;
    status: string;
    created_at: string;
    member_count: number;
    current_issue?: {
        id: string;
        issue_number: number;
        deadline_date: string;
        status: string;
    };
}

export interface ValidateInviteCodeResponse {
    valid: boolean;
    group_name?: string;
    member_count?: number;
}

export interface DeleteGroupResponse {
    message: string;
    subscription_cancel: {
        cancelled: boolean;
        subscription_id?: string;
        payment_cancel_status?: string;
        refund_amount?: number;
        reason?: string;
    };
    subscription_deleted: boolean;
    pending_books_count: number;
}

// --- 기존 함수들 (변경 없음) ---

export interface CreateGroupPayload {
    name: string;
    relationship?: string;
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

// --- 새로 추가된 API 함수들 ---

/**
 * 가족 그룹 초기 설정 (완전한 그룹 생성)
 * (POST /api/family/setup)
 */
export const setupFamilyGroup = async (
    payload: FamilyGroupSetupPayload
): Promise<FamilyGroupSetupResponse> => {
    const response = await axiosInstance.post<FamilyGroupSetupResponse>(
        '/family/setup',
        payload
    );
    return response.data;
};

/**
 * 내 가족 그룹 정보 조회 (향상된 버전)
 * (GET /api/family/my-group)
 */
export const getMyGroupDetails = async (): Promise<MyGroupResponse> => {
    const response = await axiosInstance.get<MyGroupResponse>('/family/my-group');
    return response.data;
};

/**
 * 초대 코드 검증
 * (GET /api/members/validate-invite/{invite_code})
 */
export const validateInviteCode = async (inviteCode: string): Promise<ValidateInviteCodeResponse> => {
    const response = await axiosInstance.get<ValidateInviteCodeResponse>(
        `/members/validate-invite/${inviteCode}`
    );
    return response.data;
};

/**
 * 그룹 리더가 자신의 그룹 삭제
 * (DELETE /api/family/my-group)
 */
export const deleteMyGroup = async (force: boolean = false): Promise<DeleteGroupResponse> => {
    const response = await axiosInstance.delete<DeleteGroupResponse>(
        '/family/my-group',
        { params: { force } }
    );
    return response.data;
};