// src/api/adminApi.ts

import axiosInstance from '../shared/api/axiosInstance';

// Admin API Types
export interface AdminGroup {
    id: string;
    group_name: string;
    leader_email: string;
    member_count: number;
    status: string;
    created_at: string;
    subscription_status?: string;
    current_issue?: {
        id: string;
        issue_number: number;
        deadline_date: string;
        status: string;
    };
}

export interface AdminGroupsResponse {
    groups: AdminGroup[];
    total: number;
    page: number;
    size: number;
}

export interface GroupFeedPost {
    id: string;
    content: string;
    author_name: string;
    created_at: string;
    image_urls?: string[];
}

export interface GroupFeedResponse {
    group_info: {
        id: string;
        name: string;
        recipient_name?: string;
    };
    issue_id: string;
    posts: GroupFeedPost[];
}

export interface PendingBook {
    id: string;
    issue_id: string;
    issue_number: number;
    group_name: string;
    recipient_name: string;
    pdf_url?: string;
    production_status: 'pending' | 'in_progress' | 'completed';
    delivery_status: 'pending' | 'shipping' | 'delivered';
    created_at: string;
    shipped_at?: string;
    delivered_at?: string;
}

export interface BookStatusUpdate {
    production_status?: 'pending' | 'in_progress' | 'completed';
    delivery_status?: 'pending' | 'shipping' | 'delivered';
    shipped_at?: string;
    delivered_at?: string;
}

export interface DeleteGroupResponse {
    message: string;
    group_name: string;
    subscription_cancel: {
        cancelled: boolean;
        subscription_id?: string;
        payment_cancel_status?: string;
        refund_amount?: number;
        reason?: string;
    };
    subscription_deleted: boolean;
    pending_books_count: number;
    admin_email: string;
}

export interface DeleteMemberResponse {
    message: string;
    member_id: string;
    group_name: string;
    admin_email: string;
}

export interface PDFGenerationResponse {
    message: string;
    pdf_url: string;
    issue_id: string;
}

// Admin API Functions

/**
 * Get all family groups with pagination (Admin only)
 */
export const getAdminGroups = async (
    skip: number = 0,
    limit: number = 20
): Promise<AdminGroupsResponse> => {
    const response = await axiosInstance.get<AdminGroupsResponse>(
        '/admin/groups',
        { params: { skip, limit } }
    );
    return response.data;
};

/**
 * Get specific group's feed (Admin only)
 */
export const getGroupFeed = async (
    groupId: string,
    issueId?: string
): Promise<GroupFeedResponse> => {
    const params = issueId ? { issue_id: issueId } : {};
    const response = await axiosInstance.get<GroupFeedResponse>(
        `/admin/groups/${groupId}/feed`,
        { params }
    );
    return response.data;
};

/**
 * Generate PDF for specific issue (Admin only)
 */
export const generateBookPDF = async (
    issueId: string
): Promise<PDFGenerationResponse> => {
    const response = await axiosInstance.post<PDFGenerationResponse>(
        `/admin/books/generate/${issueId}`
    );
    return response.data;
};

/**
 * Get all pending books (Admin only)
 */
export const getPendingBooks = async (): Promise<PendingBook[]> => {
    const response = await axiosInstance.get<PendingBook[]>('/admin/books/pending');
    return response.data;
};

/**
 * Update book status (Admin only)
 */
export const updateBookStatus = async (
    bookId: string,
    statusUpdate: BookStatusUpdate
): Promise<PendingBook> => {
    const response = await axiosInstance.put<PendingBook>(
        `/admin/books/${bookId}/status`,
        statusUpdate
    );
    return response.data;
};

/**
 * Delete group as admin (Admin only)
 */
export const adminDeleteGroup = async (
    groupId: string,
    force: boolean = true
): Promise<DeleteGroupResponse> => {
    const response = await axiosInstance.delete<DeleteGroupResponse>(
        `/admin/groups/${groupId}`,
        { params: { force } }
    );
    return response.data;
};

/**
 * Remove member as admin (Admin only)
 */
export const adminRemoveMember = async (
    memberId: string
): Promise<DeleteMemberResponse> => {
    const response = await axiosInstance.delete<DeleteMemberResponse>(
        `/admin/members/${memberId}`
    );
    return response.data;
};

/**
 * Check if current user has admin privileges
 */
export const checkAdminAccess = async (): Promise<boolean> => {
    try {
        await axiosInstance.get('/admin/groups?limit=1');
        return true;
    } catch {
        return false;
    }
};