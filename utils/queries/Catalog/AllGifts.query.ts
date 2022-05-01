import { IAllgiftsResponse } from '../interfaces/Catalog/AllGifts.interface';
import { API } from 'utils/api/api.util';
import { useQuery } from 'react-query';

export const getAllGifts = async (
    vk_friend_id: number,
    page: number,
    filters: Array<string>,
): Promise<IAllgiftsResponse> => {
    const response = await API.get<IAllgiftsResponse>(
        `api/v1/gifts/${vk_friend_id}?${filters.join('&')}`,
        {
            params: {
                'filters[page]': page,
            },
        },
    );
    if (response.data.success) {
        return response.data;
    }
    throw new Error('Network response with Error');
};

export const useGetAllGifts = (
    vk_friend_id: number,
    page: number,
    filters: Array<string>,
) => {
    return useQuery<IAllgiftsResponse, Error>(
        ['getAllGifts', vk_friend_id, page, filters],
        () => getAllGifts(vk_friend_id, page, filters),
        {
            refetchOnWindowFocus: false,
        },
    );
};
