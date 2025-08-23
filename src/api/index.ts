// src/api/index.ts

// Re-export all API functions and types for easy importing
export * from './postsApi';
export * from './issuesApi';
export * from './booksApi';
export * from './familyApi';

// Selective exports to avoid naming conflicts
export {
    prepareSubscriptionPayment,
    approvePayment,
    getMySubscriptions,
    getSubscription,
    cancelSubscription,
    type SubscriptionCancelRequest,
    type MySubscription,
    type PaymentApprovalResponse,
    type PaymentReadyResponse
} from './subscriptionApi';

export {
    getMyProfile,
    updateProfile,
    getMySubscription,
    getCurrentUserId,
    getRecipientInfo,
    getFamilyMembers,
    getMyGroup,
    removeMember,
    type UserProfileData,
    type UpdateProfilePayload,
    type RecipientData,
    type FamilyMember,
    type MyGroupData
} from './userApi';

export {
    getUserProfile,
    updateUserProfile
} from './api';