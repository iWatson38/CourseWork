import React from 'react';
import SGiftsForStarsComponent from './GiftsForStars.module.scss';
import { StarCardComponent } from './StarCard/StarCard.component';

const Timothy = 'GiftsForStars/Timothy.svg';
const Sobchak = 'GiftsForStars/Sobchak.svg';
const Instosamka = 'GiftsForStars/Instosamka.svg';

export const GiftsForStarsComponent: React.FC = () => {
    return (
        <div className={[SGiftsForStarsComponent.GiftsForStar].join(' ')}>
            <p className={SGiftsForStarsComponent.Title}>
                Посмотри, что шаман подобрал для звёзд:
            </p>

            <ul className={SGiftsForStarsComponent.StarList}>
                <li key={11547416}>
                    <StarCardComponent
                        starId={11547416}
                        starName="Тимати"
                        img={Timothy}
                    />
                </li>
                <li key={399053643}>
                    <StarCardComponent
                        starId={399053643}
                        starName="Инстасамкa"
                        img={Instosamka}
                    />
                </li>
                <li key={453382669}>
                    <StarCardComponent
                        starId={453382669}
                        starName="Ксения Собчак"
                        img={Sobchak}
                    />
                </li>
            </ul>
        </div>
    );
};
