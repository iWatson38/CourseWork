import React from 'react';
import SwiperCore, { Navigation } from 'swiper';
import SCarouselListComponent from './CarouselList.module.scss';
import { CarouselComponent } from './Carousel/Carousel.component';

export interface ISuitableGood {
    id: number;
    name: string;
    description: string;
    price: number;
    img: string;
    link: string;
    is_favorite: boolean;
}

export interface IISuitableGoodList {
    generic_name: string;
    offers: Array<ISuitableGood>;
}

interface ICarouselListComponent {
    moreSuitableGifts: Array<IISuitableGoodList>;
    loading: boolean;
    onDislike: (id: number) => void;
    onLike: (id: number) => void;
}

SwiperCore.use([Navigation]);

export const CarouselListComponent: React.FC<ICarouselListComponent> = ({
    moreSuitableGifts,
    loading,
    onDislike,
    onLike,
}) => {
    return (
        <div className={SCarouselListComponent.CarouselListContainer}>
            {moreSuitableGifts && (
                <ul className={SCarouselListComponent.CarouselList}>
                    <li>
                        <p className={SCarouselListComponent.Title}>
                            {moreSuitableGifts[0].generic_name}
                        </p>
                        <CarouselComponent
                            moreSuitableGifts={moreSuitableGifts[0].offers}
                            loading={loading}
                            onLike={onLike}
                            onDislike={onDislike}
                        />
                    </li>
                    <li>
                        <p className={SCarouselListComponent.Title}>
                            {moreSuitableGifts[1].generic_name}
                        </p>
                        <CarouselComponent
                            moreSuitableGifts={moreSuitableGifts[1].offers}
                            loading={loading}
                            onLike={onLike}
                            onDislike={onDislike}
                        />
                    </li>
                </ul>
            )}
        </div>
    );
};
