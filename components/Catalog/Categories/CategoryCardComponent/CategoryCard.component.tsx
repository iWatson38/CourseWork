import React from 'react';
import {
    ButtonComponent,
    EButtonStyleType,
} from 'components/UI/Button/Button.components';
import { useNavigate } from 'react-router-dom';
import SGoodCardComponent from 'components/Cards/GoodCard/GoodCard.module.scss';
import SCategoryCardComponent from './CategoryCard.module.scss';

export interface ICategoryCardComponentProps {
    vk_friend_id: number;
    category_id: number;
    name: string;
    description: string;
    img: string;
    className?: string;
}

export const CategoryCardComponent: React.FC<ICategoryCardComponentProps> = ({
    vk_friend_id,
    category_id,
    name,
    description,
    img,
    className,
}) => {
    const navigate = useNavigate();

    const groupedGiftsRedirect = () => {
        navigate(`/friends/${vk_friend_id}/${category_id}`);
    };

    const computeName = (name: string) => {
        if (window.innerWidth > 768) {
            return name.length > 73 ? `${name.slice(0, 70)}...` : name;
        }
        return name.length > 25 ? `${name.slice(0, 22)}...` : name;
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
        <div
            className={[
                className,
                SGoodCardComponent.Card,
                SCategoryCardComponent.CategoryCard,
            ].join(' ')}
        >
            <div className={SGoodCardComponent.ImageContainer}>
                <div className={SGoodCardComponent.FrontSide}>
                    <img
                        src={img}
                        alt="group"
                        className={SGoodCardComponent.Image}
                    />
                </div>
                <p className={SGoodCardComponent.Description}>
                    {computeDescription(description)}
                </p>
            </div>
            <p className={SCategoryCardComponent.Title}>{computeName(name)}</p>
            <ButtonComponent
                className={SCategoryCardComponent.Button}
                onClick={groupedGiftsRedirect}
            >
                Подробнее
            </ButtonComponent>
            <ButtonComponent
                className={SCategoryCardComponent.MobileButton}
                styleType={EButtonStyleType.WHITE}
                onClick={groupedGiftsRedirect}
            >
                Подробнее
            </ButtonComponent>
        </div>
    );
};
