import { IAllGifts } from '../Catalog/AllGifts.interface';

export interface IFavoritesResponse {
    success: boolean;
    data: Array<IAllGifts> | any[];
    message: string;
}
