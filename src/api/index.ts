// src/api/index.ts

// Re-export all API functions and types for easy importing
export * from './postsApi';
export * from './issuesApi';
export * from './booksApi';
export * from './familyApi';

// Selective exports to avoid naming conflicts
export {
    createSubscription,
    prepareSubscriptionPayment,
    approvePayment,
    getMySubscriptions,
    getSubscription,
    type CreateSubscriptionPayload,
    type Subscription,
    type MySubscription,
    type PaymentApprovalResponse
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