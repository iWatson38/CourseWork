import React from 'react';
import SCommon from 'styles/Common.module.scss';
import SCheckboxButton from './CheckboxButton.module.scss';

const CheckMark = '/CheckboxButton/CheckMark.svg';

interface ICheckboxButtonProps {
    value: { [key: number]: boolean };
    onChange: (value: boolean) => void;
    name?: string;
}

export const CheckboxButton = React.forwardRef<
    HTMLDivElement,
    ICheckboxButtonProps
>(({ value, onChange }, ref) => (
    <div
        ref={ref}
        role="presentation"
        onClick={() => {
            onChange(!value);
        }}
    >
        <div
            className={[
                SCheckboxButton.Checkbox,
                value && SCheckboxButton.CheckboxActive,
            ].join(' ')}
        >
            <img
                className={[
                    SCommon.Hidden,
                    value && SCheckboxButton.CheckMark,
                ].join(' ')}
                src={CheckMark}
                alt="CheckMark"
            />
        </div>
    </div>
));
