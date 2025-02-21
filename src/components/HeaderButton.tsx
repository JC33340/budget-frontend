import { NavLink } from 'react-router-dom';

type HeaderButtonType = {
    href: string;
    text: string;
};

const HeaderButton = ({ href, text }: HeaderButtonType) => {
    const css =
        'text-lg font-semibold p-2 rounded-md hover:bg-white hover:text-blue transition-all ease-in-out ';

    return (
        <NavLink
            className={({ isActive }) =>
                isActive ? `${css} bg-white text-blue` : `${css} text-white`
            }
            to={href}
        >
            {text}
        </NavLink>
    );
};

export default HeaderButton;
