import { DislikeIcon } from 'components/Icons/Dislike.icon';
import { HeartIcon } from 'components/Icons/Heart.icon';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
    ButtonComponent,
    EButtonStyleType,
} from 'components/UI/Button/Button.component';

import SCategoryCardComponent from 'views/Catalog/Categories/CategoryCardComponent/CategoryCard.module.scss';
import SSceletonCardComponent from './SkeletonCard.module.scss';
import SGoodCardComponent from '../GoodCard/GoodCard.module.scss';

const GiftIcon = '/GoodCard/Gift.svg';
const WhiteGiftIcon = '/GoodCard/WhiteGift.svg';

export enum ESceletonCardType {
    GOOD = 'GOOD',
    CATEGORY = 'CATEGORY',
}

interface IModalComponentProps {
    type: ESceletonCardType;
}

export const SceletonCardComponent: React.FC<IModalComponentProps> = ({
    type,
}) => {
    return (
        <div
            className={[
                SGoodCardComponent.Card,
                type === ESceletonCardType.CATEGORY &&
                    SCategoryCardComponent.CategoryCard,
                SSceletonCardComponent.SceletonCard,
            ].join(' ')}
        >
            {type === ESceletonCardType.GOOD && (
                <DislikeIcon
                    strokeColor="#C9D1D1"
                    className={SGoodCardComponent.DislikeIcon}
                />
            )}
            {type === ESceletonCardType.GOOD && (
                <HeartIcon
                    strokeColor="#C9D1D1"
                    className={SGoodCardComponent.HeartIcon}
                />
            )}
            <div className={SSceletonCardComponent.SkeletonImgContainer}>
                <Skeleton className={SSceletonCardComponent.SkeletonImg} />
            </div>
            <Skeleton
                count={3}
                className={SSceletonCardComponent.SkeletonName}
            />
            {type === ESceletonCardType.GOOD && (
                <Skeleton className={SSceletonCardComponent.SkeletonPrice} />
            )}
            {type === ESceletonCardType.GOOD && (
                <ButtonComponent className={SGoodCardComponent.Button}>
                    Подарить
                    <img src={GiftIcon} alt="Gift" />
                </ButtonComponent>
            )}
            {type === ESceletonCardType.GOOD && (
                <ButtonComponent
                    className={SGoodCardComponent.MobileButton}
                    styleType={EButtonStyleType.WHITE}
                >
                    Подарить
                    <img src={WhiteGiftIcon} alt="Gift" />
                </ButtonComponent>
            )}
            {type === ESceletonCardType.CATEGORY && (
                <ButtonComponent className={SCategoryCardComponent.Button}>
                    Подробнее
                </ButtonComponent>
            )}
            {type === ESceletonCardType.CATEGORY && (
                <ButtonComponent
                    className={SCategoryCardComponent.MobileButton}
                    styleType={EButtonStyleType.WHITE}
                >
                    Подробнее
                </ButtonComponent>
            )}
        </div>
    );
};
