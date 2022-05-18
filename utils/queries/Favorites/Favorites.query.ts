import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';
import { IFavoritesResponse } from '../interfaces/Favorites/Favorites.interface';

export const getFavorites = async (): Promise<IFavoritesResponse> => {
    const { data } = await API.get<IFavoritesResponse>('api/v1/favorites');
    return data;
};

export const useGetFavorites = () => {
    return useQuery<IFavoritesResponse, Error>('favorites', getFavorites, {
        refetchOnWindowFocus: false,
        retry: false,
    });
};
