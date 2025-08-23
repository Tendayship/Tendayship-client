// src/api/subscriptionApi.ts

import axiosInstance from '../shared/api/axiosInstance';

export interface CreateSubscriptionPayload {
    deliveryDate: string;
}

export interface Subscription {
    subscriptionId: string;
    nextPaymentDate: string;
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