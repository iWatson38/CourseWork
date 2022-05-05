import React from 'react';
import { CloseMenuButton } from 'components/UI/CloseMenuButton/CloseMenuButton.component';
import {
    ComputedLinkComponent,
    EComputedLinkComponentType,
    IMenuItem,
} from 'components/Layout/ComputedLink/ComputedLink.component';
import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';
import SMobileMenu from './MobileMenu.module.scss';

const PersonIcon = '/MobileMenu/Person.svg';

interface IMobilePhoneProps {
    isAuth: boolean;
    visible: boolean;
    menuItems: Array<IMenuItem>;
    onClose?: () => void;
}

export const MobileMenu: React.FC<IMobilePhoneProps> = ({
    isAuth,
    visible,
    menuItems,
    onClose,
}) => {
    const { logout, signInRedirect } = useAuth();

    const handleAuthClick = () => {
        if (isAuth) {
            logout();
        } else {
            signInRedirect();
        }
    };

    return (
        <div
            className={[SMobileMenu.Menu, visible && SMobileMenu.Visible].join(
                ' ',
            )}
        >
            <nav className={SMobileMenu.NavListContainer}>
                <ul className={SMobileMenu.NavList}>
                    {menuItems
                        .filter((item) => !item.hidden)
                        .map((menuItem) => (
                            <ComputedLinkComponent
                                key={`${menuItem.title}ComputedLinkComponent`}
                                scrollIntoView={menuItem.scrollIntoView}
                                title={menuItem.title}
                                to={menuItem.to}
                                end={menuItem.end}
                                onClose={onClose}
                                className={SMobileMenu.MobileNavLink}
                                type={EComputedLinkComponentType.MOBILE}
                            />
                        ))}
                    <button
                        className={[
                            SMobileMenu.NavLink,
                            SMobileMenu.SingInButton,
                        ].join(' ')}
                        onClick={handleAuthClick}
                    >
                        <img
                            className={SMobileMenu.PersonIcon}
                            src={PersonIcon}
                            alt="person"
                        />{' '}
                        {isAuth ? 'Выйти' : 'Войти'}
                    </button>
                    <CloseMenuButton onClick={onClose} />
                </ul>
            </nav>
        </div>
    );
};
