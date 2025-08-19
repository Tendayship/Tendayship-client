// The base URL for your API. You might store this in an environment variable.
const API_BASE_URL = '/api';

/**
 * Defines the data structure for the user's profile.
 * The profileImageUrl is optional as it's handled by a separate upload process.
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
 * @param {File} file - The image file to be uploaded.
 * @returns {Promise<{ profile_image_url: string }>} - A promise that resolves with the URL of the uploaded image.
 */
export async function uploadProfileImage(
    file: File
): Promise<{ profile_image_url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/profile/me/avatar`, {
        method: 'POST',
        // 'Content-Type' is automatically set to 'multipart/form-data' by the browser when using FormData.
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload profile image.');
    }

    return response.json();
}

/**
 * Registers or updates a user's profile information.
 * Corresponds to: PUT /api/profile/me
 * @param {Omit<UserProfilePayload, 'profileImageUrl'>} payload - The user profile data (name, dob, phone).
 * @returns {Promise<Response>} - A promise that resolves with the server's response.
 */
export async function registerProfile(
    payload: Omit<UserProfilePayload, 'profileImageUrl'>
) {
    // Convert 6-digit dob (yymmdd) to YYYY-MM-DD format for the API.
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
    };

    const response = await fetch(`${API_BASE_URL}/profile/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
        // You can handle specific error messages from the server's response body if needed.
        const errorData = await response
            .json()
            .catch(() => ({ message: 'An unknown error occurred.' }));
        throw new Error(errorData.message || 'Failed to register profile.');
    }

    return response.json();
}
