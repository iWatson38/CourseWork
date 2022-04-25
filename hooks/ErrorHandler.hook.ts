import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';
import { useEffect } from 'react';

export const useErrorHandler = (error?: Error | null) => {
    const { logout } = useAuth();

    useEffect(() => {
        if (error && error?.message === 'Request failed with status code 401') {
            logout();
        }
    }, [error, logout]);
};
