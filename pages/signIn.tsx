import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSingInMutation } from 'utils/mutations/Auth/SingIn.mutation';
import {
    AuthProvider,
    useAuth,
} from 'components/Providers/AuthProvider/Auth.provider';
import { useModals } from 'components/Providers/ModalsProvider/Modals.provider';
import { PageLoaderComponent } from 'components/Loaders/PageLoader/PageLoader.component';
import { API } from 'utils/api/api.util';
import { CookiesProvider } from 'react-cookie';

const SignInView: React.FC = () => {
    // HOOKS
    const router = useRouter();
    const { signIn: setupCookie } = useAuth();
    const modals = useModals();

    const parsePathOnAnchors = (path: string) => {
        const signInInput: { [key: string]: string } = {};
        const temporary = path.split('#')[1].split('&');
        for (let i = 0; i < temporary.length; i++) {
            signInInput[temporary[i].split('=')[0]] =
                temporary[i].split('=')[1];
        }
        return signInInput;
    };

    // MUTATIONS
    const { mutate, data } = useSingInMutation();

    // EFFECTS
    useEffect(() => {
        const signInInput = parsePathOnAnchors(router.asPath);

        if (
            !signInInput.access_token ||
            !signInInput.expires_in ||
            !signInInput.user_id
        ) {
            router.push('/');
        }

        mutate({
            accessToken: signInInput.access_token || '',
            expiresIn: signInInput.expires_in || '',
            userId: signInInput.user_id || '',
            email: signInInput.email,
        });

        if (data?.success) {
            setupCookie(
                `${data.data.access_token}`,
                Number(signInInput.expires_in),
            );
            API.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${data.data.access_token}`;
            router.push('/friends');
        } else {
            modals?.toggleErrorModal();
        }
    }, [router.asPath]);

    return (
        <AuthProvider>
            <CookiesProvider>
                <PageLoaderComponent />
            </CookiesProvider>
        </AuthProvider>
    );
};

export default SignInView;
