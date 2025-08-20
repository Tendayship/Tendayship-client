// src/api/userApi.ts - Axios 기반으로 통합
import axiosInstance from '../shared/api/axiosInstance';

/**
 * Defines the data structure for the user's profile.
 */
export type UserProfilePayload = {
    name: string;
    dob: string; // Expected as 6 digits (e.g., "990102") from the form
    phone: string;
    profileImageUrl?: string; // Optional image URL
};

/**
 * Uploads a user's profile image to the server.
 * Corresponds to: POST /api/profile/me/avatar
 */
export async function uploadProfileImage(
    file: File
): Promise<{ profile_image_url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    // Axios는 자동으로 토큰을 추가하므로 수동 설정 불필요
    const response = await axiosInstance.post<{ profile_image_url: string }>(
        '/profile/me/avatar',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return response.data;
}

/**
 * Registers or updates a user's profile information.
 * Corresponds to: PUT /api/profile/me
 */
export async function registerProfile(
    payload: UserProfilePayload
): Promise<{ success: boolean; data?: unknown }> {
    // Convert 6-digit dob to YYYY-MM-DD format
    const yearPrefix =
        parseInt(payload.dob.substring(0, 2), 10) > 50 ? '19' : '20';
    const year = yearPrefix + payload.dob.substring(0, 2);
    const month = payload.dob.substring(2, 4);
    const day = payload.dob.substring(4, 6);
    const birth_date = `${year}-${month}-${day}`;

    const apiPayload = {
        name: payload.name,
        phone: payload.phone,
        birth_date: birth_date,
        profileImageUrl: payload.profileImageUrl,
    };

    // Axios는 자동으로 토큰과 JSON 헤더를 추가
    const response = await axiosInstance.put('/profile/me', apiPayload);

    return response.data;
}
