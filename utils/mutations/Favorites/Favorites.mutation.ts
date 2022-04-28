import { useMutation } from 'react-query';
import { IFavoritesResponse } from './../interfaces/Favorites/Favorites.interface';
import { API } from 'utils/api/api.util';

export const favoritesMutation = async (
    product_id: number,
): Promise<boolean> => {
    const response = await API.put<IFavoritesResponse>(
        `api/v1/favorites/${product_id}`,
    );
    if (response.data.success) {
        return true;
    }
    throw new Error('Network response with Error');
};

export const useFavoritesMutation = () => {
    return useMutation(favoritesMutation);
};
