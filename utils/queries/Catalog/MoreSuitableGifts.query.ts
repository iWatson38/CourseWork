import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';
import { IMoreSuitableGiftsResponse } from 'utils/queries/interfaces/Catalog/MoreSuitableGifts.interface';

export const getMoreSuitableGifts = async (
    vk_friend_id: number,
): Promise<IMoreSuitableGiftsResponse> => {
    const response = await API.get<IMoreSuitableGiftsResponse>(
        `api/v1/gifts/${vk_friend_id}/generics`,
    );
    if (response.data.success) {
        return response.data;
    }
    throw new Error('Network response with Error');
};

export const useGetMoreSuitableGifts = (vk_friend_id: number) => {
    return useQuery<IMoreSuitableGiftsResponse, Error>(
        ['moreSuitableGifts', vk_friend_id],
        () => getMoreSuitableGifts(vk_friend_id),
    );
};
