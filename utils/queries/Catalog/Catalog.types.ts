// All gifts types
export interface IGift {
    id: number;
    name: string;
    description: string;
    link: string;
    img: string;
    price: number;
    is_favorite: boolean;
}

export interface IAllGifts {
    curr_page: number;
    items: Array<IGift>;
}

export interface IAllGiftsResponse {
    success: boolean;
    data: IAllGifts;
    message: string;
}

// More suitable gifts
export interface IMoreSuitableGifts {
    generic_name: string;
    offers: Array<IGift>;
}

export interface IMoreSuitableGiftsResponse {
    success: boolean;
    data: Array<IMoreSuitableGifts>;
    message: string;
}
