import { IMenuItem } from 'components/Layout/ComputedLink/ComputedLink.component';

export const MenuConstant: (isLoggedIn: boolean) => Array<IMenuItem> = (
    isLoggedIn,
) => [
    {
        title: 'Главная',
        to: '/',
        end: true,
    },
    {
        title: 'Друзья',
        to: '/friends',
        hidden: !isLoggedIn,
    },
    {
        title: 'Избранное',
        to: '/favorites',
        hidden: !isLoggedIn,
    },
];
