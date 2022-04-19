import React from 'react';
import {
    ButtonComponent,
    EButtonStyleType,
} from 'components/UI/Button/Button.component';
import { DislikeIcon } from 'components/Icons/Dislike.icon';
import { HeartIcon } from 'components/Icons/Heart.icon';
import GiftIcon from 'assets/components/GoodCard/Gift.svg';
import WhiteGiftIcon from 'assets/components/GoodCard/WhiteGift.svg';
import SGoodCardComponent from './GoodCard.module.scss';

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

    const handleGift = () => {
        window.open(link, '_blank');
    };

    const computeTitle = (title: string) => {
        if (window.innerWidth > 768) {
            return title.length > 62 ? `${title.slice(0, 59)}...` : title;
        }
        return title.length > 25 ? `${title.slice(0, 22)}...` : title;
    };

    const computeDescription = (description: string) => {
        if (window.innerWidth > 768) {
            return description.length > 220
                ? `${description.slice(0, 216)}...`
                : description;
        }
        return description.length > 50
            ? `${description.slice(0, 47)}...`
            : description;
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

            <div className={SGoodCardComponent.ImageContainer}>
                <div className={SGoodCardComponent.FrontSide}>
                    <img
                        className={SGoodCardComponent.Image}
                        src={image}
                        alt="Good"
                    />
                </div>
                <p className={SGoodCardComponent.Description}>
                    {computeDescription(description)}
                </p>
            </div>
            <h5 className={SGoodCardComponent.Title} title={title}>
                {computeTitle(title)}
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
