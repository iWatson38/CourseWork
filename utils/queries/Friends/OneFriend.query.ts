import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';
import { IOneFriendRespose } from './Friends.types';

export const getOneFriend = async (vk_friend_id: number, link?: string) => {
    const { data } = await API.get<IOneFriendRespose>(
        `api/v1/friend/${vk_friend_id}`,
        {
            params: {
                link,
            },
        },
    );
    return data;
};

export const useGetOneFriend = (
    vk_friend_id: number,
    handleError: (message: string) => void,
    link?: string,
) => {
    return useQuery<IOneFriendRespose, Error>(
        ['getOneFriend', vk_friend_id, link],
        () => getOneFriend(vk_friend_id, link),
        {
            enabled: false,
            refetchOnWindowFocus: false,
            retry: false,
            onError: (error) => {
                handleError(error.message);
            },
        },
    );
};
