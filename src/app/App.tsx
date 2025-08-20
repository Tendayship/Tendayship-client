import { Routes, Route, Navigate } from 'react-router-dom';


import LoginPage from '../pages/LoginPage';
import KakaoCallbackPage from '../api/auth/kakao/KakaoCallbackPage';
import ProfilePage from '../pages/ProfilePage';
import { ProfileComponent } from '../pages/Mypage.Profile/index';
import { MyFamilyPageComponent } from '../pages/Mypage.Myfamily/index';
import { SubscriptionPageComponent } from '../pages/Mypage.Subscribe/index';
import SubscriptionPage from '../pages/Pay.SubscriptionPage';
import PaymentPage from '../pages/Pay.PayInfor';
import FamilyCreationNamePage from '../pages/FamilyCreation.makenamePage';
import AddressPage from '../pages/FamilyCreation.AddressPage';
import FamilyCreationCompletePage from '../pages/FamilyCreation.Sucess';

// --- 새로 추가한 페이지 ---
import LoginSuccessPage from '../pages/LoginSuccessPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* --- 로그인 성공 페이지 라우트 추가 --- */}
            <Route path="/login/success" element={<LoginSuccessPage />} />

            <Route path="/auth/kakao/callback" element={<KakaoCallbackPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/mypage/profile" element={<ProfileComponent />} />
            <Route path="/mypage/family" element={<MyFamilyPageComponent />} />
            <Route path="/mypage/subscription" element={<SubscriptionPageComponent />} />
            
            {/* --- 결제 관련 라우트 --- */}
            <Route path="/subscription/:groupId" element={<SubscriptionPage />} />
            <Route path="/payment/:groupId" element={<PaymentPage />} />

            {/* --- 가족 그룹 생성 플로우 라우트 --- */}
            <Route path="/family/create-name" element={<FamilyCreationNamePage />} />
            <Route path="/family/create-address/:groupId" element={<AddressPage />} />
            <Route path="/family/create-complete/:groupId" element={<FamilyCreationCompletePage />} />
        </Routes>
    );
};

export default App;
