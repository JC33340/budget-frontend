import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { validateToken } from '../utils/auth.utils';
import Header from '../components/Header';

//component to check authentication of user
const CheckAuth = () => {
    const navigate = useNavigate();

    //function to set email

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
                return navigate('/auth/login');
            }
        };

        checkAuth();
    });

    return (
        <div>
            <Header />
            <div className="py-4">
                <Outlet />
            </div>
        </div>
    );
};

export default CheckAuth;
