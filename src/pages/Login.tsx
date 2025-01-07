import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

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
        <div>
            <InputField
                placeholder="Username"
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
            <Button text="Login" handleClick={handleClick}></Button>
        </div>
    );
};

export default Login;
