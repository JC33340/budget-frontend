import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/auth.utils';

const AuthLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('budgeter_jwt');

        //if token does not exist
        if (!jwt) return;

        const checkToken = async () => {
            const isValid = await validateToken(jwt);
            if (isValid) {
                return navigate('/');
            }
        };

        checkToken();
    }, []);

    return (
        <div className="grid grid-cols-2 h-full w-full border-2 border-light-blue rounded-lg overflow-hidden">
            <div className="flex items-center justify-center">
                <div className="flex flex-col gap-y-4">
                    <p className="text-7xl font-bold text-blue animate-enter-right">Budgeter</p>
                    <p className="text-light-gray animate-enter-right" style={{animationDelay:'0.1s', animationFillMode:'both',animationDirection:'normal'}}>
                        An app built using ReactJS, ExpressJS and SQL
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center animate-enter-left"  style={{animationDelay:'0.2s', animationFillMode:'both',animationDirection:'normal'}}>
                <div className="flex flex-col gap-y-4 items-center border-2 border-light-blue rounded-lg p-6 ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
