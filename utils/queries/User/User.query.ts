import { IUserResponse } from './User.types';
import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';

export const getUser = async () => {
    const { data } = await API.get<IUserResponse>('api/v1/auth/me');
    return data;
};

export const useGetUser = () => {
    return useQuery<IUserResponse, Error>('user', getUser, {
        refetchOnWindowFocus: false,
        retry: false,
    });
};
