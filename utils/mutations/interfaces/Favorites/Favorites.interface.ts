import { IAllgiftsResponse } from 'utils/queries/interfaces/Catalog/AllGifts.interface';
import { IMoreSuitableGiftsResponse } from 'utils/queries/interfaces/Catalog/MoreSuitableGifts.interface';

export interface IFavoritesResponse {
    success: boolean;
    data: [];
    message: string;
}

export interface IFavoritesErrorResponse {
    message: string;
}

export interface IMoreSuitableGiftsContext {
    previousMoreSuitableGifts: IMoreSuitableGiftsResponse;
}

export interface IAllGiftsInfiniteResponse {
    pageParams: Array<number | undefined>;
    pages: Array<IAllgiftsResponse>;
}

export interface IAllGiftsContext {
    previousAllGifts: IAllGiftsInfiniteResponse;
}
