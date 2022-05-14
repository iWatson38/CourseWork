import { IFriendsResponse } from '../interfaces/Friends/Friends.interface';
import { useInfiniteQuery, useQuery } from 'react-query';
import { API } from 'utils/api/api.util';

export const getFriends = async (name: string, limit: number, page: number) => {
    const { data } = await API.get<IFriendsResponse>(`api/v1/friends`, {
        params: {
            'filters[name]': name,
            limit,
            page,
        },
    });
    return data;
};

export const getInfiniteFriends = (nameParam: string, limitParam: number) => {
    return async ({ pageParam = 1 }) => {
        const { data } = await API.get<IFriendsResponse>(
            `api/v1/friends?page=${pageParam}`,
            {
                params: {
                    'filters[name]': nameParam,
                    limit: limitParam,
                },
            },
        );
        return data;
    };
};

export const useGetFriends = (name: string, limit: number, page: number) => {
    return useQuery<IFriendsResponse, Error>(
        ['friends', name, limit, page],
        () => getFriends(name, limit, page),
        {
            retry: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useGetInfiniteFriends = (
    nameParam: string,
    limitParam: number,
) => {
    return useInfiniteQuery<IFriendsResponse>(
        ['friends', nameParam, limitParam],
        getInfiniteFriends(nameParam, limitParam),
        {
            getNextPageParam: (lastPage, _pages) => {
                if (lastPage.data.current_page === lastPage.data.last_page) {
                    return undefined;
                } else {
                    return lastPage.data.current_page + 1;
                }
            },
            refetchOnWindowFocus: false,
            retry: false,
        },
    );
};
