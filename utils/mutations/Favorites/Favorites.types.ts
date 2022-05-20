import {
    IAllGiftsResponse,
    IMoreSuitableGiftsResponse,
} from 'utils/queries/Catalog/Catalog.types';

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
    pages: Array<IAllGiftsResponse>;
}

export interface IAllGiftsContext {
    previousAllGifts: IAllGiftsInfiniteResponse;
}
