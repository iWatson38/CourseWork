import { useGetFilters } from '../../utils/queries/Filters/Filters.query';
import { ICrumb } from 'components/Breadcrumbs/Breadcrumbs.component';
import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';
import { useModals } from 'components/Providers/ModalsProvider/Modals.provider';
import React, { useEffect, useState } from 'react';

import { ISortingFields } from 'components/CatalogView/Sorting/Sorting.logic';
import { useGetFriends } from 'utils/queries/Friends/Friends.query';
import { useGetOneFriend } from 'utils/queries/Friends/OneFriend.query';
import { useGetInfiniteAllGifts } from 'utils/queries/Catalog/AllGifts.query';
import { useGetMoreSuitableGifts } from 'utils/queries/Catalog/MoreSuitableGifts.query';
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
    const [filters, setFilters] = useState<Array<string>>([]);

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
    } = useGetInfiniteAllGifts(Number(friendId), filters);

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    const handleSetFilters = (filters: ISortingFields) => {
        const parameters: Array<string> = [];
        if (filters.range[0]) {
            const minPrice = Number(filters.range[0].replaceAll(/\s/g, ''));
            if (minPrice !== filtersData?.data.min_price) {
                parameters.push(`filters[min_price]=${minPrice}`);
            }
        }
        if (filters.range[1]) {
            const maxPrice = Number(filters.range[1].replaceAll(/\s/g, ''));
            if (maxPrice !== filtersData?.data.max_price) {
                parameters.push(`filters[max_price]=${maxPrice}`);
            }
        }
        if (filters.interests) {
            const interestsList = Object.entries(filters.interests)
                .filter((item) => item[1])
                .map((item) => item[0])
                .join(',');
            if (interestsList !== '') {
                parameters.push(`filters[generics_id]=${interestsList}`);
            }
        }
        setFilters(parameters);
        scrollToAllGifts();
    };

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
        filters,
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
