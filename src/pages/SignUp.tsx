import InputField from '../components/InputField';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { checkDataEmpty } from '../utils/auth.utils';

type signUpInfoType = {
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
};

const SignUp = () => {
    //state to store form information
    const [signUpInfo, setSignUpInfo] = useState<signUpInfoType>({
        email: '',
        name: '',
        password: '',
        passwordConfirmation: '',
    });

    //navigation
    const navigate = useNavigate();

    //errors for display
    const [error, setError] = useState<string>();

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
            //checking data validity

            //checking if any fields are empty
            const { isEmpty, field } = checkDataEmpty(signUpInfo);
            if (isEmpty) {
                throw new Error(`${field} is empty`);
            }

            //checking if password match
            if (signUpInfo.password != signUpInfo.passwordConfirmation) {
                throw new Error('Passwords do not match');
            }

            //sending data to backend for signup
            const signup = await fetch(
                `${import.meta.env.VITE_API}/auth/signup`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(signUpInfo),
                }
            );
            const signupParsed = await signup.json();
            if (!signup.ok) {
                throw new Error(signupParsed.message);
            }
            localStorage.setItem('budgeter_jwt', signupParsed.jwt);
            navigate('/auth/login');
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                setError(e.message);
            }
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
                    placeholder="Name"
                    name="name"
                    value={signUpInfo.name}
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
                    type="password"
                />
            </div>
            {error && <p className="text-red">* {error} *</p>}
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
