import React, { useState } from 'react';
import {
    ButtonComponent,
    EButtonStyleType,
} from 'components/UI/Button/Button.component';
import { MobileMenu } from 'components/Layout/MobileMenu/MobileMenu.component';
import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';
import SNavBarComponent from './NavBar.module.scss';
import {
    ComputedLinkComponent,
    EComputedLinkComponentType,
    IMenuItem,
} from '../ComputedLink/ComputedLink.component';
import SComputedLinkComponent from '../ComputedLink/ComputedLink.module.scss';
import Link from 'next/link';

const LogoIcon = '/NavBar/logo.svg';
const PersonIcon = '/NavBar/person.svg';
const BurgerButton = '/MobileMenu/BurgerButton.svg';

interface INavBarComponentProps {
    menuItems: Array<IMenuItem>;
    className?: string;
}

export const NavBarComponent: React.FC<INavBarComponentProps> = ({
    menuItems,
    className,
}) => {
    const { isAuth, logout, signInRedirect } = useAuth();
    const [menuActive, setmenuActive] = useState(false);

    const toggleVisibleModileMenu = () => {
        setmenuActive((prev) => !prev);
    };

    const handleAuthClick = () => {
        if (isAuth) {
            logout();
        } else {
            signInRedirect();
        }
    };

    return (
        <div className={[SNavBarComponent.HeaderNav, className].join(' ')}>
            <Link href={'/'}>
                <a>
                    <img src={LogoIcon} alt="shaman logo" />
                </a>
            </Link>

            <nav>
                <ul className={SNavBarComponent.NavList}>
                    {menuItems
                        .filter((item) => !item.hidden)
                        .map((menuItem) => (
                            <ComputedLinkComponent
                                key={`${menuItem.title}ComputedLinkComponent`}
                                scrollIntoView={menuItem.scrollIntoView}
                                title={menuItem.title}
                                to={menuItem.to}
                                end={menuItem.end}
                                className={SNavBarComponent.DesctopNavLink}
                                type={EComputedLinkComponentType.DESCTOP}
                            />
                        ))}
                    <button
                        className={[
                            SNavBarComponent.DesctopNavLink,
                            SComputedLinkComponent.NavLink,
                        ].join(' ')}
                        onClick={handleAuthClick}
                    >
                        <img src={PersonIcon} alt="person" />{' '}
                        {isAuth ? 'Выйти' : 'Войти'}
                    </button>
                    <ButtonComponent
                        className={SNavBarComponent.BurgerButton}
                        onClick={toggleVisibleModileMenu}
                        styleType={EButtonStyleType.WHITE}
                    >
                        <img src={BurgerButton} alt="menu" />
                    </ButtonComponent>
                </ul>
            </nav>

            <MobileMenu
                visible={!!menuActive}
                menuItems={menuItems}
                onClose={toggleVisibleModileMenu}
            />
        </div>
    );
};
