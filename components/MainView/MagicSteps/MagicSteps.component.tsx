import React from 'react';
import SMagicStepsComponent from './MagicSteps.module.scss';

interface IMagicStepsComponentProps {
    className?: string;
    title: string;
    steps: Array<string>;
}

export const MagicStepsComponent: React.FC<IMagicStepsComponentProps> = ({
    steps,
    title,
    className,
}) => (
    <div
        id="how-it-works"
        className={[className, SMagicStepsComponent.MagicSteps].join(' ')}
    >
        <h4 className={SMagicStepsComponent.Title}>{title}</h4>
        <ul className={SMagicStepsComponent.List}>
            {steps.map((step, index) => (
                <li key={step} className={SMagicStepsComponent.ListItem}>
                    <div className={SMagicStepsComponent.SequentialNumber}>
                        0{index + 1}
                    </div>{' '}
                    {step}
                </li>
            ))}
        </ul>
    </div>
);
