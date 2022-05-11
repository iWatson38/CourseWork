import { IFriendsResponse } from '../interfaces/Friends/Friends.interface';
import { useInfiniteQuery } from 'react-query';
import { API } from 'utils/api/api.util';

export const getFriends = async ({ pageParam = 0 }) => {
    const { data } = await API.get<IFriendsResponse>(
        `api/v1/friends?page=${pageParam}`,
        {
            params: {
                limit: 16,
            },
        },
    );
    return data;
};

export const useGetFriends = () => {
    return useInfiniteQuery<IFriendsResponse>('friends', getFriends, {
        getNextPageParam: (lastPage, _pages) => {
            console.log;
            if (lastPage.data.current_page === lastPage.data.last_page) {
                return undefined;
            } else {
                return lastPage.data.current_page + 1;
            }
        },
    });
};
