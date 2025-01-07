import React from 'react';

type ButtonType = {
    text: string;
    handleClick: () => void;
    className?: string;
};

const Button = ({ text, handleClick, className }: ButtonType) => {
    return (
        <button className={className} onClick={handleClick}>
            {text}
        </button>
    );
};

export default Button;
