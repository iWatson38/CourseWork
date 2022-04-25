import { useModals } from './../../../components/Providers/ModalsProvider/Modals.provider';
import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { API } from 'utils/api/api.util';
import {
    ISignInInput,
    ISignInResponse,
} from '../interfaces/Auth/SingInInput.interface';

const { signIn: setupCookie } = useAuth();
const router = useRouter();
const modals = useModals();

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

export const useSingInMutation = () => {
    return useMutation(singInMutation, {
        onSuccess: (data) => {
            if (data?.success) {
                setupCookie(
                    `${data.data.access_token}`,
                    Number(data.data.expires_in),
                );
                router.push('/friends');
            } else {
                modals?.toggleErrorModal();
            }
        },
    });
};
