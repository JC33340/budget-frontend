import HeaderButton from './HeaderButton';
import { Link } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';

const Header = () => {
    return (
        <header
            className="bg-blue rounded-xl p-4 py-4 flex items-center justify-between"
            data-testid="header-testid"
        >
            <Link to="/">
                <p className="text-white text-2xl font-semibold">Budgeter</p>
            </Link>
            <div className="hidden md:flex items-center gap-x-6">
                <HeaderButton href="/transactions" text="Transactions" />
                <button
                    className="text-white bg-dark-red p-2 rounded-md font-semibold cursor-pointer"
                    onClick={() => {
                        localStorage.clear();
                        return window.location.reload();
                    }}
                >
                    Logout
                </button>
            </div>
            <HeaderDropdown />
        </header>
    );
};

export default Header;
