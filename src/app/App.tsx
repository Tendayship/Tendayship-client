// src/App.tsx

import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; // Outlet을 import
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("1. 로그인 상태 체크 시작!"); // 이제 이 로그가 보일 겁니다.

    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/auth/me', {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUser(response.data);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  // Outlet은 Router.tsx에 정의된 자식 컴포넌트(Layout, LoginPage 등)가
  // 렌더링될 위치를 의미합니다.
  return <Outlet />;
}

export default App;