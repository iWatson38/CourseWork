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

export interface IAllgiftsResponse {
    success: boolean;
    data: Array<IAllGifts> | [];
    message: string;
}
