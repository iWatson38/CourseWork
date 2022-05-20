import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';
import { IFiltersResponse } from './Filters.types';

export const getFilters = async (vk_friend_id: number) => {
    const { data } = await API.get<IFiltersResponse>(
        `api/v1/gifts/${vk_friend_id}/filters`,
    );
    return data;
};

export const useGetFilters = (vk_friend_id: number) => {
    return useQuery<IFiltersResponse, Error>(
        ['filters', vk_friend_id],
        () => getFilters(vk_friend_id),
        {
            refetchOnWindowFocus: false,
            retry: false,
        },
    );
};
