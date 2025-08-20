import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// 레이아웃 import
import Layout from '../../shared/ui/Layout';

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
    {
        path: '/',
        element: React.createElement(Layout),
        children: [
            {
                index: true,
                element: React.createElement(Navigate, {
                    to: '/login',
                    replace: true,
                }),
            },
            {
                path: 'login',
                element: React.createElement(LoginPage),
            },
            {
                path: 'profile',
                element: React.createElement(ProfilePage),
            },
            {
                path: 'family/create',
                element: React.createElement(FamilyCreationPage),
            },
            {
                path: 'family/join',
                element: React.createElement(FamilyCodeInputPage),
            },
            {
                path: 'family/group/:groupId?',
                element: React.createElement(FamilyGroupPage),
            },
            {
                path: 'family/manage/:groupId?',
                element: React.createElement(FamilyManagementPage),
            },
            {
                path: 'address/:groupId',
                element: React.createElement(AddressPage),
            },
            {
                path: 'subscription/:groupId',
                element: React.createElement(SubscriptionPage),
            },
            {
                path: 'payment/:subscriptionId',
                element: React.createElement(PaymentPage),
            },
            {
                path: 'api-test',
                element: React.createElement(ApiTestPage),
            },
        ],
    },
]);

export default router;
