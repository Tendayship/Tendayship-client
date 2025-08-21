// fail/cancel 페이지 컴포넌트
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        alert('결제가 실패하였습니다. 웹으로 돌아가 다시 결제해주세요.');
        navigate('/payment');
    }, [navigate]);

    return null;
};

export default PaymentFailPage;
