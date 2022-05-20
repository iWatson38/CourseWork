export interface IFeedbackOnGoodPostInput {
    vk_friend_id: number;
    product_id: number;
    text: string;
}

export interface IFeedbackOnGoodPostRespose {
    success: boolean;
    data: [];
    message: string;
}
