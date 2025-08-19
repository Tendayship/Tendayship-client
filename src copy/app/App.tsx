import { RouterProvider } from 'react-router-dom';
import router from './provider/ReactRouter.router';

export default function App() {
    return <RouterProvider router={router} />;
}
