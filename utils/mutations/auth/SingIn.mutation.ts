import { useMutation } from 'react-query';
import { API } from 'utils/api/api.util';
import {
    ISignInInput,
    ISignInRespon,
} from '../interfaces/Auth/SingInInput.interface';

export const singInMutation = async (
    signInInput: ISignInInput,
): Promise<ISignInRespon> => {
    const response = await API.post<ISignInRespon>('api/v1/auth/login/vk', {
        access_token: signInInput.accessToken,
        expires_in: signInInput.expiresIn,
        vk_user_id: signInInput.userId,
        email: signInInput.email,
    });
    if (response.data.success) {
        return response.data;
    }
    throw new Error('Network response with Error');
};

export const useSingInMutation = () => {
    return useMutation(singInMutation);
};
