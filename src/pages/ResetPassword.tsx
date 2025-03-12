import InputField from '../components/InputField';
import { useState } from 'react';
import Button from '../components/Button';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { checkDataEmpty } from '../utils/auth.utils';

type resetPasswordFormType = {
    password: string;
    passwordConfirmation: string;
};

const ResetPassword = () => {
    //storing form information
    const [formInfo, setFormInfo] = useState<resetPasswordFormType>({
        password: '',
        passwordConfirmation: '',
    });

    //storing error
    const [error, setError] = useState<string>('');

    //has password been reset
    const [isReset, setIsReset] = useState<boolean>(false);

    //getting params and search params
    const token = useParams().token;

    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');

    //handling form change
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormInfo((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    //handling on submit
    const handleClick = async () => {
        const isEmpty = checkDataEmpty(formInfo);
        if (isEmpty.isEmpty) {
            return setError(`${isEmpty.field} is empty`);
        }
        if (formInfo.password != formInfo.passwordConfirmation) {
            return setError('Passwords do not match');
        }
        if (!email || !token) {
            return setError('Email or Token is invalid');
        }

        const changePassword = await fetch(
            `${import.meta.env.VITE_API}/auth/reset-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    token: token,
                    password: formInfo.password,
                    passwordConfirmation: formInfo.passwordConfirmation,
                }),
            }
        );
        const changePasswordParsed = await changePassword.json();

        //error handling
        if (!changePassword.ok) {
            if (changePassword.status === 404) {
                return setError(changePasswordParsed.message);
            } else if (changePassword.status === 400) {
                return setError(changePasswordParsed.message);
            }
        }

        //redirect back to login page
        setIsReset(true);
    };

    return (
        <>
            {!isReset ? (
                <div className="flex flex-col gap-y-4 items-center w-full">
                    <p className="text-2xl text-blue font-semibold">
                        Reset Password
                    </p>
                    <div className='flex flex-col w-full gap-y-4'>
                        <InputField
                            placeholder="Password"
                            value={formInfo.password}
                            handleChange={onChange}
                            name="password"
                            type="password"
                        />
                        <InputField
                            placeholder="Password Confirmation"
                            value={formInfo.passwordConfirmation}
                            handleChange={onChange}
                            name="passwordConfirmation"
                            type="password"
                        />
                    </div>
                    {error && <p className="text-red">* {error} *</p>}
                    <Button
                        text="Reset password"
                        className="w-full"
                        handleClick={handleClick}
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center gap-y-4 text-center">
                    <p className="text-2xl font-semibold text-blue">
                        Password has been successfully reset
                    </p>
                    <p className="text-dark-gray">
                        Click{' '}
                        <Link to="/auth/login" className="text-blue underline">
                            here
                        </Link>{' '}
                        to return to login page
                    </p>
                </div>
            )}
        </>
    );
};

export default ResetPassword;
