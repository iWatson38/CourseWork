import React, { Suspense } from 'react';
import 'styles/Globals.scss';
import 'assets/fonts/Montserrat/Montserrat.font.scss';
import 'swiper/css';
import 'swiper/scss/navigation';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { AuthProvider } from 'components/Providers/AuthProvider/Auth.provider';
import { CookiesProvider } from 'react-cookie';
import { ModalsProvider } from 'components/Providers/ModalsProvider/Modals.provider';
import SCommon from 'styles/Common.module.scss';
import { PageLoaderComponent } from 'components/Loaders/PageLoader/PageLoader.component';

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <div className={SCommon.Root}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <CookiesProvider>
                        <AuthProvider>
                            <ModalsProvider>
                                <Suspense fallback={<PageLoaderComponent />}>
                                    <Component {...pageProps} />
                                </Suspense>
                            </ModalsProvider>
                        </AuthProvider>
                    </CookiesProvider>
                </Hydrate>
            </QueryClientProvider>
        </div>
    );
}

export default MyApp;
