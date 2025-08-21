// // src/pages/LoginSuccessPage.js
// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const LoginSuccessPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // KakaoCallback 페이지에서 state로 넘겨준 사용자 정보를 받습니다.
//   const userName = location.state?.user?.nickname || '사용자';

//   useEffect(() => {
//     // 2초 후에 메인 페이지로 이동하는 타이머 설정
//     const timer = setTimeout(() => {
//       navigate('/'); // 메인 페이지 경로로 이동
//     }, 3000); // 2000ms = 2초

//     // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
//         {/* 체크 아이콘 SVG */}
//         <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//         <h1 className="mt-4 text-3xl font-bold text-gray-800">
//           로그인 
//         </h1>
//         <p className="mt-4 text-sm text-gray-500">
//           잠시 후 메인 페이지로 자동 이동합니다...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginSuccessPage;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
axios.defaults.baseURL = isDevelopment
  ? ''
  : 'https://tendayapp-f0a0drg2b6avh8g3.koreacentral-01.azurewebsites.net';

const KakaoCallbackSuccess = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyLoginAndRedirect = async () => {
      try {
        const response = await axios.get('/api/auth/verify');
        
        if (response.data?.valid) {
          navigate('/', { replace: true });
          return;
        }
        
        await axios.post('/api/auth/refresh');
        const retryResponse = await axios.get('/api/auth/verify');
        
        if (retryResponse.data?.valid) {
          navigate('/', { replace: true });
        } else {
          throw new Error('리프레시 후에도 검증 실패');
        }
        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setErrorMessage('인증이 만료되었습니다. 다시 로그인해주세요.');
          } else if (error.response?.status === 500) {
            setErrorMessage('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          } else {
            setErrorMessage(`네트워크 오류가 발생했습니다: ${error.message}`);
          }
        } else {
          setErrorMessage('로그인 처리 중 오류가 발생했습니다.');
        }
        
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyLoginAndRedirect();
  }, [navigate]);

  if (isVerifying) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>로그인 처리 중...</h3>
          <p style={{ color: '#666', fontSize: '14px' }}>잠시만 기다려주세요.</p>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          padding: '30px', 
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          margin: '0 20px'
        }}>
          <div style={{ 
            fontSize: '48px', 
            color: '#dc3545', 
            marginBottom: '20px' 
          }}>
            ⚠️
          </div>
          <h3 style={{ 
            color: '#dc3545', 
            marginBottom: '15px',
            fontSize: '18px'
          }}>
            로그인 실패
          </h3>
          <p style={{ 
            color: '#666', 
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '20px'
          }}>
            {errorMessage}
          </p>
          <p style={{ 
            color: '#999', 
            fontSize: '12px',
            marginBottom: '15px'
          }}>
            3초 후 로그인 페이지로 이동합니다...
          </p>
          <button
            onClick={() => navigate('/login', { replace: true })}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            지금 이동하기
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default KakaoCallbackSuccess;
