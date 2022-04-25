import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSingInMutation } from 'utils/mutations/Auth/SingIn.mutation';
import { PageLoaderComponent } from 'components/Loaders/PageLoader/PageLoader.component';

const SignInView: React.FC = () => {
    // HOOKS
    const router = useRouter();

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
    const { mutate } = useSingInMutation();

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
