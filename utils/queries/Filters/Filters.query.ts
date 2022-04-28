import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';
import { IFiltersResponse } from 'utils/queries/interfaces/Filters/Filters.interface';

export const getFilters = async (
    vk_friend_id: number,
): Promise<IFiltersResponse> => {
    const response = await API.get<IFiltersResponse>(
        `api/v1/gifts/${vk_friend_id}/filters`,
    );
    if (response.data.success) {
        return response.data;
    }
    throw new Error('Network response with Error');
};

export const useGetFilters = (vk_friend_id: number) => {
    return useQuery<IFiltersResponse, Error>(['filters', vk_friend_id], () =>
        getFilters(vk_friend_id),
    );
};
