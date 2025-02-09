import InputField from '../components/InputField';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

type signUpInfoType = {
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
};

const SignUp = () => {
    //state to store form information
    const [signUpInfo, setSignUpInfo] = useState<signUpInfoType>({
        email: '',
        username: '',
        password: '',
        passwordConfirmation: '',
    });

    //handling form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpInfo((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    //handle button sign up
    const handleClick = async () => {
        try {
            const signup = await fetch(
                `${import.meta.env.VITE_API}/auth/signup`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(signUpInfo),
                }
            );
            const signupParsed = await signup.json();
            console.log(signupParsed);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="flex flex-col items-center gap-y-4">
            <p className="text-blue text-2xl font-semibold">Sign up</p>
            <div className="flex flex-col gap-y-4">
                <InputField
                    placeholder="E-mail"
                    name="email"
                    value={signUpInfo.email}
                    handleChange={handleChange}
                />
                <InputField
                    placeholder="Username"
                    name="username"
                    value={signUpInfo.username}
                    handleChange={handleChange}
                />
                <InputField
                    placeholder="Password"
                    name="password"
                    value={signUpInfo.password}
                    handleChange={handleChange}
                    type="password"
                />
                <InputField
                    placeholder="Password confirmation"
                    name="passwordConfirmation"
                    value={signUpInfo.passwordConfirmation}
                    handleChange={handleChange}
                />
            </div>
            <Button
                text="Create account"
                handleClick={handleClick}
                className="w-full"
            />
            <Link to="/auth/login" className="text-blue underline">
                Already have an account?
            </Link>
        </div>
    );
};

export default SignUp;
