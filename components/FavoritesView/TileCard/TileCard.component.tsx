import React from 'react';
import STileCardComponent from './TileCard.module.scss';

const Heart = '/TileCard/Heart.svg';

interface ITileCardComponentProps {
    className?: string;
}

export const TileCardComponent: React.FC<ITileCardComponentProps> = ({
    className,
}) => (
    <div className={[STileCardComponent.Card, className].join(' ')}>
        <div>
            <h1 className={STileCardComponent.Title}>Избранное</h1>
            <p className={STileCardComponent.Description}>
                В этом разделе вы можете найти всё то, что вам понравилось и вы
                решили добавить это в избранное. Может вам понравилась идея и
                хотите подарить как-нибдуь потом
            </p>
        </div>
        <img className={STileCardComponent.Image} src={Heart} alt="heart" />
    </div>
);
