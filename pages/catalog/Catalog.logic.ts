import { useFavoritesMutation } from './../../utils/mutations/Favorites/Favorites.mutation';
import { useGetFilters } from './../../utils/queries/Filters/Filters.query';
import { ICrumb } from 'components/Breadcrumbs/Breadcrumbs.component';
import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';
import { useModals } from 'components/Providers/ModalsProvider/Modals.provider';
import { useErrorHandler } from 'hooks/ErrorHandler.hook';
import { useEffect, useRef, useState } from 'react';

import { ISortingFields } from 'components/CatalogView/Sorting/Sorting.logic';
import { useRouter } from 'next/router';
import { useGetFriends } from 'utils/queries/Friends/Friends.query';
import { useGetOneFriend } from 'utils/queries/Friends/OneFriend.query';
import { useGetAllGifts } from 'utils/queries/Catalog/AllGifts.query';
import { useGetMoreSuitableGifts } from 'utils/queries/Catalog/MoreSuitableGifts.query';
import { IAllgiftsResponse } from 'utils/queries/interfaces/Catalog/AllGifts.interface';

export interface IApiRef {
    page: number;
    isLoading: boolean;
    done: boolean;
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

    // GOODS API STUFF
    const [allGiftsPage, setAllGiftsPage] = useState(1);
    const [generics, setGenerics] = useState('');
    const [minPrice, setMinPrice] = useState(filtersData?.data.min_price);
    const [maxPrice, setMaxPrice] = useState(filtersData?.data.max_price);
    const [registration, setRegistration] = useState(false);
    const [parameters, setParameters] = useState<IParameters>({});
    const [transformation, setTransformation] = useState(false);
    const [parametersArray, setParametersArray] = useState<Array<string>>([
        'filters[page]=1',
    ]);
    const [fetchingMore, setFetchingMore] = useState(false);
    const [changeState, setChangeState] = useState(false);

    const {
        data: allGiftsData,
        error,
        isLoading: isLoadingAllGifts,
    } = useGetAllGifts(Number(friendId), parametersArray);

    const [allGifts, setAllGifts] = useState<IAllgiftsResponse['data']>(
        allGiftsData?.data || [],
    );

    const handleFiltersSubmited = (filters: ISortingFields) => {
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
        setRegistration(true);
    };

    useEffect(() => {
        if (fetchingMore) {
            setParameters({
                'filters[page]': allGiftsPage + 1,
                'filters[generics_id]': generics,
                'filters[min_price]': minPrice,
                'filters[max_price]': maxPrice,
            });
            setAllGiftsPage((prev) => prev + 1);
            setFetchingMore(false);
            setTransformation(true);
        }
        if (registration) {
            setParameters({
                'filters[page]': 1,
                'filters[generics_id]': generics,
                'filters[min_price]': minPrice,
                'filters[max_price]': maxPrice,
            });
            setAllGiftsPage(1);
            setRegistration(false);
            setTransformation(true);
        }
    }, [fetchingMore, registration]);

    useEffect(() => {
        if (transformation) {
            let resultParameters = [];
            for (let key in parameters) {
                if (parameters[key]) {
                    resultParameters.push(`${key}=${parameters[key]}`);
                }
            }
            setParametersArray(resultParameters);
            setTransformation(false);
            setChangeState(true);
        }
    }, [transformation]);

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
            setFetchingMore(true);
        }
    };

    useEffect(() => {
        if (allGiftsData?.data) {
            if (changeState) {
                if (allGiftsPage === 1) {
                    setAllGifts(allGiftsData.data);
                } else {
                    setAllGifts([...allGifts, ...allGiftsData.data]);
                }
                setChangeState(false);
            }
        }
    }, [allGiftsData, changeState]);

    const { data: moreSuitableGifts, isLoading: loadingMoreSuitableGifts } =
        useGetMoreSuitableGifts(Number(friendId));

    useErrorHandler(error);

    const { mutate } = useFavoritesMutation();
    const onFavoriteToggle = (product_id: number) => {
        mutate(product_id);
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

    const { data: friendData, refetch } = useGetOneFriend(friendId, '');
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
            name: `${friendData?.data.first_name || ''} ${
                friendData?.data.last_name || ''
            }`,
            path: `/friends/${friendId}`,
        },
    ];

    return {
        breadcrumbs,
        filters: filtersData?.data,
        handleAuthClick,
        moreSuitableGifts: moreSuitableGifts?.data,
        loadingMoreSuitableGifts,
        loadingAllGifts: isLoadingAllGifts,
        allGiftsPage,
        allGifts: allGifts,
        skeletonCards,
        handleFetchMoreFriends,
        friends: friendsData?.data.items,
        onDislike,
        onFavoriteToggle,
        handleSearchFriends,
        friendData: friendData?.data,
        handleFiltersSubmited,
        signInRedirect,
    };
};
