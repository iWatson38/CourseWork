import { useMutation } from 'react-query';
import { API } from 'utils/api/api.util';

const singInMutation = async (
    access_token: string,
    expires_in: string,
    vk_user_id: string,
    email?: string,
) => {
    try {
        const respose = await API.post('api/v1/auth/login/vk', {
            access_token: access_token,
            expires_in: expires_in,
            vk_user_id: vk_user_id,
            email: email,
        });
        const singIn = respose.data;
        if (singIn.success) {
            return singIn;
        } else {
            return { success: false };
        }
    } catch (error) {
        return { success: false };
    }
};

export default function useSingInMutation(
    access_token: string,
    expires_in: string,
    vk_user_id: string,
    email?: string,
) {
    return useMutation(
        ['singIn', access_token, expires_in, vk_user_id, email],
        () => singInMutation(access_token, expires_in, vk_user_id, email),
    );
}
