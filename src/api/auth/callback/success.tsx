import { useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import axios from 'axios';



const KakaoCallbackPage = () => {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();



  // 리프레시 토큰으로 액세스 토큰을 요청하는 비동기 함수

  // 'refreshToken' 매개변수에 ': string' 타입을 명시

  const getAccessToken = async (refreshToken : string) => {

    try {

      const response = await axios.post(

        'http://localhost:8000/auth/token',

        {

          refreshToken: refreshToken,

        }

      );



      const accessToken = response.data.accessToken;



      if (accessToken) {

        console.log('새로운 액세스 토큰을 받았습니다:', accessToken);

        localStorage.setItem('accessToken', accessToken);

        navigate('/');

      } else {

        console.error('액세스 토큰을 받지 못했습니다.');

        navigate('/login/fail');

      }

    } catch (error) {

      console.error('액세스 토큰 요청 중 오류 발생:', error);

      localStorage.clear();

      navigate('/login/fail');

    }

  };



  useEffect(() => {

    const refreshToken = searchParams.get('refreshToken');



    if (refreshToken) {

      console.log('리프레시 토큰을 받았습니다:', refreshToken);

      localStorage.setItem('refreshToken', refreshToken);

      getAccessToken(refreshToken);

    } else {

      console.error('리프레시 토큰이 없습니다. 로그인 실패!');

      navigate('/login/fail');

    }

  }, [navigate, searchParams]);



  return <div>로그인 처리 중...</div>;

};



export default KakaoCallbackPage; 