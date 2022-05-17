import { QueryClient, useMutation } from 'react-query';
import {
    IAllGiftsContext,
    IAllGiftsInfiniteResponse,
    IFavoritesErrorResponse,
    IFavoritesResponse,
    IMoreSuitableGiftsContext,
} from './../interfaces/Favorites/Favorites.interface';
import { API } from 'utils/api/api.util';
import { IMoreSuitableGiftsResponse } from 'utils/queries/interfaces/Catalog/MoreSuitableGifts.interface';
import { IAllgiftsResponse } from 'utils/queries/interfaces/Catalog/AllGifts.interface';

export const favoritesMutation = async (
    product_id: number,
): Promise<boolean> => {
    const { data } = await API.put<IFavoritesResponse>(
        `api/v1/favorites/${product_id}`,
    );
    if (data.success) {
        return true;
    }
    return false;
};

export const useMoreSuitableGiftsFavoritesMutation = (
    queryClient: QueryClient,
    vk_friend_id: number,
) => {
    return useMutation<
        boolean,
        IFavoritesErrorResponse,
        number,
        IMoreSuitableGiftsContext
    >(favoritesMutation, {
        onMutate: async (product_id) => {
            await queryClient.cancelQueries([
                'moreSuitableGifts',
                vk_friend_id,
            ]);

            const previousMoreSuitableGifts =
                queryClient.getQueryData<IMoreSuitableGiftsResponse>([
                    'moreSuitableGifts',
                    vk_friend_id,
                ]);

            if (previousMoreSuitableGifts) {
                previousMoreSuitableGifts.data.forEach((group) => {
                    const match = group.offers.find(
                        (offer) => offer.id === product_id,
                    );
                    if (match) {
                        match.is_favorite = !match.is_favorite;
                    }
                });

                queryClient.setQueryData<IMoreSuitableGiftsResponse>(
                    ['moreSuitableGifts', vk_friend_id],
                    previousMoreSuitableGifts,
                );

                return { previousMoreSuitableGifts };
            }
        },
        onError: (_err, _variables, context) => {
            if (context?.previousMoreSuitableGifts) {
                queryClient.setQueryData<IMoreSuitableGiftsResponse>(
                    'moreSuitableGifts',
                    context.previousMoreSuitableGifts,
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['moreSuitableGifts', vk_friend_id]);
        },
    });
};

export const useAllGiftsFavoritesMutation = (
    queryClient: QueryClient,
    vk_friend_id: number,
    filters: Array<string>,
) => {
    return useMutation<
        boolean,
        IFavoritesErrorResponse,
        number,
        IAllGiftsContext
    >(favoritesMutation, {
        onMutate: async (product_id) => {
            await queryClient.cancelQueries([
                'getAllGifts',
                vk_friend_id,
                filters,
            ]);

            const previousAllGifts =
                queryClient.getQueryData<IAllGiftsInfiniteResponse>([
                    'getAllGifts',
                    vk_friend_id,
                    filters,
                ]);

            if (previousAllGifts) {
                previousAllGifts.pages.forEach((page) => {
                    const match = page.data.items.find(
                        (gift) => gift.id === product_id,
                    );
                    if (match) {
                        match.is_favorite = !match.is_favorite;
                    }
                });

                queryClient.setQueryData<IAllGiftsInfiniteResponse>(
                    ['getAllGifts', vk_friend_id, filters],
                    previousAllGifts,
                );

                return { previousAllGifts };
            }
        },
        onError: (_err, _variables, context) => {
            if (context?.previousAllGifts) {
                queryClient.setQueryData<IAllGiftsInfiniteResponse>(
                    'getAllGifts',
                    context.previousAllGifts,
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries([
                'getAllGifts',
                vk_friend_id,
                filters,
            ]);
        },
    });
};
