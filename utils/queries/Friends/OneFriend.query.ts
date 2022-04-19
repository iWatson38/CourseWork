import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';
import { IOneFriendRespose } from '../interfaces/OneFriend.interface';

export const getOneFriend = async (
    vk_friend_id: number,
    link?: string,
): Promise<IOneFriendRespose> => {
    const respose = await API.get<IOneFriendRespose>(
        `api/v1/friend/${vk_friend_id}?link=${link}`,
    ).catch((error) => {
        if (error) {
            console.log(error);
        }
        return {
            data: { success: false, data: [], message: error.message },
        };
    });
    const friend = respose.data;
    return friend;
};

export const useGetOneFriend = (
    vk_friend_id: number,
    enabled: boolean,
    link?: string,
) => {
    return useQuery<IOneFriendRespose>(
        ['getOneFriend', vk_friend_id, link],
        () => getOneFriend(vk_friend_id, link),
        { enabled: enabled, refetchOnWindowFocus: false },
    );
};
