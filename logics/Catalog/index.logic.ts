import { useGetFilters } from '../../utils/queries/Filters/Filters.query';
import { ICrumb } from 'components/Breadcrumbs/Breadcrumbs.component';
import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';
import { useModals } from 'components/Providers/ModalsProvider/Modals.provider';
import { useErrorHandler } from 'hooks/ErrorHandler.hook';
import React, { useEffect, useRef, useState } from 'react';

import { ISortingFields } from 'components/CatalogView/Sorting/Sorting.logic';
import { useRouter } from 'next/router';
import {
    useGetFriends,
    useGetInfiniteFriends,
} from 'utils/queries/Friends/Friends.query';
import { useGetOneFriend } from 'utils/queries/Friends/OneFriend.query';
import { useGetInfiniteAllGifts } from 'utils/queries/Catalog/AllGifts.query';
import { useGetMoreSuitableGifts } from 'utils/queries/Catalog/MoreSuitableGifts.query';
import { IAllgiftsResponse } from 'utils/queries/interfaces/Catalog/AllGifts.interface';
import { useGetFavorites } from 'utils/queries/Favorites/Favorites.query';
import {
    useAllGiftsFavoritesMutation,
    useMoreSuitableGiftsFavoritesMutation,
} from 'utils/mutations/Favorites/Favorites.mutation';
import { useQueryClient } from 'react-query';
import { useInView } from 'react-intersection-observer';

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
    const { ref: endBlockRef, inView } = useInView();
    const [allGiftsPage, setAllGiftsPage] = useState(1);
    const [generics, setGenerics] = useState('');
    const [minPrice, setMinPrice] = useState(filtersData?.data.min_price);
    const [maxPrice, setMaxPrice] = useState(filtersData?.data.max_price);
    const [assignFilter, setAssignFilter] = useState(false);
    const [filtersArray, setFiltersArray] = useState<Array<string>>([]);

    const scrollToAllGifts = () => {
        setTimeout(() => {
            const element = document.getElementById('test');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 0);
    };

    const {
        data: allGiftsData,
        isLoading: isLoadingAllGifts,
        fetchNextPage,
        isFetchingNextPage,
    } = useGetInfiniteAllGifts(Number(friendId), filtersArray);

    useEffect(() => {
        console.log('giftsData: ', allGiftsData);
    }, [allGiftsData]);

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

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
                scrollToAllGifts();
            }
        }
    }, [filtersData, assignFilter]);

    // MORE SUITABLE GIFTS API STUFF
    const { data: moreSuitableGifts, isLoading: loadingMoreSuitableGifts } =
        useGetMoreSuitableGifts(Number(friendId));

    // FAVORITES API STUFF
    const queryClient = useQueryClient();
    const { mutate } = useMoreSuitableGiftsFavoritesMutation(
        queryClient,
        friendId,
    );
    const onFavoriteMoreSuitableGiftsToggle = (product_id: number) => {
        mutate(product_id);
    };

    const { mutate: favoriteAllGifts } = useAllGiftsFavoritesMutation(
        queryClient,
        friendId,
        filtersArray,
    );
    const onFavoriteAllGiftsToggle = (product_id: number) => {
        favoriteAllGifts(product_id);
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
        allGifts: allGiftsData,
        isFetchingNextPage,
        skeletonCards,
        handleFetchMoreFriends,
        friends: friendsData?.data.items,
        onDislike,
        onFavoriteMoreSuitableGiftsToggle,
        onFavoriteAllGiftsToggle,
        handleSearchFriends,
        friendData: friendData?.data,
        handleSetFilters,
        signInRedirect,
        endBlockRef,
    };
};
