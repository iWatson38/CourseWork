import React from 'react';
import 'styles/Globals.scss';
import 'assets/fonts/Montserrat/Montserrat.font.scss';
import 'swiper/css';
import 'swiper/scss/navigation';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { AuthProvider } from 'components/Providers/AuthProvider/Auth.provider';
import { CookiesProvider } from 'react-cookie';
import { ModalsProvider } from 'components/Providers/ModalsProvider/Modals.provider';

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <CookiesProvider>
                    <AuthProvider>
                        <ModalsProvider>
                            <Component {...pageProps} />
                        </ModalsProvider>
                    </AuthProvider>
                </CookiesProvider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
