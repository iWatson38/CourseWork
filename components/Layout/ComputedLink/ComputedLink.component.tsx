import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import SComputedLinkComponent from './ComputedLink.module.scss';

export enum EComputedLinkComponentType {
    DESCTOP = 'DESCTOP',
    MOBILE = 'MOBILE',
}

export interface IMenuItem {
    title: string;
    to: string;
    end?: boolean;
    hidden?: boolean;
    scrollIntoView?: boolean;
    onClose?: () => void;
    className?: string;
    type?: EComputedLinkComponentType;
}

export const ComputedLinkComponent: React.FC<IMenuItem> = ({
    scrollIntoView,
    title,
    to,
    end,
    onClose,
    className,
    type,
}) => {
    const router = useRouter();
    if (scrollIntoView) {
        return (
            <Link key={to} href={to} scroll={false}>
                <a
                    className={[
                        className,
                        SComputedLinkComponent.NavLink,
                        type === EComputedLinkComponentType.MOBILE &&
                            SComputedLinkComponent.Mobile,
                    ].join(' ')}
                    onClick={onClose}
                >
                    {title}
                </a>
            </Link>
        );
    }
    return (
        <Link key={to} href={to} scroll={false}>
            <a
                className={[
                    className,
                    SComputedLinkComponent.NavLink,
                    router.pathname == to &&
                        SComputedLinkComponent.NavLinkActive,
                    type === EComputedLinkComponentType.MOBILE &&
                        SComputedLinkComponent.Mobile,
                ].join(' ')}
                onClick={onClose}
            >
                {title}
            </a>
        </Link>
    );
};
