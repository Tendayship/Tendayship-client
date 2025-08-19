import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// 레이아웃 import
import Layout from '../../shared/ui/Layout';

// 페이지 imports
import MainPage from '../../pages/main/main-page';
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

const router = createBrowserRouter([
    {
        path: '/',
        element: React.createElement(Layout),
        children: [
            {
                index: true,
                element: React.createElement(MainPage),
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
