import { IAllgiftsResponse } from '../interfaces/Catalog/AllGifts.interface';
import { API } from 'utils/api/api.util';
import { useInfiniteQuery } from 'react-query';

export const getInfiniteAllGifts = (
    vk_friend_id: number,
    filters: Array<string>,
) => {
    return async ({ pageParam = 1 }): Promise<IAllgiftsResponse> => {
        const { data } = await API.get<IAllgiftsResponse>(
            `api/v1/gifts/${vk_friend_id}?filters[page]=${pageParam}&${filters.join(
                '&',
            )}`,
        );
        return data;
    };
};

export const useGetInfiniteAllGifts = (
    vk_friend_id: number,
    filters: Array<string>,
) => {
    return useInfiniteQuery<IAllgiftsResponse, Error>(
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
