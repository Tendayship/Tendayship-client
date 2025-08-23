import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// 컴포넌트 imports
import Layout from '../../shared/ui/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
// import ConditionalRoute from '../../components/ConditionalRoute'; // Not used anymore

// 페이지 imports
import AuthTest from '../../components/AuthTest';
import { HealthCheck } from '../../components/HealthCheck';
import LoginPage from '../../pages/LoginPage';
import ProfilePage from '../../pages/ProfilePage';
import FamilyCreationPage from '../../pages/FamilyCreation.Sucess';
import FamilyCodeInputPage from '../../pages/FamilyCodeinput';
import FamilyGroupPage from '../../pages/FamilyGroupPage';
import FamilyManagementPage from '../../pages/FamilyManagementPage';
import AddressPage from '../../pages/AddressPage';
import PaymentPage from '../../pages/PayInfor';
import KakaoCallbackPage from '../../api/auth/kakao/KakaoCallbackPage';
import RegisterPage from '../../pages/RegisterPage';
import LoginSuccessPage from '../../pages/LoginSuccessPage';
import LoginFailPage from '../../pages/Login.fail';
import ProfileComponent from '../../pages/Mypage.Profile/index';
import MyFamilyPageComponent from '../../pages/Mypage.Myfamily/index';
import SubscriptionPageComponent from '../../pages/Mypage.Subscribe/index';
import SubscriptionPage from '../../pages/Pay.SubscriptionPage';
import FamilyCreationNamePage from '../../pages/FamilyCreation.makenamePage';

// New page imports
import MainPage from '../../pages/main/main-page';
import CreatePostPage from '../../pages/CreatePostPage';
import BooksPage from '../../pages/BooksPage';
import FamilyGroupSetupPage from '../../pages/FamilyGroupSetupPage';
import PaymentPageNew from '../../pages/PaymentPage';

// Admin page imports
import AdminRoute from '../../components/admin/AdminRoute';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import AdminGroups from '../../pages/admin/AdminGroups';
import AdminBooks from '../../pages/admin/AdminBooks';
import AdminMembers from '../../pages/admin/AdminMembers';
import GroupFeed from '../../pages/admin/GroupFeed';

const router = createBrowserRouter([
    // 카카오 콜백, 백엔드 리다이렉트 경로는 Layout 밖에서 처리
    {
        path: '/kakao/callback',
        element: React.createElement(KakaoCallbackPage),
    },
    {
        path: '/auth/callback/success',
        element: React.createElement(KakaoCallbackPage),
    },
    {
        path: '/auth/callback/fail',
        element: React.createElement(KakaoCallbackPage),
    },
    // 백엔드가 실제로 리다이렉트하는 경로 추가
    {
        path: '/api/auth/kakao/callback',
        element: React.createElement(KakaoCallbackPage),
    },

    // 로그인, 회원가입 관련 페이지도 Layout 밖에서 처리
    { path: '/login', element: React.createElement(LoginPage) },
    { path: '/register', element: React.createElement(RegisterPage) }, // ✨ 추가된 경로
    { path: '/login/success', element: React.createElement(LoginSuccessPage) }, // ✨ 추가된 경로
    { path: '/login/fail', element: React.createElement(LoginFailPage) }, // ✨ 추가된 경로

    // 기본 레이아웃을 사용하는 페이지들
    {
        path: '/',
        element: React.createElement(Layout),
        children: [
            {
                index: true,
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(MainPage),
                }),
            },
            {
                path: 'profile',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(ProfilePage),
                }),
            },
            // --- 가족 관련 페이지 ---
            {
                path: 'family/create',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(FamilyGroupPage),
                }),
            },
            {
                path: 'family/create/setup',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(FamilyGroupSetupPage),
                }),
            },
            {
                path: 'family/create/success',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(FamilyCreationPage),
                }),
            },
            {
                // ✨ 추가된 경로
                path: 'family/create/name',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(FamilyCreationNamePage),
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
            // --- 소식 관련 페이지 ---
            {
                path: 'posts/create',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(CreatePostPage),
                }),
            },
            {
                path: 'posts',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(MainPage), // 임시로 메인 페이지 사용
                }),
            },
            // --- 책자 관련 페이지 ---
            {
                path: 'books',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(BooksPage),
                }),
            },
            // --- 마이페이지 섹션 ---
            {
                // ✨ 추가된 경로
                path: 'mypage/profile',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(ProfileComponent),
                }),
            },
            {
                // ✨ 추가된 경로
                path: 'mypage/family',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(MyFamilyPageComponent),
                }),
            },
            {
                // ✨ 추가된 경로
                path: 'mypage/subscription',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(SubscriptionPageComponent),
                }),
            },
            // --- 주소 및 구독/결제 ---
            {
                path: 'address/:groupId',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(AddressPage),
                }),
            },
            {
                path: 'subscription',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(SubscriptionPageComponent),
                }),
            },
            {
                path: 'subscription/:groupId',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(SubscriptionPage),
                }),
            },
            {
                path: 'payment',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(PaymentPageNew),
                }),
            },
            {
                path: 'payment/:subscriptionId',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement(PaymentPage),
                }),
            },
            // --- 건강 상태 확인 페이지 ---
            {
                path: 'health-check',
                element: React.createElement(ProtectedRoute, {
                    children: React.createElement('div', { className: 'container mx-auto p-6' },
                        React.createElement('h1', { className: 'text-2xl font-bold mb-4' }, '시스템 상태 확인'),
                        React.createElement(HealthCheck)
                    ),
                }),
            },
            {
                path: 'auth-test',
                element: React.createElement(AuthTest),
            },
            // --- 관리자 페이지 ---
            {
                path: 'admin',
                element: React.createElement(AdminRoute, {
                    children: React.createElement(AdminDashboard),
                }),
            },
            {
                path: 'admin/groups',
                element: React.createElement(AdminRoute, {
                    children: React.createElement(AdminGroups),
                }),
            },
            {
                path: 'admin/groups/:groupId/feed',
                element: React.createElement(AdminRoute, {
                    children: React.createElement(GroupFeed),
                }),
            },
            {
                path: 'admin/books',
                element: React.createElement(AdminRoute, {
                    children: React.createElement(AdminBooks),
                }),
            },
            {
                path: 'admin/members',
                element: React.createElement(AdminRoute, {
                    children: React.createElement(AdminMembers),
                }),
            },
        ],
    },
]);

export default router;
