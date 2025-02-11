import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { validateToken } from '../utils/auth.utils';

//component to check authentication of user
const CheckAuth = () => {
    const navigate = useNavigate();

    //checking authentication status via api
    useEffect(() => {
        //getting token from local storage
        const localjwt = localStorage.getItem('budgeter_jwt');

        //if token does not exist navigate back to login page
        if (!localjwt) {
            return navigate('/auth/login');
        }

        const checkAuth = async () => {
            const result = await validateToken(localjwt);
            if (!result) {
                navigate('/auth/login');
            }
        };

        checkAuth();
    });

    return <Outlet />;
};

export default CheckAuth;
