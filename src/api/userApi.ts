const API_BASE_URL = '/api';

/**
 * Defines the data structure for the user's profile.
 */
export type UserProfilePayload = {
<<<<<<< Updated upstream
  name: string;
  dob: string; // Expected as 6 digits (e.g., "990102") from the form
  phone: string;
  profileImageUrl?: string; // Optional image URL
=======
    name: string;
    dob: string; // "990102"
    phone: string;
    profileImageUrl?: string;
>>>>>>> Stashed changes
};

/**
 * Uploads a user's profile image to the server.
 * Corresponds to: POST /api/profile/me/avatar
 */
<<<<<<< Updated upstream
export async function uploadProfileImage(file: File): Promise<{ profile_image_url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/profile/me/avatar`, {
    method: 'POST',
    // 'Content-Type' is automatically set to 'multipart/form-data' by the browser when using FormData.
    body: formData,
  });
=======
export async function uploadProfileImage(
    file: File
): Promise<{ profile_image_url: string }> {
    // 1. localStorage에서 토큰 가져오기
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('Authentication token not found.');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/profile/me/avatar`, {
        method: 'POST',
        // ✅ 변경점: 인증 헤더 추가
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
>>>>>>> Stashed changes

  if (!response.ok) {
    throw new Error('Failed to upload profile image.');
  }

  return response.json();
}

/**
 * Registers or updates a user's profile information.
 * Corresponds to: PUT /api/profile/me
 */
<<<<<<< Updated upstream
export async function registerProfile(payload: Omit<UserProfilePayload, 'profileImageUrl'>) {
  // Convert 6-digit dob (yymmdd) to YYYY-MM-DD format for the API.
  const yearPrefix = parseInt(payload.dob.substring(0, 2), 10) > 50 ? '19' : '20';
  const year = yearPrefix + payload.dob.substring(0, 2);
  const month = payload.dob.substring(2, 4);
  const day = payload.dob.substring(4, 6);
  const birth_date = `${year}-${month}-${day}`;
=======
export async function registerProfile(
    payload: Omit<UserProfilePayload, 'profileImageUrl'>
) {
    // 1. localStorage에서 토큰 가져오기
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('Authentication token not found.');
    }

    // Convert 6-digit dob to YYYY-MM-DD format
    const yearPrefix =
        parseInt(payload.dob.substring(0, 2), 10) > 50 ? '19' : '20';
    const year = yearPrefix + payload.dob.substring(0, 2);
    const month = payload.dob.substring(2, 4);
    const day = payload.dob.substring(4, 6);
    const birth_date = `${year}-${month}-${day}`;
>>>>>>> Stashed changes

  const apiPayload = {
    name: payload.name,
    phone: payload.phone,
    birth_date: birth_date,
  };

<<<<<<< Updated upstream
  const response = await fetch(`${API_BASE_URL}/profile/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(apiPayload),
  });

  if (!response.ok) {
    // You can handle specific error messages from the server's response body if needed.
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
    throw new Error(errorData.message || 'Failed to register profile.');
  }

  return response.json();
=======
    const response = await fetch(`${API_BASE_URL}/profile/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // ✅ 변경점: 인증 헤더 추가
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
        const errorData = await response
            .json()
            .catch(() => ({ message: 'An unknown error occurred.' }));
        throw new Error(errorData.message || 'Failed to register profile.');
    }

    return response.json();
>>>>>>> Stashed changes
}