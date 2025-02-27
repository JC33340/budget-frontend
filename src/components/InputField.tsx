import React from 'react';

type InputFieldType = {
    placeholder: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | number | undefined;
    className?: string;
    name: string;
    type?: string;
    maxLength?: number;
};

const InputField = ({
    placeholder,
    handleChange,
    value,
    className,
    name,
    type = '',
    maxLength,
}: InputFieldType) => {
    return (
        <div className="flex flex-col">
            <label className="text-dark-gray">{placeholder}:</label>
            <input
                className={`w-30 sm:w-80 border-1 border-dark-gray rounded-md p-2 ${className}`}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                name={name}
                type={type}
                maxLength={maxLength}
            ></input>
        </div>
    );
};

export default InputField;
