export interface IAllGifts {
    id: number;
    name: string;
    description: string;
    link: string;
    img: string;
    price: number;
    is_favorite: boolean;
    category: number;
}

export interface IAllGiftsData {
    curr_page: number;
    items: Array<IAllGifts>;
}

export interface IAllgiftsResponse {
    success: boolean;
    data: IAllGiftsData;
    message: string;
}
