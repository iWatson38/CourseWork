import React from 'react';
import SBarCard from './BarCard.module.scss';

interface IBarCardComponentProps {
    personName: string;
    className?: string;
    avatar?: string;
}

export const BarCardComponent: React.FC<IBarCardComponentProps> = ({
    personName,
    className,
    avatar,
}) => (
    <div className={[SBarCard.Card, className].join(' ')}>
        <div className={SBarCard.TitleContainer}>
            <h2 className={SBarCard.Title}>Что подарить {personName}?</h2>
        </div>
        <div className={SBarCard.DescriptionContainer}>
            <p className={SBarCard.Description}>
                Шаман знает! Он уже нашел подходящие варианты для вашего друга
            </p>
        </div>
        {avatar && (
            <img
                className={SBarCard.Photo}
                width={160}
                height={160}
                src={avatar}
                alt="avatar"
            />
        )}
    </div>
);
