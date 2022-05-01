import { IUserResponse } from './../interfaces/User/User.interface';
import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';

export const getUser = async (): Promise<IUserResponse> => {
    const response = await API.get<IUserResponse>('api/v1/auth/me');
    if (response.data) {
        return response.data;
    }
    throw new Error('Network response with Error');
};

export const useGetUser = () => {
    return useQuery<IUserResponse, Error>('user', getUser, {
        refetchOnWindowFocus: false,
    });
};
