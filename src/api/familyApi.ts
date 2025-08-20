// src/api/familyApi.ts
import axiosInstance from '../shared/api/axiosInstance';

// API 요청 시 보낼 데이터의 타입
export interface CreateGroupPayload {
    name: string;
}

// API 응답으로 받을 데이터의 타입 (생성된 그룹의 ID를 받는 것이 일반적)
export interface FamilyGroup {
    id: number;
    name: string;
    inviteCode: string;
}

/**
 * 새로운 가족 그룹을 생성하는 API
 * @param payload - 생성할 그룹 정보 (이름)
 * @returns Promise<FamilyGroup> - 생성된 그룹 정보
 */
export const createFamilyGroup = async (
    payload: CreateGroupPayload
): Promise<FamilyGroup> => {
    // 매트릭스: POST /family/create
    const response = await axiosInstance.post<FamilyGroup>(
        '/family/create',
        payload
    );
    return response.data;
};

export interface JoinGroupPayload {
    inviteCode: string;
    relationship: string; // "DAUGHTER", "SON" 등
}

// 그룹 가입 성공 시 응답 타입 (가입한 그룹 정보)
export interface JoinedGroupInfo {
    groupId: number;
    groupName: string;
}

/**
 * 초대 코드를 사용해 가족 그룹에 가입하는 API
 * @param payload - 초대 코드와 관계 정보
 * @returns Promise<JoinedGroupInfo> - 가입한 그룹 정보
 */
export const joinGroupByCode = async (
    payload: JoinGroupPayload
): Promise<JoinedGroupInfo> => {
    // 매트릭스: POST /family/join (이 엔드포인트가 코드 검증 및 가입을 모두 처리한다고 가정)
    // 실제 백엔드 구현에 따라 엔드포인트나 payload가 달라질 수 있습니다.
    const response = await axiosInstance.post<JoinedGroupInfo>(
        '/family/join',
        payload
    );
    return response.data;
};

export interface RecipientPayload {
    name: string;
    postcode: string;
    detailAddress: string; // 상세 주소
    phoneNumber: string;
}

/**
 * 특정 가족 그룹에 책자를 받을 분(수신자) 정보를 등록하는 API
 * @param groupId - 수신자를 등록할 가족 그룹의 ID
 * @param payload - 등록할 수신자 정보
 */
export const registerRecipient = async (
    groupId: string,
    payload: RecipientPayload
): Promise<void> => {
    // 매트릭스: POST /family/{group_id}/recipient
    await axiosInstance.post(`/family/${groupId}/recipient`, payload);
};

export interface Subscription {
    subscriptionId: number;
    groupId: number;
    status: string;
    nextPaymentDate: string;
}

// 구독 생성 시 필요한 payload 타입 정의
export interface CreateSubscriptionPayload {
    // 예시 필드: 실제로 필요한 필드로 수정하세요
    deliveryDate: string;
}

/**
 * 특정 가족 그룹에 대한 신규 구독을 생성하는 API
 * @param groupId - 구독을 생성할 가족 그룹의 ID
 * @param payload - 구독 정보 (예: 수령일)
 * @returns Promise<Subscription> - 생성된 구독 정보
 */
export const createSubscription = async (
    groupId: string,
    payload: CreateSubscriptionPayload
): Promise<Subscription> => {
    // 매트릭스: POST /subscriptions
    // 실제 API 경로가 /groups/{groupId}/subscriptions 와 같은 형태일 수 있습니다.
    // 여기서는 요청 body에 groupId를 포함한다고 가정하겠습니다.
    const response = await axiosInstance.post<Subscription>('/subscriptions', {
        ...payload,
        groupId, // groupId를 요청 본문에 추가
    });
    return response.data;
};
