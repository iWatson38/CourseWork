import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';
import { IMoreSuitableGiftsResponse } from './Catalog.types';

export const getMoreSuitableGifts = async (vk_friend_id: number) => {
    const { data } = await API.get<IMoreSuitableGiftsResponse>(
        `api/v1/gifts/${vk_friend_id}/generics`,
    );
    return data;
};

export const useGetMoreSuitableGifts = (vk_friend_id: number) => {
    return useQuery<IMoreSuitableGiftsResponse, Error>(
        ['moreSuitableGifts', vk_friend_id],
        () => getMoreSuitableGifts(vk_friend_id),
        {
            refetchOnWindowFocus: false,
            retry: false,
        },
    );
};
