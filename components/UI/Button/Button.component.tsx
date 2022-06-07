import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import SButtonComponent from './Button.module.scss';

export enum EButtonStyleType {
    OUTLINED = 'outlined',
    WHITE = 'white',
}

interface IButtonComponentProps {
    className?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    styleType?: EButtonStyleType;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

export const ButtonComponent: React.FC<IButtonComponentProps> = ({
    className,
    children,
    type,
    styleType,
    onClick,
    disabled,
}) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={[
            className,
            SButtonComponent.Button,
            styleType === EButtonStyleType.OUTLINED &&
                SButtonComponent.Button_Outlined,
            styleType === EButtonStyleType.WHITE &&
                SButtonComponent.Button_White,
        ].join(' ')}
        type={type}
    >
        {children}
    </button>
);
