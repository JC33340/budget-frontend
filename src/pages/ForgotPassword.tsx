import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { checkDataEmpty } from '../utils/auth.utils';
import { Link } from 'react-router-dom';

type forgotPasswordFormType = {
    email: string;
};

const ForgotPassword = () => {
    //storing email
    const [email, setEmail] = useState<forgotPasswordFormType>({ email: '' });

    //seeing if email was sent
    const [emailSent, setEmailSent] = useState<boolean>(false);

    //error display storage
    const [error, setError] = useState<string>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({ email: e.target.value });
    };

    //send email to backend to send an email
    const handleClick = async () => {
        try {
            //check if fields are empty
            const isEmpty = checkDataEmpty(email);
            if (isEmpty.isEmpty) {
                return setError(`${isEmpty.field} is empty`);
            }

            //sending api to check forgotten password state and add entry(?)
            const response = await fetch(
                `${import.meta.env.VITE_API}/auth/forgot-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email.email }),
                }
            );
            const responseParsed = await response.json();

            //error handling for fetch
            if (!response.ok) {
                if (response.status === 404) {
                    return setError('Email does not exist');
                } else if (responseParsed.message === 'entry already exists') {
                    return setError(
                        'An email has already been sent to this account.'
                    );
                }
                console.log(responseParsed);
                throw new Error(responseParsed.message);
            }

            //setting email sent true to change the display
            setEmailSent(true);
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    };

    return (
        <>
            {!emailSent ? (
                <div className="flex flex-col items-center gap-y-4">
                    <p className="text-blue font-semibold text-2xl">
                        Forgotten password
                    </p>
                    <div className="w-full">
                        <InputField
                            placeholder="Email"
                            value={email.email}
                            name="email"
                            handleChange={handleChange}
                        />
                    </div>

                    <p className="text-dark-gray">
                        We will send a password reset link to this email
                    </p>
                    {error && (
                        <p className="text-red text-center">* {error} *</p>
                    )}
                    <Button
                        text="Send"
                        handleClick={handleClick}
                        className="w-full"
                    />
                    <Link to="/auth/login" className="text-blue underline">
                        Already have an account?
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col items-center text-center">
                    <p className="text-2xl text-blue font-semibold">
                        Password reset
                    </p>
                    <p className="text-dark-gray">
                        An email has been sent to {email.email}, please follow
                        the link to reset your password
                    </p>
                </div>
            )}
        </>
    );
};

export default ForgotPassword;
