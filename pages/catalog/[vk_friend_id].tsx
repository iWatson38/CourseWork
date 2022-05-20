import React, { useEffect, useState } from 'react';
import SCommon from 'styles/Common.module.scss';
import { GoodCardComponent } from 'components/Cards/GoodCard/GoodCard.component';
import { FriendsContainerComponent } from 'components/Layout/FriendContainer/FriendsContainer.component';
import StickyBox from 'react-sticky-box';
import { BreadcrumbsComponent } from 'components/Breadcrumbs/Breadcrumbs.component';
import SCatalog from './index.module.scss';
import { SortingComponent } from 'components/CatalogView/Sorting/Sorting.component';
import { YourFriendsComponent } from 'components/CatalogView/YourFriends/YourFriends.component';
import { BarCardComponent } from 'components/CatalogView/BarCards/BarCard.component';
import { LCatalogView } from 'logics/Catalog/index.logic';
import { CarouselListComponent } from 'components/CatalogView/Carousels/CarouselList.component';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';
import { API } from 'utils/api/api.util';
import { IView } from 'pages';
import { MainLayoutComponent } from 'components/Layout/MainLayout/MainLayout.component';
import { getFilters } from 'utils/queries/Filters/Filters.query';
import { getMoreSuitableGifts } from 'utils/queries/Catalog/MoreSuitableGifts.query';
import { getFriends } from 'utils/queries/Friends/AllFriends.query';
import { getOneFriend } from 'utils/queries/Friends/OneFriend.query';
import { useCookies } from 'react-cookie';
import { useModals } from 'components/Providers/ModalsProvider/Modals.provider';
import Head from 'next/head';
import { LoaderComponent } from 'components/Loaders/Loader/Loader.component';
import { getInfiniteAllGifts } from 'utils/queries/Catalog/AllGifts.query';
import Script from 'next/script';
import { ShareBlockComponent } from 'components/UI/ShareBlock/ShareBlock.component';

