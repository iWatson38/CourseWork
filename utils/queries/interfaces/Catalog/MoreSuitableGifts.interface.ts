export interface IOffer {
    id: number;
    name: string;
    description: string;
    link: string;
    img: string;
    price: number;
    is_favorite: boolean;
}

export interface IMoreSuitableGift {
    generic_name: string;
    offers: Array<IOffer>;
}

export interface IMoreSuitableGiftsResponse {
    success: boolean;
    data: Array<IMoreSuitableGift>;
    message: string;
}
