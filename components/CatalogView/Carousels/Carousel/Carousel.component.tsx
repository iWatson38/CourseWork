import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { GoodCardComponent } from 'components/Cards/GoodCard/GoodCard.component';
import {
    ESceletonCardType,
    SceletonCardComponent,
} from 'components/Cards/Skeletoncard/SkeletonCard.component';
import SCarouselComponent from './Carousel.module.scss';
import { ISuitableGood } from '../CarouselList.component';

const Arrow = '/Carousels/Arrow.svg';

interface ICarouselComponent {
    moreSuitableGifts: Array<ISuitableGood>;
    loading: boolean;
    onDislike: (id: number) => void;
    onLike: (id: number) => void;
}

SwiperCore.use([Navigation]);

export const CarouselComponent: React.FC<ICarouselComponent> = ({
    moreSuitableGifts,
    loading,
    onDislike,
    onLike,
}) => {
    const breakpoints = {
        320: {
            spaceBetween: 4,
            slidesPerView: 2,
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
                disabledClass: SCarouselComponent.DisabledButton,
            },
        },
        1140: {
            spaceBetween: 20,
            slidesPerView: 3,
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
                disabledClass: SCarouselComponent.DisabledButton,
            },
        },
    };

    const skeletonCards = Array.from({ length: 5 });

    return (
        <div className={SCarouselComponent.SwipersContainer}>
            <Swiper
                wrapperTag="ul"
                breakpoints={breakpoints}
                speed={600}
                className="mySwiper"
            >
                {loading
                    ? skeletonCards.map((_, index) => (
                          <SwiperSlide tag="li" key={`${index}SceletonCard`}>
                              <SceletonCardComponent
                                  type={ESceletonCardType.GOOD}
                              />
                          </SwiperSlide>
                      ))
                    : moreSuitableGifts?.map((gift) => (
                          <SwiperSlide
                              tag="li"
                              key={`${gift.id}GoodCardComponent`}
                          >
                              <GoodCardComponent
                                  title={gift.name}
                                  description={gift.description}
                                  image={gift.img}
                                  price={gift.price}
                                  id={gift.id}
                                  isFavorite={gift.is_favorite}
                                  link={gift.link}
                                  onDislike={onDislike}
                                  onLike={onLike}
                                  className={SCarouselComponent.GoodCard}
                              />
                          </SwiperSlide>
                      ))}
                <button
                    className={[
                        'prev',
                        SCarouselComponent.ButtonPrev,
                        SCarouselComponent.ControlButton,
                    ].join(' ')}
                >
                    <img
                        src={Arrow}
                        alt="arrow"
                        className={SCarouselComponent.InvertedArrow}
                    />
                </button>
                <button
                    className={[
                        'next',
                        SCarouselComponent.ButtonNext,
                        SCarouselComponent.ControlButton,
                    ].join(' ')}
                >
                    <img src={Arrow} alt="arrow" />
                </button>
            </Swiper>
        </div>
    );
};
