type ItemHeadingType = {
    text: string;
    size?: 'md' | 'sm';
};

const ItemHeading = ({ text, size = 'md' }: ItemHeadingType) => {
    return (
        <p
            className={`${size === 'md' ? 'text-3xl' : 'text-2xl'} text-blue font-medium text-center`}
        >
            {text}
        </p>
    );
};

export default ItemHeading;
