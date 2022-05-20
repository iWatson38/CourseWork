import { API } from 'utils/api/api.util';
import { ISignInInput, ISignInResponse } from './SignIn.types';

export const singInMutation = async (
    signInInput: ISignInInput,
): Promise<ISignInResponse> => {
    const response = await API.post<ISignInResponse>('api/v1/auth/login/vk', {
        access_token: signInInput.access_token,
        expires_in: signInInput.expires_in,
        vk_user_id: signInInput.user_id,
        email: signInInput.email,
    });
    if (response.data.success) {
        return response.data;
    }
    throw new Error('Network response with Error');
};
