import React from 'react';
import STextAreaComponent from './TextArea.module.scss';

type ITextAreaComponent = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaComponent = React.forwardRef<
    HTMLTextAreaElement,
    ITextAreaComponent
>(({ className, placeholder, onChange, onBlur, name, onFocus }, ref) => (
    <textarea
        ref={ref}
        className={[className, STextAreaComponent.TextArea].join(' ')}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        onFocus={onFocus}
    />
));
