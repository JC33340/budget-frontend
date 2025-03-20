import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/auth.utils';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const AuthLayout = () => {
    const navigate = useNavigate();

    const [dbActive, setDbActive] = useState(false);

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

        const wakedb = async () => {
            const result = await fetch(`${import.meta.env.VITE_API}/pingdb`);
            if (!result.ok) {
                return alert('Sorry something went wrong');
            }
            setDbActive(true);
        };

        wakedb();
        checkToken();
    }, []);

    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-y-8 h-full w-full border-2 border-light-blue rounded-lg overflow-hidden">
            <div className="absolute top-4 left-4 border-2 bg-white p-2 rounded-lg">
                <p className="text-blue">Demo account :</p>
                <div className="text-light-gray">
                    <p>Login : demoaccount@demo.com</p>
                    <p>Password : demoaccount123</p>
                </div>
            </div>
            <div className="flex items-end lg:items-center justify-center">
                <div className="flex flex-col lg:items-start items-center gap-y-4">
                    <p className="text-5xl sm:text-7xl font-bold text-blue animate-enter-right">
                        Budgeter
                    </p>
                    <p
                        className=" text-center lg:text-start text-light-gray animate-enter-right"
                        style={{
                            animationDelay: '0.1s',
                            animationFillMode: 'both',
                            animationDirection: 'normal',
                        }}
                    >
                        An app built using ReactJS, ExpressJS and SQL
                    </p>
                </div>
            </div>
            <div
                className="flex items-start lg:items-center justify-center animate-enter-left"
                style={{
                    animationDelay: '0.2s',
                    animationFillMode: 'both',
                    animationDirection: 'normal',
                }}
            >
                <div className="flex flex-col gap-y-4 items-center border-2 border-light-blue rounded-lg p-6 w-70 sm:w-90">
                    {dbActive ? (
                        <Outlet />
                    ) : (
                        <div className="flex flex-col gap-y-4 items-center">
                            <p className="font-semibold text-dark-gray">
                                Loading
                            </p>
                            <AiOutlineLoading3Quarters
                                className="animate-spin fill-dark-gray"
                                size={50}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
