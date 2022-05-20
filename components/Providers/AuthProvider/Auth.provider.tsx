import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { API } from 'utils/api/api.util';

const noop = () => {
    debugger;
};

export type TAuthContext = {
    logout: () => void;
    signIn: (token: string, expiresIn: number) => void;
    signInRedirect: () => void;
    isAuth: boolean;
};

const AuthContext = createContext<TAuthContext>({
    logout: noop,
    signIn: noop,
    signInRedirect: noop,
    isAuth: false,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

interface IAuthProvider {
    children: ReactNode;
}

export function AuthProvider({ children }: IAuthProvider) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(cookies.access_token));
    const router = useRouter();

    const signIn = (token: string, expiresIn: number) => {
        setCookie('access_token', token, {
            maxAge: expiresIn || 36900,
        });
        setIsLoggedIn(true);
    };

    const logout = () => {
        removeCookie('access_token');
        setIsLoggedIn(false);
    };

    const signInRedirect = () => {
        if (!isLoggedIn) {
            const params = {
                client_id: `${process.env.NEXT_PUBLIC_VK_APP_ID}`,
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/signIn`,
                scope: ['friends', 'email', 'groups', 'offline'].join(','),
                response_type: 'token',
                display: 'popup',
                v: '5.131',
            };

            const queryParams = new URLSearchParams(params);

            window.location.href = `https://oauth.vk.com/authorize?${queryParams.toString()}`;
        } else {
            router.push('/friends', undefined, { scroll: false });
        }
    };

    useEffect(() => {
        if (cookies.access_token) {
            API.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${cookies.access_token}`;
        }
    }, [cookies]);

    const context: TAuthContext = {
        isAuth: isLoggedIn,
        logout,
        signIn,
        signInRedirect,
    };

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
}
