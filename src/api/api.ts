// api.ts

// The base URL for your API.
const API_BASE_URL = "/api";

// ✅ 'export'를 추가해야 합니다.
export type UserProfileData = {
  name: string;
  phone: string;
  birth_date: string; // "YYYY-MM-DD" 형식
  profile_image_url: string;
};

/**
 * ✅ 'export'를 추가해야 합니다.
 * 내 프로필 정보를 조회합니다.
 * Corresponds to: GET /api/profile/me
 */
export async function getUserProfile(): Promise<UserProfileData> {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const response = await fetch(`${API_BASE_URL}/profile/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile.");
  }

  return response.json();
}

/**
 * ✅ 'export'를 추가해야 합니다.
 * 프로필 이미지를 업로드합니다.
 * Corresponds to: POST /api/profile/me/avatar
 */
export async function uploadProfileImage(
  file: File
): Promise<{ profile_image_url: string }> {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/profile/me/avatar`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload profile image.");
  }

  return response.json();
}


/**
 * ✅ 'export'를 추가해야 합니다.
 * 사용자 프로필 정보를 수정합니다.
 * Corresponds to: PUT /api/profile/me
 */
export async function updateUserProfile(payload: {
  name: string;
  phone: string;
  birth_date: string;
}): Promise<UserProfileData> {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const response = await fetch(`${API_BASE_URL}/profile/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to update profile.');
  }

  return response.json();
}

/**
 * ✅ 'export'를 추가해야 합니다.
 * 사용자를 로그아웃 처리합니다.
 * Corresponds to: POST /api/auth/logout
 */
export async function logoutUser(): Promise<{ message: string }> {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return { message: "No token found, already logged out." };
  }

  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("Logout API call failed, but proceeding with client-side logout.");
  }

  return response.json();
}