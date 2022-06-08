import React, { useEffect, useRef, useState } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import SCarouselListComponent from './CarouselList.module.scss';
import { CarouselComponent } from './Carousel/Carousel.component';
import { useInView } from 'react-intersection-observer';

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
    const prevButtonFirstCarouselRef = useRef<HTMLButtonElement>(null);
    const nextButtonFirstCarouselRef = useRef<HTMLButtonElement>(null);
    const { ref: endFirstCarouselRef, inView: inViewFirstCarousel } =
        useInView();

    const prevButtonLastCarouselRef = useRef<HTMLButtonElement>(null);
    const nextButtonLastCarouselRef = useRef<HTMLButtonElement>(null);
    const { ref: endLastCarouselRef, inView: inViewLastCarousel } = useInView();

    const [triggersNumber, setTriggersNumber] = useState(0);

    useEffect(() => {
        if (inViewFirstCarousel && triggersNumber === 0) {
            if (nextButtonFirstCarouselRef.current) {
                nextButtonFirstCarouselRef.current.click();
            }

            setTimeout(() => {
                if (prevButtonFirstCarouselRef.current) {
                    prevButtonFirstCarouselRef.current.click();
                }
            }, 1500);

            setTriggersNumber((prev) => prev + 1);
        }
    }, [
        triggersNumber,
        inViewFirstCarousel,
        prevButtonFirstCarouselRef.current,
        nextButtonFirstCarouselRef.current,
    ]);

    useEffect(() => {
        if (inViewLastCarousel && triggersNumber === 1) {
            if (nextButtonLastCarouselRef.current) {
                nextButtonLastCarouselRef.current.click();
            }

            setTimeout(() => {
                if (prevButtonLastCarouselRef.current) {
                    prevButtonLastCarouselRef.current.click();
                }
            }, 1500);

            setTriggersNumber((prev) => prev + 1);
        }
    }, [
        triggersNumber,
        inViewLastCarousel,
        prevButtonLastCarouselRef.current,
        nextButtonLastCarouselRef.current,
    ]);

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
                            prevButtonRef={prevButtonFirstCarouselRef}
                            nextButtonRef={nextButtonFirstCarouselRef}
                        />
                        <div ref={endFirstCarouselRef} />
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
                            prevButtonRef={prevButtonLastCarouselRef}
                            nextButtonRef={nextButtonLastCarouselRef}
                        />
                        <div ref={endLastCarouselRef} />
                    </li>
                </ul>
            )}
        </div>
    );
};
