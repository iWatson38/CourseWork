import { IGift } from 'utils/queries/Catalog/Catalog.types';

export interface IFavoritesResponse {
    success: boolean;
    data: Array<IGift>;
    message: string;
}
