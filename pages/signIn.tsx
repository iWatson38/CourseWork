import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { singInMutation } from 'utils/mutations/Auth/SingIn.mutation';
import { PageLoaderComponent } from 'components/Loaders/PageLoader/PageLoader.component';
import { useMutation } from 'react-query';
import { useModals } from 'components/Providers/ModalsProvider/Modals.provider';
import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';

const SignInView: React.FC = () => {
    // HOOKS
    const router = useRouter();
    const modals = useModals();
    const { signIn: setupCookie } = useAuth();

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
    const { mutate } = useMutation(singInMutation, {
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
            access_token: signInInput.access_token,
            expires_in: signInInput.expires_in,
            user_id: signInInput.user_id,
            email: signInInput.email,
        });
    }, []);

    return <PageLoaderComponent />;
};

export default SignInView;
