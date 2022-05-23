import React from 'react';
import { ButtonComponent } from 'components/UI/Button/Button.component';
import SStarCardComponent from './StarCard.module.scss';
import Link from 'next/link';

export interface ICategoryCardComponentProps {
    starId: number;
    starName: string;
    img: string;
    className?: string;
    setLoader?: () => void;
}

export const StarCardComponent: React.FC<ICategoryCardComponentProps> = ({
    starId,
    starName,
    img,
    className,
    setLoader,
}) => {
    const groupedGiftsRedirect = () => {
        setLoader && setLoader();
        window.location.pathname = `/catalog/${starId}`;
    };

    return (
        <div className={[className, SStarCardComponent.Card].join(' ')}>
            <Link href={`/catalog/${starId}`} scroll={false}>
                <a onClick={setLoader}>
                    <img
                        src={img}
                        alt="group"
                        className={SStarCardComponent.Image}
                    />
                </a>
            </Link>
            <Link href={`/catalog/${starId}`} scroll={false}>
                <a className={SStarCardComponent.Title} onClick={setLoader}>
                    {starName}
                </a>
            </Link>
            <ButtonComponent
                className={SStarCardComponent.Button}
                onClick={groupedGiftsRedirect}
            >
                Показать
            </ButtonComponent>
        </div>
    );
};
