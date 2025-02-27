import { IoMdArrowDropdown } from 'react-icons/io';
import { SetStateAction, useState } from 'react';

type TagDropdownType = {
    option: string;
    setOption: React.Dispatch<SetStateAction<string>>;
};

const TagDropdown = ({ option, setOption }: TagDropdownType) => {
    // state to hide dropdown
    const [hidden, setHidden] = useState(true);

    //options for a tag
    const optionsObj = {
        expense: [
            'housing',
            'utilities',
            'groceries',
            'dining out',
            'transportation',
            'healthcare',
            'subscriptions',
            'entertainment',
            'shopping',
            'education',
            'debt payments',
            'gifts & donations',
            'personal care',
            'insurance',
            'child care',
        ],
        income: [
            'salary',
            'freelance',
            'side hustles',
            'investments',
            'bonuses',
            'passive income',
        ],
    };

    const chooseOption = (option: string) => {
        setOption(option);
        return setHidden(true);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setHidden((prev) => !prev)}
                className="capitalize flex items-center gap-x-2 border-2 border-dark-gray bg-dark-gray text-white rounded-md p-2 hover:bg-white hover:text-dark-gray transition-all ease-in-out"
            >
                {option === '' ? 'tag' : option}
                <IoMdArrowDropdown />
            </button>
            {!hidden && (
                <div className="absolute bg-white z-20 border-2 border-dark-gray rounded-lg capitalize h-80 overflow-scroll overflow-x-hidden">
                    <p
                        className="py-2 px-4 border-t-2 border-dark-gray cursor-pointer hover:bg-lighter-gray transition-colors ease-in-out"
                        onClick={() => {
                            setOption('');
                            return setHidden(true);
                        }}
                    >
                        No tag
                    </p>
                    {Object.entries(optionsObj).map((item, i) => {
                        return (
                            <div key={i}>
                                <p className="p-2 bg-light-gray text-white border-t-2 border-dark-gray">
                                    {item[0]}
                                </p>
                                <ul>
                                    {item[1].map((tag, j) => {
                                        return (
                                            <li
                                                key={j}
                                                className="py-2 px-4 border-t-2 border-dark-gray cursor-pointer hover:bg-lighter-gray transition-colors ease-in-out"
                                                onClick={() =>
                                                    chooseOption(tag)
                                                }
                                            >
                                                {tag}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TagDropdown;
