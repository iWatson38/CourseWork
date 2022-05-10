import React from 'react';
import { ButtonComponent } from 'components/UI/Button/Button.component';
import { useRouter } from 'next/router';
import SStarCardComponent from './StarCard.module.scss';
import Link from 'next/link';

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
            <Link href={`/catalog/${starId}`}>
                <a>
                    <img
                        src={img}
                        alt="group"
                        className={SStarCardComponent.Image}
                    />
                </a>
            </Link>
            <Link href={`/catalog/${starId}`}>
                <a className={SStarCardComponent.Title}>{starName}</a>
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
