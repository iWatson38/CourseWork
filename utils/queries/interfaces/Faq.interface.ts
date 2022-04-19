interface IFaq {
    id: number;
    question: string;
    answer: string;
}

export interface IFaqResponse {
    success: boolean;
    data: Array<IFaq>;
    message: string;
}
