import React from 'react';

type InputFieldType = {
    placeholder: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    className?: string;
    name: string;
    type?: string;
};

const InputField = ({
    placeholder,
    handleChange,
    value,
    className,
    name,
    type = '',
}: InputFieldType) => {
    return (
        <div className="flex flex-col">
            <label className="text-dark-gray">{placeholder}:</label>
            <input
                className={`w-80 border-1 border-dark-gray rounded-md p-2 ${className}`}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                name={name}
                type={type}
            ></input>
        </div>
    );
};

export default InputField;
