import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

type LoginInfoType = {
    username: string;
    password: string;
};

const Login = () => {
    const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleClick = async () => {
        console.log(import.meta.env.VITE_API);
    };

    return (
        <div className="flex flex-col gap-y-4 items-center">
            <span className="text-blue font-semibold text-2xl">Log in</span>
            <InputField
                placeholder="Username / E-mail"
                value={loginInfo.username}
                name="username"
                handleChange={handleChange}
            ></InputField>
            <InputField
                placeholder="Password"
                value={loginInfo.password}
                name="password"
                handleChange={handleChange}
            ></InputField>
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
