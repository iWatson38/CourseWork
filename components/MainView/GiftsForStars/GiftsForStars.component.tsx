import { StarsConstant } from 'constants/Stars.constant';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import SGiftsForStarsComponent from './GiftsForStars.module.scss';
import { StarCardComponent } from './StarCard/StarCard.component';
import SCarouselComponent from 'components/CatalogView/Carousels/Carousel/Carousel.module.scss';

const Arrow = '/Carousels/Arrow.svg';

interface IGiftsForStarsComponentProps {
    setLoader?: () => void;
}

SwiperCore.use([Navigation]);

export const GiftsForStarsComponent: React.FC<IGiftsForStarsComponentProps> = ({
    setLoader,
}) => {
    const breakpoints = {
        320: {
            spaceBetween: 4,
            slidesPerView: 1,
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
                disabledClass: SCarouselComponent.DisabledButton,
            },
        },
        520: {
            slidesPerView: 2,
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
                disabledClass: SCarouselComponent.DisabledButton,
            },
        },
        769: {
            spaceBetween: 20,
            slidesPerView: 3,
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
                disabledClass: SCarouselComponent.DisabledButton,
            },
        },
    };

    return (
        <div className={[SGiftsForStarsComponent.GiftsForStar].join(' ')}>
            <p className={SGiftsForStarsComponent.Title}>
                Посмотри, что шаман подобрал для звёзд:
            </p>
            <div className={SCarouselComponent.SwipersContainer}>
                <Swiper
                    wrapperTag="ul"
                    breakpoints={breakpoints}
                    speed={600}
                    className="mySwiper"
                >
                    {StarsConstant?.map((star) => (
                        <SwiperSlide tag="li" key={`${star.id}StarCard`}>
                            <StarCardComponent
                                starId={star.id}
                                starName={star.name}
                                img={star.img}
                                setLoader={setLoader}
                            />
                        </SwiperSlide>
                    ))}
                    <button
                        className={[
                            'prev',

                            SCarouselComponent.ControlButton,
                            SGiftsForStarsComponent.ButtonPrev,
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

                            SCarouselComponent.ControlButton,
                            SGiftsForStarsComponent.ButtonNext,
                        ].join(' ')}
                    >
                        <img src={Arrow} alt="arrow" />
                    </button>
                </Swiper>
            </div>
        </div>
    );
};

{
    /* <li key={11547416} className={SGiftsForStarsComponent.ListItem}>
                    <StarCardComponent
                        starId={11547416}
                        starName="Тимати"
                        img={Timothy}
                        setLoader={setLoader}
                    />
                </li>
                <li
                    key={399053643}
                    className={SGiftsForStarsComponent.ListItem}
                >
                    <StarCardComponent
                        starId={399053643}
                        starName="Инстасамкa"
                        img={Instosamka}
                        setLoader={setLoader}
                    />
                </li>
                <li
                    key={453382669}
                    className={SGiftsForStarsComponent.ListItem}
                >
                    <StarCardComponent
                        starId={453382669}
                        starName="Ксения Собчак"
                        img={Sobchak}
                        setLoader={setLoader}
                    />
                </li>
                <li
                    key={418377661}
                    className={SGiftsForStarsComponent.ListItem}
                >
                    <StarCardComponent
                        starId={418377661}
                        starName="Дина Саева"
                        img={Saeva}
                        setLoader={setLoader}
                    />
                </li>
                <li key={69371195} className={SGiftsForStarsComponent.ListItem}>
                    <StarCardComponent
                        starId={69371195}
                        starName="Дава"
                        img={Dava}
                        setLoader={setLoader}
                    />
                </li>
                <li
                    key={517356333}
                    className={SGiftsForStarsComponent.ListItem}
                >
                    <StarCardComponent
                        starId={517356333}
                        starName="Даня Милохин"
                        img={Milokhin}
                        setLoader={setLoader}
                    />
                </li>
                <li key={47903500} className={SGiftsForStarsComponent.ListItem}>
                    <StarCardComponent
                        starId={47903500}
                        starName="Аня Покров"
                        img={Pokrov}
                        setLoader={setLoader}
                    />
                </li> */
}
