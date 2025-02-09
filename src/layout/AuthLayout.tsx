import { Outlet, NavLink } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="grid grid-cols-2 h-full w-full border-2 border-light-blue rounded-lg">
            <div className="flex items-center justify-center">
                <div className="flex flex-col gap-y-4">
                    <p className="text-7xl font-bold text-blue">Budgeter</p>
                    <p className="text-light-gray">
                        An app built using ReactJS, ExpressJS and SQL
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex flex-col gap-y-4 items-center border-2 border-light-blue rounded-lg p-6 ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
