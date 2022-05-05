import React from 'react';
import SCloseMenuButton from './CloseMenuButton.module.scss';

const Cross = '/MobileMenu/Cross.svg';

interface ICloseMenuButtonProps {
    onClick?: () => void;
}

export const CloseMenuButton: React.FC<ICloseMenuButtonProps> = ({
    onClick,
}) => (
    <button className={SCloseMenuButton.CloseButton} onClick={onClick}>
        <img
            className={SCloseMenuButton.CloseButtonIcon}
            src={Cross}
            alt="cross"
        />
    </button>
);
