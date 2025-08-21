import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// 🔴 파일 이름이 KakaoCallbackPage 이더라도, 내용은 반드시
//    React 컴포넌트 형식(함수가 JSX를 return)이어야 합니다.
const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('token');

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      navigate('/mypage/profile'); // 로그인 후 이동할 페이지
    } else {
      navigate('/login'); // 실패 시 로그인 페이지로
    }
  }, [navigate, searchParams]); 

  // ⭐️ 중요: 화면에 무언가 표시하는 return 구문이 반드시 있어야 합니다.
  return <div>로그인 처리 중...</div>;
};

// ⭐️ 중요: export default가 되어 있어야 합니다.
export default KakaoCallbackPage;