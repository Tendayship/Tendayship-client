import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import KakaoCallbackPage from '../api/auth/kakao/KakaoCallbackPage';
// import RegisterPage from './RegisterPage';
// import HomePage from './HomePage';
import ProfilePage from '../pages/ProfilePage';
import FamilyCreate from '../pages/FamilyCreationPage';

const App = () => {
  return (    
    <Routes>
      {/* 루트 접속 시 로그인 페이지로 리다이렉트 */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 인증 관련 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/kakao/callback" element={<KakaoCallbackPage />} />

      {/* 프로필 및 가족 생성 페이지 */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/family/create" element={<FamilyCreate />} />
    </Routes>
  );
};

export default App;