import React from 'react';

import { createBrowserRouter } from 'react-router-dom';
import ApiTestPage from '../../pages/test/api-test-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(ApiTestPage),
  },
]);

export default router;
