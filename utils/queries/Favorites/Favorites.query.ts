import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';
import { IFavoritesResponse } from 'utils/mutations/interfaces/Favorites/Favorites.interface';

export const getFavorites = async (): Promise<IFavoritesResponse> => {
    const response = await API.get<IFavoritesResponse>('api/v1/favorites');
    if (response.data.success) {
        return response.data;
    }
    throw new Error('Network response with Error');
};

export const useGetFavorites = () => {
    return useQuery<IFavoritesResponse, Error>('favorites', getFavorites, {
        refetchOnWindowFocus: false,
    });
};
