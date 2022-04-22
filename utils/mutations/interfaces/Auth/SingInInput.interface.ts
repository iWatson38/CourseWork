export interface ISignInInput {
    accessToken: string;
    expiresIn: string;
    userId: string;
    email: string | null;
}

export interface IResponse {
    access_token: string;
    expires_in: number;
    vk_user_id: number;
    email: string;
}

export interface ISignInRespon {
    success: boolean;
    data: IResponse;
    message: string;
}
