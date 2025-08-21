import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const KakaoCallbackFail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [reason, setReason] = useState('');

  useEffect(() => {
    const errorReason = searchParams.get('reason') || 'unknown';
    setReason(errorReason);
    
    // 5초 후 자동으로 로그인 페이지로 이동
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  const getErrorMessage = (reason: string) => {
    switch (reason) {
      case 'no_code':
        return '인증 코드를 받지 못했습니다.';
      case 'invalid_account':
        return '유효하지 않은 카카오 계정입니다.';
      case 'server_error':
        return '서버 오류가 발생했습니다.';
      default:
        return '로그인 중 오류가 발생했습니다.';
    }
  };

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
          X
        </div>
        <h3 style={{ 
          color: '#dc3545', 
          marginBottom: '15px',
          fontSize: '18px'
        }}>
          카카오 로그인 실패
        </h3>
        <p style={{ 
          color: '#666', 
          fontSize: '14px',
          lineHeight: '1.5',
          marginBottom: '10px'
        }}>
          {getErrorMessage(reason)}
        </p>
        <p style={{ 
          color: '#999', 
          fontSize: '12px',
          marginBottom: '20px'
        }}>
          오류 코드: {reason}
        </p>
        <p style={{ 
          color: '#999', 
          fontSize: '12px',
          marginBottom: '15px'
        }}>
          5초 후 로그인 페이지로 이동합니다...
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
          다시 로그인하기
        </button>
      </div>
    </div>
  );
};

export default KakaoCallbackFail;
