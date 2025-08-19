import React from 'react';

import { createBrowserRouter } from 'react-router-dom';
import ApiTestPage from '../../pages/test/api-test-page';
import MainPage from '../../pages/main/main-page';

const router = createBrowserRouter([
    {
        path: '/api-test',
        element: React.createElement(ApiTestPage),
    },
    {
        path: '/',
        element: React.createElement(MainPage),
    },
]);

export default router;
