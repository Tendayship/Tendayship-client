// src/api/subscriptionApi.ts

import axiosInstance from '../shared/api/axiosInstance';

export interface SubscriptionCancelRequest {
    reason: string;
}

export interface SubscriptionCancelResponse {
    message: string;
    cancelled_at: string;
    refund_amount: number;
    payment_cancel_status: string;
}

export interface MySubscription {
    id: string;
    status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
    start_date: string;
    next_billing_date: string;
    amount: number;
    payment_method: string;
    group_id: string;
    group_name: string;
}

export interface PaymentReadyResponse {
    tid: string;
    next_redirect_pc_url: string;
    next_redirect_mobile_url: string;
    partner_order_id: string;
}

export interface PaymentApprovalResponse {
    aid: string;
    tid: string;
    cid: string;
    sid?: string;
    partner_order_id: string;
    partner_user_id: string;
    payment_method_type: string;
    amount: {
        total: number;
        tax_free: number;
        vat: number;
        point: number;
        discount: number;
    };
    item_name: string;
    item_code?: string;
    quantity: number;
    created_at: string;
    approved_at: string;
}

// Removed - use prepareSubscriptionPayment instead

// 결제 준비
export const prepareSubscriptionPayment = async (): Promise<PaymentReadyResponse> => {
    const response = await axiosInstance.post<PaymentReadyResponse>(
        '/subscription/payment/ready'
    );
    return response.data;
};

// 결제 승인 (카카오페이 콜백 처리) - GET 방식으로 변경
export const approvePayment = async (
    pgToken: string,
    tempId: string
): Promise<void> => {
    // This should be handled by redirect, not direct API call
    // Backend handles: GET /subscription/approve?pg_token=xxx&temp_id=xxx
    const url = `/subscription/approve?pg_token=${pgToken}&temp_id=${tempId}`;
    window.location.href = url;
};

// 내 구독 목록 조회
export const getMySubscriptions = async (): Promise<MySubscription[]> => {
    const response = await axiosInstance.get<MySubscription[]>('/subscription/my');
    return response.data;
};

// 특정 구독 상세 정보
export const getSubscription = async (subscriptionId: string): Promise<MySubscription> => {
    const response = await axiosInstance.get<MySubscription>(`/subscription/${subscriptionId}`);
    return response.data;
};

// 구독 취소
export const cancelSubscription = async (
    subscriptionId: string,
    reason: string
): Promise<SubscriptionCancelResponse> => {
    const response = await axiosInstance.post<SubscriptionCancelResponse>(
        `/subscription/${subscriptionId}/cancel`,
        { reason }
    );
    return response.data;
};

// 구독 히스토리 조회
export const getSubscriptionHistory = async (): Promise<SubscriptionHistoryResponse[]> => {
    const response = await axiosInstance.get<SubscriptionHistoryResponse[]>('/subscription/my/history');
    return response.data;
};

export interface SubscriptionHistoryResponse {
    id: string;
    subscription_id: string;
    status: string;
    amount: number;
    created_at: string;
    notes?: string;
}

// 결제 취소 페이지로 리다이렉트
export const redirectToCancel = (): void => {
    window.location.href = '/subscription/cancel';
};

// 결제 실패 페이지로 리다이렉트
export const redirectToFail = (): void => {
    window.location.href = '/subscription/fail';
};