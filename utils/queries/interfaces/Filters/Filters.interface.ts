export interface IGenerics {
    id: number;
    name: string;
}

export interface IFilters {
    min_price: number;
    max_price: number;
    generics: Array<IGenerics>;
}

export interface IFiltersResponse {
    success: boolean;
    data: IFilters;
    message: string;
}
