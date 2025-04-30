type ItemWrapperType = {
    children: React.ReactNode;
};

const ItemWrapper = ({ children }: ItemWrapperType) => {
    return (
        <div
            className="border-2 border-light-gray p-4 rounded-lg w-full h-full"
            data-testid="itemWrapper-testid"
        >
            {children}
        </div>
    );
};

export default ItemWrapper;
