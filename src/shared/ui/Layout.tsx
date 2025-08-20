import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Outlet />
        </div>
    );
};

export default Layout;
