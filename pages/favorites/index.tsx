import React, { useEffect } from 'react';
import SCommon from 'styles/Common.module.scss';
import { GoodCardComponent } from 'components/Cards/GoodCard/GoodCard.component';
import { useModals } from 'components/Providers/ModalsProvider/Modals.provider';
import { useErrorHandler } from 'hooks/ErrorHandler.hook';
import {
    BreadcrumbsComponent,
    ICrumb,
} from 'components/Breadcrumbs/Breadcrumbs.component';
import SFavoritesView from './Favorites.module.scss';
import { TileCardComponent } from 'components/FavoritesView/TileCard/TileCard.component';
import {
    getFavorites,
    useGetFavorites,
} from 'utils/queries/Favorites/Favorites.query';
import {
    favoritesMutation,
    useFavoritesMutation,
} from 'utils/mutations/Favorites/Favorites.mutation';
import {
    dehydrate,
    DehydratedState,
    QueryClient,
    useMutation,
} from 'react-query';
import { MainLayoutComponent } from 'components/Layout/MainLayout/MainLayout.component';
import { GetServerSideProps } from 'next';
import { API } from 'utils/api/api.util';
import { IView } from 'pages';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const FavoritesView: React.FC<IView> = ({ isAuth }) => {
    const router = useRouter();
    const [cookies] = useCookies();

    const { data: favorites, error, refetch } = useGetFavorites();
    useErrorHandler(error);
    const modals = useModals();

    const { mutate } = useMutation(favoritesMutation, {
        onSuccess: (data) => {
            if (data) {
                refetch();
            } else {
                modals.toggleErrorModal();
            }
        },
    });

    const onDislike = (id: number) => {
        modals?.toggleFeedbackModal(
            id,
            1,
            modals.toggleSuccessModal,
            modals.toggleErrorModal,
        );
    };

    const handleRemoveFromFavorites = async (product_id: number) => {
        mutate(product_id);
    };

    const breadcrumbs: Array<ICrumb> = [
        {
            name: 'Избранное',
            path: '/favorites',
        },
    ];

    useEffect(() => {
        if (!cookies.access_token) {
            router.push('/');
        }
    }, [cookies]);

    useEffect(() => {
        console.log(favorites);
    }, []);

    return (
        <MainLayoutComponent isAuth={isAuth}>
            <main
                className={[SCommon.Container, SFavoritesView.Main].join(' ')}
            >
                <BreadcrumbsComponent
                    crumbList={breadcrumbs}
                    className={SFavoritesView.Breadcrumbs}
                />
                <TileCardComponent className={SFavoritesView.TileCard} />
                <ul className={SFavoritesView.List}>
                    {favorites &&
                        favorites.data.map((favorite) => (
                            <li
                                key={favorite.id}
                                className={SFavoritesView.ListItem}
                            >
                                <GoodCardComponent
                                    title={favorite.name}
                                    description={favorite.description}
                                    image={favorite.img}
                                    price={favorite.price}
                                    isFavorite
                                    id={favorite.id}
                                    link={favorite.link}
                                    onLike={handleRemoveFromFavorites}
                                    onDislike={onDislike}
                                />
                            </li>
                        ))}
                </ul>
            </main>
        </MainLayoutComponent>
    );
};

export default FavoritesView;

export const getServerSideProps: GetServerSideProps = async (
    context,
): Promise<{
    props: { isAuth: boolean; dehydratedState: DehydratedState };
}> => {
    if (context.req.cookies.access_token) {
        API.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${context.req.cookies.access_token}`;
    }
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('favorites', getFavorites);
    return {
        props: {
            isAuth: !!context.req.cookies.access_token,
            dehydratedState: dehydrate(queryClient),
        },
    };
};
