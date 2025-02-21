import HeaderButton from './HeaderButton';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue rounded-xl p-4 py-4 flex items-center justify-between">
            <Link to="/">
                <p className="text-white text-2xl font-semibold">Budgeter</p>
            </Link>
            <div className="flex items-center gap-x-6">
                <HeaderButton href="/transactions" text="Transactions" />
                <HeaderButton href="/reports" text="Reports" />
                <HeaderButton href="/settings" text="Settings" />
                <button
                    className="text-white bg-dark-red p-2 rounded-md font-semibold"
                    onClick={() => {
                        localStorage.clear();
                        return window.location.reload();
                    }}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
