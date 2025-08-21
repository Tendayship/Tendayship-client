import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../shared/api/axiosInstance';
import { useAuth } from '../../../contexts/useAuth';

const KakaoCallbackSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyLoginAndRedirect = async () => {
      try {
        // Use the unified auth system
        await login();
        
        // If login succeeds, navigate to home
        navigate('/', { replace: true });
        
      } catch (error) {
        console.error('Login verification failed:', error);
        
        // Fallback: try manual verification
        try {
          const response = await axiosInstance.get('/auth/verify');
          
          if (response.data?.valid) {
            navigate('/', { replace: true });
            return;
          }
          
          await axiosInstance.post('/auth/refresh');
          const retryResponse = await axiosInstance.get('/auth/verify');
          
          if (retryResponse.data?.valid) {
            navigate('/', { replace: true });
          } else {
            throw new Error('리프레시 후에도 검증 실패');
          }
          
        } catch (fallbackError) {
          console.error('Fallback verification failed:', fallbackError);
          
          if (typeof fallbackError === 'object' && fallbackError !== null && 'response' in fallbackError) {
            const errorResponse = fallbackError as { response?: { status?: number } };
            if (errorResponse.response?.status === 401) {
              setErrorMessage('인증이 만료되었습니다. 다시 로그인해주세요.');
            } else if (errorResponse.response?.status === 500) {
              setErrorMessage('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            } else {
              setErrorMessage(`네트워크 오류가 발생했습니다.`);
            }
          } else {
            setErrorMessage('로그인 처리 중 오류가 발생했습니다.');
          }
          
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
        }
      } finally {
        setIsVerifying(false);
      }
    };

    verifyLoginAndRedirect();
  }, [navigate, login]);

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
            !
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
