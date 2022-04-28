import React, { useEffect, useState } from 'react';
import SCommon from 'styles/Common.module.scss';
import { GoodCardComponent } from 'components/Cards/GoodCard/GoodCard.component';
import { FriendsContainerComponent } from 'components/Layout/FriendContainer/FriendsContainer.component';
import {
    ESceletonCardType,
    SceletonCardComponent,
} from 'components/Cards/Skeletoncard/SkeletonCard.component';
import StickyBox from 'react-sticky-box';
import {
    EResponseModalType,
    ResponseModalComponent,
} from 'components/Modals/ResponseModal/ResponseModal.component';
import { BreadcrumbsComponent } from 'components/Breadcrumbs/Breadcrumbs.component';
import SCatalog from './Catalog.module.scss';
import { SortingComponent } from 'components/CatalogView/Sorting/Sorting.component';
import { YourFriendsComponent } from 'components/CatalogView/YourFriends/YourFriends.component';
import { BarCardComponent } from 'components/CatalogView/BarCards/BarCard.component';
import { LCatalogView } from './Catalog.logic';
import { CarouselListComponent } from 'components/CatalogView/Carousels/CarouselList.component';
import { LogInOfferModalComponent } from 'components/Modals/LogInOfferModal/LogInOfferModal.component';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';
import { API } from 'utils/api/api.util';
import { IView } from 'pages';
import { MainLayoutComponent } from 'components/Layout/MainLayout/MainLayout.component';
import { getFilters } from 'utils/queries/Filters/Filters.query';
import { getAllGifts } from 'utils/queries/Catalog/AllGifts.query';
import { getMoreSuitableGifts } from 'utils/queries/Catalog/MoreSuitableGifts.query';
import { getFriends } from 'utils/queries/Friends/Friends.query';
import {
    getOneFriend,
    useGetOneFriend,
} from 'utils/queries/Friends/OneFriend.query';
import { useCookies } from 'react-cookie';

const CatalogView: React.FC<IView> = ({ isAuth }) => {
    const router = useRouter();
    const [cookies] = useCookies();

    const {
        breadcrumbs,
        filters,
        handleAuthClick,
        moreSuitableGifts,
        loadingMoreSuitableGifts,
        allGifts,
        loadingAllGifts,
        allGiftsPage,
        skeletonCards,
        friends,
        handleFetchMoreFriends,
        onDislike,
        onFavoriteToggle,
        handleSearchFriends,
        friendData,
        handleFiltersSubmited,
        signInRedirect,
    } = LCatalogView(Number(router.query.vk_friend_id));

    const [visibleModal, setVisibleModal] = useState(false);
    const toogleVisibleModal = () => {
        setVisibleModal((prev) => !prev);
    };

    // FIX FILTERS ON SMALL DEVICES
    const computeOffsetTop = () => {
        if (typeof window !== 'undefined' && window.innerWidth <= 768) {
            return 83;
        }
        return 0;
    };

    useEffect(() => {
        if (!cookies.access_token) {
            router.push(`/catalog/${router.query.vk_friend_id}`);
        }
    }, [cookies]);

    return (
        <MainLayoutComponent isAuth={isAuth}>
            <main className={[SCatalog.Catalog, SCommon.Container].join(' ')}>
                <LogInOfferModalComponent
                    startPartMessage="Мы надеемся, что тебе понравился наш сервис, пожалуйста, "
                    link="авторизуйся"
                    finishPartMessage=', чтобы иметь возможность добавлять подарки в "Избранное".'
                    visible={visibleModal}
                    handleAuthClick={signInRedirect}
                    onClose={toogleVisibleModal}
                />

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
                                    и посмотри рекомендуемые подарки для своих
                                    друзей.
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
                            onSubmit={handleFiltersSubmited}
                        />
                        <div className={SCatalog.RequestSurveyContainer}>
                            <p className={SCatalog.RequestSurvey}>
                                Мы собираем Ваше мнение о сервисе, пожалуйста,
                                уделите время и пройдите небольшой{' '}
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
                        <p className={SCatalog.Title}>
                            Мы думаем это подойдет лучше всего:
                        </p>
                    )}
                    {moreSuitableGifts && (
                        <CarouselListComponent
                            moreSuitableGifts={moreSuitableGifts}
                            loading={loadingMoreSuitableGifts}
                            onDislike={onDislike}
                            onLike={
                                isAuth ? onFavoriteToggle : toogleVisibleModal
                            }
                        />
                    )}
                    <p className={SCatalog.Title}>
                        Все подарки, которые мы подобрали:
                    </p>
                    <ul className={SCatalog.List}>
                        {loadingAllGifts && allGiftsPage === 1
                            ? skeletonCards.map((_, index) => (
                                  <li key={`${index}SceletonCardComponent`}>
                                      <SceletonCardComponent
                                          type={ESceletonCardType.GOOD}
                                      />
                                  </li>
                              ))
                            : allGifts?.map((gift) => (
                                  <li key={`${gift.id}GoodCardComponent`}>
                                      <GoodCardComponent
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
                                                  ? onFavoriteToggle
                                                  : toogleVisibleModal
                                          }
                                      />
                                  </li>
                              ))}
                    </ul>
                </div>
            </main>
        </MainLayoutComponent>
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
    await queryClient.prefetchQuery(['friends', '', 5, 1], () =>
        getFriends('', 5, 1),
    );
    await queryClient.prefetchQuery(['moreSuitableGifts', vk_friend_id], () =>
        getMoreSuitableGifts(vk_friend_id),
    );
    await queryClient.prefetchQuery(
        ['getAllGifts', vk_friend_id, ['filters[page]=1']],
        () => getAllGifts(vk_friend_id, ['filters[page]=1']),
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
            dehydratedState: dehydrate(queryClient),
        },
    };
};