import { IFriendsResponse } from '../interfaces/Friends/Friends.interface';
import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';

export const getFriends = async (
    name: string,
    limit: number,
    page: number,
): Promise<IFriendsResponse> => {
    const response = await API.get<IFriendsResponse>('api/v1/friends', {
        params: {
            'filters[name]': name,
            limit,
            page,
        },
    });
    if (response.data.success) {
        return response.data;
    }
    throw new Error('Network response with Error');
};

export const useGetFriends = (name: string, limit: number, page: number) => {
    return useQuery<IFriendsResponse, Error>(
        ['friends', name, limit, page],
        () => getFriends(name, limit, page),
        { keepPreviousData: true, staleTime: 5000 },
    );
};
