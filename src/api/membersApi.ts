// src/api/membersApi.ts

import axiosInstance from '../shared/api/axiosInstance';

export interface FamilyMember {
    id: string;
    user_id: string;
    user_name: string;
    user_profile_image?: string;
    member_relationship: 'DAUGHTER' | 'SON' | 'DAUGHTER_IN_LAW' | 'SON_IN_LAW' | 'GRANDCHILD' | 'OTHER';
    role: 'LEADER' | 'MEMBER';
    joined_at: string;
}

export interface ValidateInviteResponse {
    valid: boolean;
    group_name?: string;
    member_count?: number;
}

export interface JoinGroupRequest {
    invite_code: string;
    relationship: 'DAUGHTER' | 'SON' | 'DAUGHTER_IN_LAW' | 'SON_IN_LAW' | 'GRANDCHILD' | 'OTHER';
}

export interface JoinGroupResponse {
    message: string;
    group_id: string;
    group_name: string;
    member_id: string;
}

/**
 * 초대 코드 검증
 * (GET /api/members/validate-invite/{invite_code})
 */
export const validateInviteCode = async (inviteCode: string): Promise<ValidateInviteResponse> => {
    const response = await axiosInstance.get<ValidateInviteResponse>(
        `/members/validate-invite/${inviteCode}`
    );
    return response.data;
};

/**
 * 가족 그룹 가입
 * (POST /api/members/join)
 */
export const joinGroup = async (data: JoinGroupRequest): Promise<JoinGroupResponse> => {
    const response = await axiosInstance.post<JoinGroupResponse>('/members/join', data);
    return response.data;
};

/**
 * 그룹 멤버 목록 조회
 * (GET /api/members/my-group/members)
 */
export const getGroupMembers = async (): Promise<FamilyMember[]> => {
    const response = await axiosInstance.get<FamilyMember[]>('/members/my-group/members');
    return response.data;
};

/**
 * 멤버 제거 (리더만 가능)
 * (DELETE /api/members/{member_id})
 */
export const removeMember = async (memberId: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(`/members/${memberId}`);
    return response.data;
};

/**
 * 내 멤버십 정보 조회
 * (GET /api/members/my-membership)
 */
export const getMyMembership = async (): Promise<FamilyMember> => {
    const response = await axiosInstance.get<FamilyMember>('/members/my-membership');
    return response.data;
};