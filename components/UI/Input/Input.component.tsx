import React from 'react';
import SInput from './Input.module.scss';

export interface IInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    styleType?: 'gray';
    placeholder?: string;
    iconLeft?: string;
    iconRight?: string;
    error?: string;
}

export const InputComponent = React.forwardRef<HTMLInputElement, IInputProps>(
    (
        {
            className,
            type,
            styleType,
            placeholder,
            iconLeft,
            iconRight,
            error,
            onChange,
            onBlur,
            onFocus,
            name,
        },
        ref,
    ) => {
        return (
            <div className={SInput.InputContainer}>
                <input
                    ref={ref}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    className={[
                        className,
                        SInput.Input,
                        styleType === 'gray' && SInput.Input_Gray,
                        iconLeft && SInput.Input_IconLeft,
                        error && SInput.Input_Error,
                    ].join(' ')}
                    type={type}
                    placeholder={placeholder}
                />
                {iconLeft && (
                    <img
                        className={SInput.IconLeft}
                        src={iconLeft}
                        alt="Icon"
                    />
                )}
                {iconRight && (
                    <img
                        className={SInput.IconRight}
                        src={iconRight}
                        alt="Icon"
                    />
                )}
                {error && <p className={SInput.ErrorMessage}>{error}</p>}
            </div>
        );
    },
);
