import { IAllGiftsResponse } from './Catalog.types';
import { API } from 'utils/api/api.util';
import { useInfiniteQuery } from 'react-query';

export const getInfiniteAllGifts = (
    vk_friend_id: number,
    filters: Array<string>,
) => {
    return async ({ pageParam = 1 }) => {
        const { data } = await API.get<IAllGiftsResponse>(
            `api/v1/gifts/${vk_friend_id}?filters[page]=${pageParam || 1}${
                filters.length !== 0 ? `&${filters.join('&')}` : ''
            }`,
        );
        return data;
    };
};

export const useGetInfiniteAllGifts = (
    vk_friend_id: number,
    filters: Array<string>,
) => {
    return useInfiniteQuery<IAllGiftsResponse, Error>(
        ['getAllGifts', vk_friend_id, filters],
        getInfiniteAllGifts(vk_friend_id, filters),
        {
            getNextPageParam: (lastPage, _pages) => {
                if (lastPage?.data.items.length === 0) {
                    return undefined;
                }
                return lastPage.data.curr_page + 1;
            },
            refetchOnWindowFocus: false,
            retry: false,
        },
    );
};
