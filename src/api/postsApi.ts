// src/api/postsApi.ts

import axiosInstance from '../shared/api/axiosInstance';

// Post 관련 타입 정의
export interface Post {
    id: string;
    author_id: string;
    author_name: string;
    author_profile_image: string | null;
    content: string;
    image_urls?: string[];
    created_at: string;
    updated_at?: string;
}

export interface CreatePostPayload {
    content: string;
}

export interface CreatePostWithImagesPayload {
    content: string;
    image_urls: string[];
    image_blob_keys: string[];
}

export interface UploadImagesResponse {
    image_urls: string[];
    blob_keys: string[];
    temp_post_id: string;
    storage_type: string;
    message: string;
}

export interface PostsListResponse {
    posts: Post[];
    total_count: number;
    current_page: number;
    total_pages: number;
}

// 소식 목록 조회 (현재 회차)
export const getPosts = async (skip: number = 0, limit: number = 20): Promise<PostsListResponse> => {
    const response = await axiosInstance.get<PostsListResponse>(`/posts/`, {
        params: { skip, limit }
    });
    return response.data;
};

// 텍스트 소식 작성
export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
    const response = await axiosInstance.post<Post>('/posts/', payload);
    return response.data;
};

// 이미지 업로드
export const uploadImages = async (files: File[]): Promise<UploadImagesResponse> => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });

    const response = await axiosInstance.post<UploadImagesResponse>(
        '/posts/upload-images',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return response.data;
};

// 이미지와 함께 소식 작성
export const createPostWithImages = async (payload: CreatePostWithImagesPayload): Promise<Post> => {
    const response = await axiosInstance.post<Post>('/posts/with-images', payload);
    return response.data;
};

// 소식 삭제
export const deletePost = async (postId: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(`/posts/${postId}`);
    return response.data;
};

// 특정 소식 조회
export const getPost = async (postId: string): Promise<Post> => {
    const response = await axiosInstance.get<Post>(`/posts/${postId}`);
    return response.data;
};