import { IoIosMenu } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const HeaderDropdown = () => {
    //hidden state
    const [hidden, setHidden] = useState(true);
    const options = [
        { name: 'Transactions', href: '/transactions' },
        { name: 'Reports', href: '/reports' },
    ];

    return (
        <div
            className="flex md:hidden relative"
            data-testid="headerDropdown-testid"
        >
            <IoIosMenu
                className="fill-white cursor-pointer"
                size={40}
                onClick={() => setHidden((prev) => !prev)}
                data-testid="dropdownButton-testid"
            />
            <div
                className={`absolute ${hidden ? 'hidden' : 'flex'} flex-col right-0 bottom-[-190px] rounded-lg border-4 overflow-hidden border-dark-gray`}
                data-testid="dropdownContent-testid"
            >
                {options.map((item, i) => {
                    return (
                        <Link
                            key={i}
                            className={`cursor-pointer border-b-2 bg-white p-2 text-lg text-blue font-semibold hover:bg-blue hover:text-white transition-colors ease-in-out`}
                            to={item.href}
                        >
                            {item.name}
                        </Link>
                    );
                })}
                <button
                    className="cursor-pointer bg-dark-red p-2 text-lg text-white font-semibold"
                    onClick={() => {
                        localStorage.clear();
                        return window.location.reload();
                    }}
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

export default HeaderDropdown;
