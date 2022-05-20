export interface ISignInInput {
    access_token: string;
    expires_in: string;
    user_id: string;
    email: string | null;
}

export interface IResponse {
    access_token: string;
    expires_in: number;
    vk_user_id: number;
    email: string;
}

export interface ISignInResponse {
    success: boolean;
    data: IResponse;
    message: string;
}
