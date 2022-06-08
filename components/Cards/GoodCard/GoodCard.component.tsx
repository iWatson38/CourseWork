import React, { useState } from 'react';
import {
    ButtonComponent,
    EButtonStyleType,
} from 'components/UI/Button/Button.component';
import { DislikeIcon } from 'components/Icons/Dislike.icon';
import { HeartIcon } from 'components/Icons/Heart.icon';
import SGoodCardComponent from './GoodCard.module.scss';

const GiftIcon = '/GoodCard/Gift.svg';
const WhiteGiftIcon = '/GoodCard/WhiteGift.svg';

export interface IGoodCardComponentProps {
    title: string;
    description: string;
    price: number;
    image: string;
    link: string;
    id: number;
    onDislike: (id: number) => void;
    onLike: (id: number) => void;
    isFavorite: boolean;
    className?: string;
}

export const GoodCardComponent: React.FC<IGoodCardComponentProps> = ({
    image,
    price,
    title,
    description,
    link,
    onDislike,
    onLike,
    id,
    isFavorite,
    className,
}) => {
    const currencySign = '₽';
    const [descriptionVisible, setDescriptionVisible] = useState(false);

    const handleGift = () => {
        window.open(link, '_blank');
    };

    return (
        <div className={[className, SGoodCardComponent.Card].join(' ')}>
            <DislikeIcon
                onClick={() => onDislike(id)}
                strokeColor="#C9D1D1"
                className={SGoodCardComponent.DislikeIcon}
            />
            <HeartIcon
                onClick={() => onLike(id)}
                strokeColor={isFavorite ? '#1AB87B' : '#C9D1D1'}
                className={SGoodCardComponent.HeartIcon}
            />

            <div
                className={SGoodCardComponent.ImageContainer}
                onTouchStart={() => setDescriptionVisible((prev) => !prev)}
            >
                <div
                    className={[
                        SGoodCardComponent.FrontSide,
                        descriptionVisible &&
                            SGoodCardComponent.MobileFrontSide,
                    ].join(' ')}
                >
                    <img
                        className={SGoodCardComponent.Image}
                        src={image}
                        alt={title}
                    />
                </div>
                <p
                    className={[
                        SGoodCardComponent.Description,
                        descriptionVisible && SGoodCardComponent.MobileBackSide,
                    ].join(' ')}
                >
                    {description}
                </p>
            </div>
            <h5 className={SGoodCardComponent.Title} title={title}>
                {title}
            </h5>
            <p className={SGoodCardComponent.Price}>
                {price} {currencySign}
            </p>
            <ButtonComponent
                className={SGoodCardComponent.Button}
                onClick={handleGift}
            >
                Подарить
                <img src={GiftIcon} alt="Gift" />
            </ButtonComponent>
            <ButtonComponent
                className={SGoodCardComponent.MobileButton}
                styleType={EButtonStyleType.WHITE}
                onClick={handleGift}
            >
                Подарить
                <img src={WhiteGiftIcon} alt="Gift" />
            </ButtonComponent>
        </div>
    );
};
