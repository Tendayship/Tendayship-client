// src/api/booksApi.ts

import axiosInstance from '../shared/api/axiosInstance';

// Book 관련 타입 정의
export interface Book {
    id: string;
    issue_id: string;
    issue_number: number;
    group_id: string;
    title: string;
    status: 'PENDING' | 'GENERATING' | 'COMPLETED' | 'FAILED';
    pdf_url?: string;
    created_at: string;
    completed_at?: string;
    download_count: number;
}

export interface BooksListResponse {
    books: Book[];
    total_count: number;
}

export interface RegenerateBookResponse {
    message: string;
    book_id: string;
    status: string;
}

// 내 책자 목록 조회
export const getMyBooks = async (): Promise<BooksListResponse> => {
    const response = await axiosInstance.get<BooksListResponse>('/books/');
    return response.data;
};

// 특정 책자 상세 정보 조회
export const getBook = async (bookId: string): Promise<Book> => {
    const response = await axiosInstance.get<Book>(`/books/${bookId}`);
    return response.data;
};

// 책자 PDF 다운로드 (Blob으로 반환)
export const downloadBookPdf = async (bookId: string): Promise<Blob> => {
    const response = await axiosInstance.get(`/books/${bookId}/download`, {
        responseType: 'blob'
    });
    return response.data;
};

// 책자 PDF 다운로드 URL 가져오기
export const getBookDownloadUrl = async (bookId: string): Promise<{ download_url: string }> => {
    const response = await axiosInstance.get<{ download_url: string }>(`/books/${bookId}/download-url`);
    return response.data;
};

// 책자 PDF 재생성 요청 (리더만 가능)
export const regenerateBook = async (bookId: string): Promise<RegenerateBookResponse> => {
    const response = await axiosInstance.post<RegenerateBookResponse>(`/books/${bookId}/regenerate`);
    return response.data;
};

// 특정 회차의 책자 상태 확인
export const getBookByIssue = async (issueId: string): Promise<Book | null> => {
    try {
        const response = await axiosInstance.get<Book>(`/books/issue/${issueId}`);
        return response.data;
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response: { status: number } };
            if (axiosError.response?.status === 404) {
                return null; // 해당 회차의 책자가 아직 생성되지 않음
            }
        }
        throw error;
    }
};

// 책자 생성 진행률 확인
export const getBookProgress = async (bookId: string): Promise<{ progress: number; status: string }> => {
    const response = await axiosInstance.get<{ progress: number; status: string }>(`/books/${bookId}/progress`);
    return response.data;
};