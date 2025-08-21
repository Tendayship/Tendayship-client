import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// 컴포넌트 imports
import Layout from '../../shared/ui/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import ConditionalRoute from '../../components/ConditionalRoute';

// 페이지 imports
import ApiTestPage from '../../pages/test/api-test-page';
import AuthTest from '../../components/AuthTest';
import LoginPage from '../../pages/LoginPage';
import ProfilePage from '../../pages/ProfilePage';
import FamilyCreationPage from '../../pages/FamilyCreation.Sucess';
import FamilyCodeInputPage from '../../pages/FamilyCodeinput';
import FamilyGroupPage from '../../pages/FamilyGroupPage';
import FamilyManagementPage from '../../pages/FamilyManagementPage';
import AddressPage from '../../pages/AddressPage';
import PaymentPage from '../../pages/PayInfor';
import KakaoCallbackPage from '../../api/auth/callback/success';
import RegisterPage from '../../pages/RegisterPage';
import LoginSuccessPage from '../../pages/LoginSuccessPage';
import LoginFailPage from '../../pages/Login.fail';
import ProfileComponent from '../../pages/Mypage.Profile/index';
import MyFamilyPageComponent from '../../pages/Mypage.Myfamily/index';
import SubscriptionPageComponent from '../../pages/Mypage.Subscribe/index';
import SubscriptionPage from '../../pages/Pay.SubscriptionPage';
import FamilyCreationNamePage from '../../pages/FamilyCreation.makenamePage';

const router = createBrowserRouter([
  // 카카오 콜백, 백엔드 리다이렉트 경로는 Layout 밖에서 처리
  { path: '/kakao/callback', element: React.createElement(KakaoCallbackPage) },
  { path: '/auth/callback/success', element: React.createElement(KakaoCallbackPage) },
  { path: '/auth/callback/fail', element: React.createElement(KakaoCallbackPage) },

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
        element: React.createElement(ConditionalRoute),
      },
      {
        path: 'profile',
        element: React.createElement(ProtectedRoute, { children: React.createElement(ProfilePage) }),
      },
      // --- 가족 관련 페이지 ---
      {
        path: 'family/create',
        element: React.createElement(ProtectedRoute, { children: React.createElement(FamilyCreationPage) }),
      },
      { // ✨ 추가된 경로
        path: 'family/create/name',
        element: React.createElement(ProtectedRoute, { children: React.createElement(FamilyCreationNamePage) }),
      },
      {
        path: 'family/join',
        element: React.createElement(ProtectedRoute, { children: React.createElement(FamilyCodeInputPage) }),
      },
      {
        path: 'family/group/:groupId?',
        element: React.createElement(ProtectedRoute, { children: React.createElement(FamilyGroupPage) }),
      },
      {
        path: 'family/manage/:groupId?',
        element: React.createElement(ProtectedRoute, { children: React.createElement(FamilyManagementPage) }),
      },
      // --- 마이페이지 섹션 ---
      { // ✨ 추가된 경로
        path: 'mypage/profile',
        element: React.createElement(ProtectedRoute, { children: React.createElement(ProfileComponent) }),
      },
      { // ✨ 추가된 경로
        path: 'mypage/my-family',
        element: React.createElement(ProtectedRoute, { children: React.createElement(MyFamilyPageComponent) }),
      },
      { // ✨ 추가된 경로
        path: 'mypage/subscription',
        element: React.createElement(ProtectedRoute, { children: React.createElement(SubscriptionPageComponent) }),
      },
      // --- 주소 및 구독/결제 ---
      {
        path: 'address/:groupId',
        element: React.createElement(ProtectedRoute, { children: React.createElement(AddressPage) }),
      },
      {
        path: 'subscription/:groupId',
        element: React.createElement(ProtectedRoute, { children: React.createElement(SubscriptionPage) }),
      },
      {
        path: 'payment/:subscriptionId',
        element: React.createElement(ProtectedRoute, { children: React.createElement(PaymentPage) }),
      },
      // --- 테스트 페이지 ---
      {
        path: 'api-test',
        element: React.createElement(ProtectedRoute, { children: React.createElement(ApiTestPage) }),
      },
      {
        path: 'auth-test',
        element: React.createElement(AuthTest),
      },
    ],
  },
]);

export default router;