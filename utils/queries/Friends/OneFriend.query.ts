import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';
import { IOneFriendRespose } from '../interfaces/Friends/OneFriend.interface';

export const getOneFriend = async (
    vk_friend_id: number,
    link?: string,
): Promise<IOneFriendRespose> => {
    const response = await API.get<IOneFriendRespose>(
        `api/v1/friend/${vk_friend_id}`,
        {
            params: {
                link,
            },
        },
    );
    if (response.data.success) {
        return response.data;
    }
    throw new Error('Network response with Error');
};

export const useGetOneFriend = (vk_friend_id: number, link?: string) => {
    return useQuery<IOneFriendRespose>(
        ['getOneFriend', vk_friend_id, link],
        () => getOneFriend(vk_friend_id, link),
        {
            enabled: false,
        },
    );
};
