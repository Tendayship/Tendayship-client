import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// 컴포넌트 imports
import Layout from '../../shared/ui/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import ConditionalRoute from '../../components/ConditionalRoute';

// 페이지 imports
import ApiTestPage from '../../pages/test/api-test-page';
import LoginPage from '../../pages/LoginPage';
import ProfilePage from '../../pages/ProfilePage';
import FamilyCreationPage from '../../pages/FamilyCreationPage';
import FamilyCodeInputPage from '../../pages/FamilyCodeinput';
import FamilyGroupPage from '../../pages/FamilyGroupPage';
import FamilyManagementPage from '../../pages/FamilyManagementPage';
import AddressPage from '../../pages/AddressPage';
import SubscriptionPage from '../../pages/SubscriptionPage';
import PaymentPage from '../../pages/PayInfor';
import KakaoCallbackPage from '../../api/auth/kakao/KakaoCallbackPage';

const router = createBrowserRouter([
    // 카카오 콜백은 Layout 밖에서 처리
    {
        path: '/kakao/callback',
        element: React.createElement(KakaoCallbackPage),
    },
    // 로그인 페이지도 Layout 밖에서 처리
    {
        path: '/login',
        element: React.createElement(LoginPage),
    },
    {
        path: '/',
        element: React.createElement(Layout),
        children: [
            {
                index: true,
                // 조건부 렌더링: 로그인 상태에 따라 랜딩 페이지 또는 메인 페이지
                element: React.createElement(ConditionalRoute),
            },
            {
                path: 'profile',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(ProfilePage),
                }),
            },
            {
                path: 'family/create',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(FamilyCreationPage),
                }),
            },
            {
                path: 'family/join',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(FamilyCodeInputPage),
                }),
            },
            {
                path: 'family/group/:groupId?',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(FamilyGroupPage),
                }),
            },
            {
                path: 'family/manage/:groupId?',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(FamilyManagementPage),
                }),
            },
            {
                path: 'address/:groupId',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(AddressPage),
                }),
            },
            {
                path: 'subscription/:groupId',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(SubscriptionPage),
                }),
            },
            {
                path: 'payment/:subscriptionId',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(PaymentPage),
                }),
            },
            {
                path: 'api-test',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(ApiTestPage),
                }),
            },
        ],
    },
]);

export default router;
