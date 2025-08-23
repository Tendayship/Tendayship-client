// src/api/subscriptionApi.ts

import axiosInstance from '../shared/api/axiosInstance';

export interface CreateSubscriptionPayload {
    deliveryDate: string;
}

export interface Subscription {
    subscriptionId: string;
    nextPaymentDate: string;
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

export const createSubscription = async (
    groupId: string,
    payload: CreateSubscriptionPayload
): Promise<Subscription> => {
    const response = await axiosInstance.post<Subscription>(
        `/subscriptions/${groupId}`,
        payload
    );
    return response.data;
};

// 결제 준비
export const prepareSubscriptionPayment = async (): Promise<PaymentReadyResponse> => {
    const response = await axiosInstance.post<PaymentReadyResponse>(
        '/subscription/payment/ready'
    );
    return response.data;
};

// 결제 승인 (카카오페이 콜백 처리)
export const approvePayment = async (
    pgToken: string,
    partnerOrderId: string
): Promise<PaymentApprovalResponse> => {
    const response = await axiosInstance.post<PaymentApprovalResponse>(
        '/subscription/payment/approve',
        {
            pg_token: pgToken,
            partner_order_id: partnerOrderId
        }
    );
    return response.data;
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
): Promise<{ message: string }> => {
    const response = await axiosInstance.post<{ message: string }>(
        `/subscription/${subscriptionId}/cancel`,
        { reason }
    );
    return response.data;
};