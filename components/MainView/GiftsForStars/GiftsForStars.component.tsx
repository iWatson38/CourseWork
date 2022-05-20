import React from 'react';
import SGiftsForStarsComponent from './GiftsForStars.module.scss';
import { StarCardComponent } from './StarCard/StarCard.component';

const Timothy = 'GiftsForStars/Timothy.svg';
const Sobchak = 'GiftsForStars/Sobchak.svg';
const Instosamka = 'GiftsForStars/Instosamka.svg';
const Saeva = 'GiftsForStars/Saeva.svg';
const Dava = 'GiftsForStars/Dava.svg';
const Milokhin = 'GiftsForStars/Milokhin.svg';
const Pokrov = 'GiftsForStars/Pokrov.svg';

interface IGiftsForStarsComponentProps {
    setLoader?: () => void;
}

export const GiftsForStarsComponent: React.FC<IGiftsForStarsComponentProps> = ({
    setLoader,
}) => {
    return (
        <div className={[SGiftsForStarsComponent.GiftsForStar].join(' ')}>
            <p className={SGiftsForStarsComponent.Title}>
                Посмотри, что шаман подобрал для звёзд:
            </p>

            <ul className={SGiftsForStarsComponent.StarList}>
                <li key={11547416} className={SGiftsForStarsComponent.ListItem}>
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
                </li>
            </ul>
        </div>
    );
};
