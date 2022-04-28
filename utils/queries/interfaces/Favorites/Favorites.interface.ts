export interface IFavoritesCategory {
    id: number;
}

export interface IFavoritesGifts {
    id: number;
    name: string;
    description: string;
    link: string;
    price: number;
    img: string;
    category: IFavoritesCategory;
}

export interface IFavoritesResponse {
    success: boolean;
    data: Array<IFavoritesGifts>;
    message: string;
}