const CatalogView: React.FC<IView> = ({ isAuth }) => {
    const router = useRouter();
    const [cookies] = useCookies();
    const modals = useModals();

    const {
        breadcrumbs,
        filters,
        handleAuthClick,
        moreSuitableGifts,
        loadingMoreSuitableGifts,
        allGifts,
        friends,
        handleFetchMoreFriends,
        onDislike,
        onFavoriteMoreSuitableGiftsToggle,
        onFavoriteAllGiftsToggle,
        handleSearchFriends,
        friendData,
        handleSetFilters,
        endBlockRef,
    } = LCatalogView(Number(router.query.vk_friend_id));

    // FIX FILTERS ON SMALL DEVICES
    const computeOffsetTop = () => {
        if (typeof window !== 'undefined' && window.innerWidth <= 768) {
            return 83;
        }
        return 0;
    };

    useEffect(() => {
        if (!cookies.access_token) {
            router.push(`/catalog/${router.query.vk_friend_id}`, undefined, {scroll: false});
        }
    }, [cookies]);

    const [visibleLoader, setVisibleLoader] = useState(false);

    useEffect(() => {
        setVisibleLoader(false);
    }, [friendData]);

    return (
        <>
            <Head>
                <meta
                    property="og:url"
                    content={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
                />
                <meta
                    property="og:title"
                    content={`Что подарить ${friendData?.first_name} ${friendData?.last_name}? Посмотри, какие подарки подобрал для него Шаман – Сервис умного подбора подарков.`}
                />
                <meta
                    property="og:description"
                    content="Подбор подарков для друзей и знакомых по профилю Вконтакте. Автоматически подберем подарок, который понравится его обладателю."
                />
                <meta property="og:image" content={friendData?.photo_100} />

                <title>{`Что подарить ${friendData?.first_name} ${friendData?.last_name}? Шаман знает. Умный поиск подарков.`}</title>
                <meta
                    name="description"
                    content="Шаман подбирает полезные подарки для людей с учетом их интересов. Достаточно указать профиль ВК."
                />
            </Head>

            <MainLayoutComponent isAuth={isAuth}>
                <main
                    className={[SCatalog.Catalog, SCommon.Container].join(' ')}
                >
                    <LoaderComponent visible={visibleLoader} />
                    <StickyBox
                        offsetTop={computeOffsetTop()}
                        className={SCatalog.SidebarContainer}
                    >
                        <div className={SCatalog.Background} />
                        <div className={SCatalog.Sidebar}>
                            {isAuth ? (
                                <YourFriendsComponent
                                    isAuth={isAuth}
                                    onLoadMore={handleFetchMoreFriends}
                                    onSearch={handleSearchFriends}
                                    friends={friends}
                                    setLoader={() =>
                                        setVisibleLoader((prev) => !prev)
                                    }
                                />
                            ) : (
                                <FriendsContainerComponent isAuth={isAuth}>
                                    <p className={SCatalog.AuthAsking}>
                                        Здесь будут отображаться Ваши друзья.{' '}
                                        <button
                                            className={SCatalog.AuthButton}
                                            onClick={handleAuthClick}
                                        >
                                            Авторизуйся
                                        </button>{' '}
                                        и посмотри рекомендуемые подарки для
                                        своих друзей.
                                    </p>
                                </FriendsContainerComponent>
                            )}
                            <SortingComponent
                                filters={
                                    filters || {
                                        min_price: 0,
                                        max_price: 100,
                                        generics: [],
                                    }
                                }
                                onSubmit={handleSetFilters}
                            />
                            <div className={SCatalog.RequestSurveyContainer}>
                                <p className={SCatalog.RequestSurvey}>
                                    Мы собираем Ваше мнение о сервисе,
                                    пожалуйста, уделите время и пройдите
                                    небольшой{' '}
                                    <a
                                        className={SCatalog.SurveyLink}
                                        href="https://docs.google.com/forms/d/e/1FAIpQLScdsh3YZkHEuicnPDsxp2ouX_usZ9iVZzXRXRxirxzhuPBTeg/viewform"
                                    >
                                        опрос
                                    </a>
                                </p>
                            </div>
                        </div>
                    </StickyBox>

                    <BreadcrumbsComponent
                        crumbList={breadcrumbs}
                        className={SCatalog.Breadcrumbs}
                    />
                    <BarCardComponent
                        className={SCatalog.BarCard}
                        personName={`${friendData?.first_name} ${friendData?.last_name}`}
                        avatar={friendData?.photo_100}
                    />

                    <div className={SCatalog.MainContent}>
                        {moreSuitableGifts?.length !== 0 && (
                            <h2 className={SCatalog.Title}>
                                Шаман решил, что эти подарки подойдут лучше
                                всего:
                            </h2>
                        )}
                        {moreSuitableGifts && (
                            <CarouselListComponent
                                moreSuitableGifts={moreSuitableGifts}
                                loading={loadingMoreSuitableGifts}
                                onDislike={onDislike}
                                onLike={
                                    isAuth
                                        ? onFavoriteMoreSuitableGiftsToggle
                                        : modals.toogleAddToFavoritesModal
                                }
                            />
                        )}
                        <div className={SCatalog.AllGiftsTitleContainer}>
                            <h2 className={SCatalog.AllGiftsTitle} id="test">
                                Все подарки, которые подобрал шаман:
                            </h2>
                            <ShareBlockComponent />
                        </div>
                        <ul className={SCatalog.List}>
                            {allGifts?.pages.map((page) =>
                                page.data.items.map((gift) => (
                                    <GoodCardComponent
                                        key={`${gift.id}GoodCardComponent`}
                                        title={gift.name}
                                        description={gift.description}
                                        image={gift.img}
                                        price={gift.price}
                                        id={gift.id}
                                        isFavorite={gift.is_favorite}
                                        link={gift.link}
                                        onDislike={onDislike}
                                        onLike={
                                            isAuth
                                                ? onFavoriteAllGiftsToggle
                                                : modals.toogleAddToFavoritesModal
                                        }
                                    />
                                )),
                            )}
                        </ul>
                        <div ref={endBlockRef} />
                    </div>
                </main>
            </MainLayoutComponent>
        </>
    );
};

export default CatalogView;

export const getServerSideProps: GetServerSideProps = async (
    context,
): Promise<{
    props: {
        isAuth: boolean;
        dehydratedState: DehydratedState;
    };
}> => {
    if (context.req.cookies.access_token) {
        API.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${context.req.cookies.access_token}`;
    }
    const queryClient = new QueryClient();
    const vk_friend_id = Number(context.query.vk_friend_id);
    const filters: Array<string> = [];
    await queryClient.prefetchQuery(['friends', '', 5, 1], () =>
        getFriends('', 5, 1),
    );
    await queryClient.prefetchQuery(['moreSuitableGifts', vk_friend_id], () =>
        getMoreSuitableGifts(vk_friend_id),
    );
    await queryClient.prefetchInfiniteQuery(
        ['getAllGifts', vk_friend_id, filters],
        getInfiniteAllGifts(vk_friend_id, filters),
    );
    await queryClient.prefetchQuery(['filters', vk_friend_id], () =>
        getFilters(vk_friend_id),
    );
    await queryClient.prefetchQuery(['getOneFriend', vk_friend_id, ''], () =>
        getOneFriend(vk_friend_id, ''),
    );

    return {
        props: {
            isAuth: !!context.req.cookies.access_token,
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
};
