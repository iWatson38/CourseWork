import React from 'react';
import {
    ButtonComponent,
    EButtonStyleType,
} from 'components/UI/Button/Button.component';
import { useRouter } from 'next/router';
import SGoodCardComponent from 'components/Cards/GoodCard/GoodCard.module.scss';
import SCategoryCardComponent from 'components/Catalog/Categories/CategoryCardComponent/CategoryCard.module.scss';
import SStarCardComponent from './StarCard.module.scss';

export interface ICategoryCardComponentProps {
    starId: number;
    starName: string;
    img: string;
    className?: string;
}

export const StarCardComponent: React.FC<ICategoryCardComponentProps> = ({
    starId,
    starName,
    img,
    className,
}) => {
    const router = useRouter();
    const groupedGiftsRedirect = () => {
        router.push(`/catalog/${starId}`);
    };

    return (
        <div className={[className, SStarCardComponent.Card].join(' ')}>
            <img src={img} alt="group" className={SGoodCardComponent.Image} />
            <p className={SStarCardComponent.Title}>{starName}</p>
            <ButtonComponent
                className={SStarCardComponent.Button}
                onClick={groupedGiftsRedirect}
            >
                Посмотреть
            </ButtonComponent>
            <ButtonComponent
                className={SCategoryCardComponent.MobileButton}
                styleType={EButtonStyleType.WHITE}
                onClick={groupedGiftsRedirect}
            >
                Посмотерть
            </ButtonComponent>
        </div>
    );
};
