import { useNavigate } from 'react-router-dom';
// import Header from '../../shared/ui/Header'; // 공통 헤더

const PaymentFailPage = () => {
    const navigate = useNavigate();

    // 이전 페이지로 돌아가는 함수
    const handleGoBack = () => {
        navigate(-1); // 브라우저의 '뒤로 가기' 기능과 동일
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#f1f1f1]">
            {/* <Header /> */}
            <main className="flex flex-grow items-center justify-center p-4">
                <div className="w-full max-w-md rounded-lg bg-white p-10 text-center shadow-lg">
                    <h1 className="text-3xl font-bold text-red-600">😥</h1>
                    <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                        결제에 실패했습니다
                    </h2>
                    <p className="mt-4 text-gray-600">
                        결제 처리 중 오류가 발생했습니다.
                        <br />
                        잠시 후 다시 시도해주시고, 문제가 지속되면 고객센터로 문의해주세요.
                    </p>
                    <button
                        onClick={handleGoBack}
                        className="mt-8 h-12 w-full rounded-lg bg-gray-600 font-semibold text-white transition-colors hover:bg-gray-700"
                    >
                        다시 시도하기
                    </button>
                </div>
            </main>
        </div>
    );
};

export default PaymentFailPage;
