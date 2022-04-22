import React from 'react';
import SLabelComponent from './Label.module.scss';

type ILabelComponentProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const LabelComponent: React.FC<ILabelComponentProps> = ({
    children,
    htmlFor,
    className,
}) => (
    <label
        className={[className, SLabelComponent.Label].join(' ')}
        htmlFor={htmlFor}
    >
        {children}
    </label>
);
