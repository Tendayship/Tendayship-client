import { createBrowserRouter } from 'react-router-dom';
import ApiTestPage from '../../pages/test/api-test-page';

const router = createBrowserRouter([
    { path: '/', element: <ApiTestPage /> },
    // 필요하면 여기에 라우트 추가
    // { path: '/test', element: <ApiTestPage /> },
]);

export default router;
