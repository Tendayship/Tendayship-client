// src/api/userApi.ts

import axiosInstance from '../shared/api/axiosInstance';

// --- ✅ [추가] 나의 가족 페이지에 필요한 타입 정의 ---

// 받는 분 정보 타입
export interface RecipientData {
    id: string;
    name: string;
    birth_date?: string;
    phone: string;
    address: string;
    address_detail: string;
    profile_image_url?: string;
}

// 가족 멤버 정보 타입
export interface FamilyMember {
    id: string; // 멤버 ID
    user_id: string;
    user_name: string;
    user_profile_image: string | null;
    member_relationship: string;
    role: 'LEADER' | 'MEMBER';
    joined_at: string;
}

// 나의 그룹 정보 타입
export interface MyGroupData {
    id: string;
    group_name: string;
    invite_code: string;
    status: string;
}


// --- 기존 타입 정의 (UserProfileData, SubscriptionData 등) ---

export interface UserProfileData {
    id: string;
    email: string;
    name: string;
    phone: string;
    birth_date: string;
    profile_image_url: string | null;
}

export interface UpdateProfilePayload {
    name: string;
    phone: string;
    birth_date: string;
}

export interface SubscriptionData {
    id: string;
    status: 'active' | 'cancelled' | 'expired';
    start_date: string;
    next_billing_date: string;
    payment_info: string;
    payment_records: PaymentRecord[];
}

export interface PaymentRecord {
    id: string;
    payment_date: string;
    plan_name: string;
    payment_method: string;
    amount: number;
}


// --- API 함수들 ---

/**
 * 내 프로필 정보를 조회합니다. (GET /api/profile/me)
 */
export const getMyProfile = async (): Promise<UserProfileData> => {
    const response = await axiosInstance.get<UserProfileData>('/profile/me');
    return response.data;
};

/**
 * 사용자 프로필 정보를 수정합니다. (PUT /api/profile/me)
 */
export const updateProfile = async (
    payload: UpdateProfilePayload
): Promise<UserProfileData> => {
    const response = await axiosInstance.put<UserProfileData>('/profile/me', payload);
    return response.data;
};

/**
 * 사용자 프로필 이미지를 업로드합니다. (POST /api/profile/me/avatar)
 */
export const uploadProfileImage = async (
    file: File
): Promise<{ profile_image_url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post<{ profile_image_url: string }>(
        '/profile/me/avatar',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
};

/**
 * 로그아웃을 요청합니다. (POST /api/auth/logout)
 */
export const logoutUser = async (): Promise<{ message: string }> => {
    const response = await axiosInstance.post<{ message: string }>('/auth/logout');
    return response.data;
};

/**
 * 내 구독 정보를 조회합니다. (GET /api/subscription/my)
 */
export const getMySubscription = async (): Promise<SubscriptionData> => {
    const response = await axiosInstance.get<SubscriptionData[]>('/subscription/my');
    return response.data[0];
};

/**
 * 구독을 해지합니다. (POST /api/subscription/{subscription_id}/cancel)
 */
export const cancelSubscription = async (
    subscriptionId: string,
    reason: string
): Promise<void> => {
    await axiosInstance.post(`/subscription/${subscriptionId}/cancel`, null, {
        params: { reason },
    });
};

/**
 * 현재 로그인된 사용자의 ID를 반환합니다.
 */
export const getCurrentUserId = async (): Promise<string> => {
    const profile = await getMyProfile();
    return profile.id;
};


// --- ✅ [추가] 나의 가족 페이지에 필요한 API 함수들 ---

/**
 * 받는 분 정보를 조회합니다. (GET /api/family/recipient)
 */
export const getRecipientInfo = async (): Promise<RecipientData> => {
    const response = await axiosInstance.get<RecipientData>('/family/recipient');
    return response.data;
};

/**
 * 내 그룹의 멤버 목록을 조회합니다. (GET /api/members/my-group/members)
 */
export const getFamilyMembers = async (): Promise<FamilyMember[]> => {
    const response = await axiosInstance.get<FamilyMember[]>('/members/my-group/members');
    return response.data;
};

/**
 * 내 가족 그룹 정보를 조회합니다. (GET /api/family/my-group)
 */
export const getMyGroup = async (): Promise<MyGroupData> => {
    const response = await axiosInstance.get<MyGroupData>('/family/my-group');
    return response.data;
};

/**
 * 그룹 멤버를 내보냅니다. (DELETE /api/members/{member_id})
 */
export const removeMember = async (memberId: string): Promise<void> => {
    await axiosInstance.delete(`/members/${memberId}`);
};