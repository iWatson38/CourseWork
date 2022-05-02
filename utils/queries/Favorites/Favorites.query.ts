import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';
import { IFavoritesResponse } from 'utils/mutations/interfaces/Favorites/Favorites.interface';
import { IAllgiftsResponse } from '../interfaces/Catalog/AllGifts.interface';

export const getFavorites = async (): Promise<IAllgiftsResponse> => {
    const response = await API.get<IAllgiftsResponse>('api/v1/favorites');
    if (response.data.success) {
        return response.data;
    }
    throw new Error('Network response with Error');
};

export const useGetFavorites = () => {
    return useQuery<IAllgiftsResponse, Error>('favorites', getFavorites, {
        refetchOnWindowFocus: false,
    });
};
