import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <div className="p-4 h-screen bg-linear-to-b from-[#CCE6FF] to-white to-40% bg-fixed font-roboto-flex">
            <Outlet />
        </div>
    );
};

export default AppLayout;

//[#e7e7e7]
