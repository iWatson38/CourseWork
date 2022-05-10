import { useFavoritesMutation } from '../../utils/mutations/Favorites/Favorites.mutation';
import { useGetFilters } from '../../utils/queries/Filters/Filters.query';
import { ICrumb } from 'components/Breadcrumbs/Breadcrumbs.component';
import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';
import { useModals } from 'components/Providers/ModalsProvider/Modals.provider';
import { useErrorHandler } from 'hooks/ErrorHandler.hook';
import React, { useEffect, useRef, useState } from 'react';

import { ISortingFields } from 'components/CatalogView/Sorting/Sorting.logic';
import { useRouter } from 'next/router';
import { useGetFriends } from 'utils/queries/Friends/Friends.query';
import { useGetOneFriend } from 'utils/queries/Friends/OneFriend.query';
import { useGetAllGifts } from 'utils/queries/Catalog/AllGifts.query';
import { useGetMoreSuitableGifts } from 'utils/queries/Catalog/MoreSuitableGifts.query';
import { IAllgiftsResponse } from 'utils/queries/interfaces/Catalog/AllGifts.interface';
import { useGetFavorites } from 'utils/queries/Favorites/Favorites.query';

export interface IFiltersRef {
    page: number;
    generics: string;
    min_price: number;
    max_price: number;
}

export interface IParameters {
    [key: string]: string | number | undefined;
}

export const LCatalogView = (friendId: number) => {
    const { isAuth, logout, signInRedirect } = useAuth();

    const handleAuthClick = () => {
        if (isAuth) {
            logout();
        } else {
            signInRedirect();
        }
    };

    const modals = useModals();

    // FILTERS API STUFF
    const { data: filtersData } = useGetFilters(friendId);

    // ALL GIFTS API STUFF
    const [allGiftsPage, setAllGiftsPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [generics, setGenerics] = useState('');
    const [minPrice, setMinPrice] = useState(filtersData?.data.min_price);
    const [maxPrice, setMaxPrice] = useState(filtersData?.data.max_price);
    const [assignFilter, setAssignFilter] = useState(false);
    const [filtersArray, setFiltersArray] = useState<Array<string>>([]);
    const [filter, setFilter] = useState(false);

    const scrollToAllGifts = () => {
        setTimeout(() => {
            const element = document.getElementById('test');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 0);
    };

    const { data: allGiftsData, isLoading: isLoadingAllGifts } = useGetAllGifts(
        Number(friendId),
        allGiftsPage,
        filtersArray,
    );

    const [allGifts, setAllGifts] = useState(allGiftsData?.data || []);

    useEffect(() => {
        if (allGiftsData?.data && allGiftsData.data.length > 0) {
            if (fetching) {
                if (allGiftsPage === 1) {
                    setAllGifts(allGiftsData.data);
                } else {
                    setAllGifts([...allGifts, ...allGiftsData.data]);
                }
                setAllGiftsPage((prev) => prev + 1);
                setFetching(false);
            }
            if (filter) {
                setAllGifts(allGiftsData.data);
                setFilter(false);
                scrollToAllGifts();
            }
        }
    }, [allGiftsData, fetching, filter]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return removeEventListener('scroll', scrollHandler);
    }, []);

    const scrollHandler = (event: Event) => {
        if (
            (event.target as Document).documentElement.scrollHeight -
                ((event.target as Document).documentElement.scrollTop +
                    window.innerHeight) <
            430
        ) {
            setFetching(true);
        }
    };

    const handleSetFilters = (filters: ISortingFields) => {
        filters.range[0] &&
            setMinPrice(Number(filters.range[0].replaceAll(/\s/g, '')));

        filters.range[1] &&
            setMaxPrice(Number(filters.range[1].replaceAll(/\s/g, '')));

        setGenerics(
            Object.entries(filters.interests)
                .filter((item) => item[1])
                .map((item) => item[0])
                .join(','),
        );
        setAssignFilter(true);
    };

    useEffect(() => {
        if (filtersData) {
            if (assignFilter) {
                const filters: IParameters = {};
                if (generics !== '') {
                    filters['filters[generics_id]'] = generics;
                }
                if (minPrice !== filtersData.data.min_price) {
                    filters['filters[min_price]'] = minPrice;
                }
                if (maxPrice !== filtersData.data.max_price) {
                    filters['filters[max_price]'] = maxPrice;
                }
                const parameters = [];
                for (const key in filters) {
                    parameters.push(`${key}=${filters[key]}`);
                }
                setFiltersArray(parameters);
                setAssignFilter(false);
                setAllGiftsPage(1);
                setFilter(true);
            }
        }
    }, [filtersData, assignFilter]);

    // MORE SUITABLE GIFTS API STUFF
    const { data: moreSuitableGifts, isLoading: loadingMoreSuitableGifts } =
        useGetMoreSuitableGifts(Number(friendId));

    // FAVORITES API STUFF
    const [favoriteIdList, setFavoriteIdList] = useState<Array<number>>([]);

    const {
        data: favorites,
        error,
        refetch: refetchFavorites,
    } = useGetFavorites();

    const { data, mutate } = useFavoritesMutation();
    const onFavoriteToggle = (product_id: number) => {
        mutate(product_id, {
            onSuccess: () => {
                refetchFavorites();
                setFavoriteIdList([...favoriteIdList, product_id]);
            },
        });
        setFavoriteIdList;
        refetchFavorites();
    };

    const onDislike = (id: number) => {
        modals?.toggleFeedbackModal(
            id,
            Number(friendId),
            modals.toggleSuccessModal,
            modals.toggleErrorModal,
        );
    };

    // FRIENDS API STUFF
    const [friendName, setFriendName] = useState('');
    const [friendsPage, setFriendsPage] = useState(1);

    const { data: friendsData } = useGetFriends(friendName, 5, friendsPage);

    const handleFetchMoreFriends = () => {
        if (friendsPage === friendsData?.data.last_page) {
            setFriendsPage(1);
        } else {
            setFriendsPage((prev) => prev + 1);
        }
    };

    const handleSearchFriends = async (value: string) => {
        setFriendName(value.length > 2 ? value : '');
        setFriendsPage(1);
    };

    const { data: friendData, refetch } = useGetOneFriend(
        friendId,
        () => {},
        '',
    );
    useEffect(() => {
        refetch();
    }, []);

    const skeletonCards = Array.from({ length: 16 });

    const breadcrumbs: Array<ICrumb> = [
        {
            name: 'Друзья',
            path: '/friends',
        },
        {
            name: `${friendData?.data?.first_name || ''} ${
                friendData?.data?.last_name || ''
            }`,
            path: `/friends/${friendId}`,
        },
    ];

    return {
        modals,
        breadcrumbs,
        filters: filtersData?.data,
        handleAuthClick,
        moreSuitableGifts: moreSuitableGifts?.data,
        loadingMoreSuitableGifts,
        loadingAllGifts: isLoadingAllGifts,
        allGiftsPage,
        allGifts,
        skeletonCards,
        handleFetchMoreFriends,
        friends: friendsData?.data.items,
        onDislike,
        onFavoriteToggle,
        handleSearchFriends,
        friendData: friendData?.data,
        handleSetFilters,
        signInRedirect,
    };
};
