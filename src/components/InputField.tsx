import React from 'react';

type InputFieldType = {
    placeholder: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    className?: string;
    name:string
};

const InputField = ({
    placeholder,
    handleChange,
    value,
    className,
    name
}: InputFieldType) => {
    return (
        <input
            className={`border-[1px] border-black rounded-sm ${className}`}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            name={name}
        ></input>
    );
};

export default InputField;
