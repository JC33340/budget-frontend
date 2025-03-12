import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { checkDataEmpty } from '../utils/auth.utils';
import { useNavigate } from 'react-router-dom';

type LoginInfoType = {
    email: string;
    password: string;
};

const Login = () => {
    //storing form information for login
    const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
        email: '',
        password: '',
    });

    //navigation
    const navigate = useNavigate();

    //storing error message
    const [error, setError] = useState<string>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleClick = async () => {
        //check data validity
        try {
            const { isEmpty, field } = checkDataEmpty(loginInfo);
            if (isEmpty) {
                throw new Error(`${field} is empty`);
            }
            const login = await fetch(
                `${import.meta.env.VITE_API}/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                    },
                    body: JSON.stringify({
                        email: loginInfo.email,
                        password: loginInfo.password,
                    }),
                }
            );
            const loginParsed = await login.json();
            if (!login.ok) {
                throw new Error(loginParsed.message);
            }
            localStorage.setItem('budgeter_jwt', loginParsed.jwt);
            navigate('/');
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    return (
        <div className="flex flex-col gap-y-4 items-center w-full">
            <span className="text-blue font-semibold text-2xl">Log in</span>
            <div className='flex flex-col gap-y-4 w-full'>
                <InputField
                    placeholder="E-mail"
                    value={loginInfo.email}
                    name="email"
                    handleChange={handleChange}
                ></InputField>
                <InputField
                    placeholder="Password"
                    value={loginInfo.password}
                    name="password"
                    handleChange={handleChange}
                    type="password"
                ></InputField>
            </div>

            {error && <p className="text-red">* {error} *</p>}
            <Button
                text="Login"
                handleClick={handleClick}
                className="w-full"
            ></Button>
            <Link to="/auth/signUp" className="underline text-blue">
                Need an account?
            </Link>
            <Link to="/auth/forgot-password" className="underline text-blue">
                Forgotten your password?
            </Link>
        </div>
    );
};

export default Login;
