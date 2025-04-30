type ButtonType = {
    text: string;
    handleClick: () => void;
    className?: string;
};

const Button = ({ text, handleClick, className }: ButtonType) => {
    return (
        <button
            data-testid="button-testid"
            className={`p-2 border-2 border-blue rounded-md bg-blue text-white hover:bg-white hover:text-blue transition-all ease-in-out ${className}`}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default Button;
