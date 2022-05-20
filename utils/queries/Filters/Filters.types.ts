export interface IGeneric {
    id: number;
    name: string;
}

export interface IFilters {
    min_price: number;
    max_price: number;
    generics: Array<IGeneric>;
}

export interface IFiltersResponse {
    success: boolean;
    data: IFilters;
    message: string;
}
