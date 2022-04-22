import SMain from './index.module.scss';
import SCommon from 'styles/Common.module.scss';
import {
    EResponseModalType,
    ResponseModalComponent,
} from 'components/Modals/ResponseModal/ResponseModal.component';
import { useEffect, useState } from 'react';
import { LogInOfferModalComponent } from 'components/Modals/LogInOfferModal/LogInOfferModal.component';
import {
    AuthProvider,
    useAuth,
} from 'components/Providers/AuthProvider/Auth.provider';
import { dehydrate, DehydratedState, QueryClient, useQuery } from 'react-query';
import {
    getOneFriend,
    useGetOneFriend,
} from 'utils/queries/Friends/OneFriend.query';
import { BreadcrumbsComponent } from 'components/Breadcrumbs/Breadcrumbs.component';
import {
    ISearchFields,
    SearchBlockComponent,
} from 'components/MainView/SearchBlock/SearchBlock.component';
import { GiftsForStarsComponent } from 'components/MainView/GiftsForStars/GiftsForStars.component';
import { MagicStepsComponent } from 'components/MainView/MagicSteps/MagicSteps.component';
import { FaqComponent } from 'components/Common/Faq/Faq.component';
import { IFaqResponse } from 'utils/queries/interfaces/Faq.interface';
import { getFaq, useGetFaq } from 'utils/queries/Faq/Faq.query';
import { MainLayoutComponent } from 'components/Layout/MainLayout/MainLayout.component';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CookiesProvider } from 'react-cookie';
import { API } from 'utils/api/api.util';

export const getServerSideProps: GetServerSideProps = async (): Promise<{
    props: { dehydratedState: DehydratedState };
}> => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('faq', getFaq);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

const MainView: React.FC = () => {
    const { data: Faq } = useGetFaq();

    const router = useRouter();

    const { isAuth, signInRedirect } = useAuth();

    const [link, setLink] = useState('');

    const { data: friendData, error } = useGetOneFriend(19235, !!link, link);

    const handleSearch = (values: ISearchFields) => {
        setLink(values.link);
    };

    const [visibleModal, setVisibleModal] = useState(false);
    const toogleVisibleModal = () => {
        setVisibleModal((prev) => !prev);
    };

    const [visibleAuthModal, setVisibleAuthModal] = useState(false);
    const toogleVisibleAuthModal = () => {
        if (!isAuth) {
            setVisibleAuthModal((prev) => !prev);
        }
    };

    const [message, setMessage] = useState('');

    const setModal = (message: string) => {
        setMessage(message);
        setVisibleModal(true);
    };

    const counterTries = () => {
        if (!sessionStorage.getItem('Tries')) {
            sessionStorage.setItem('Tries', '0');
        } else if (Number(sessionStorage.getItem('Tries')) < 3) {
            sessionStorage.setItem(
                'Tries',
                `${Number(sessionStorage.getItem('Tries')) + 1}`,
            );
        }
    };

    useEffect(() => {
        if (
            sessionStorage.getItem('Tries') &&
            Number(sessionStorage.getItem('Tries')) === 3 &&
            !isAuth
        ) {
            setModal(
                'Мы надеемся, что тебе понравился наш сервис, пожалуйста, авторизуйся, чтобы иметь неограниченное количество поисков.',
            );
        } else if (friendData?.success) {
            counterTries();
            router.push(`/friends/${friendData.data[0].vk_id}`);
        } else {
            console.log(friendData);
        }
    }, [friendData?.success]);

    const steps = [
        'Вставь ник друга во ВКонтакте или ссылку на его страницу',
        'Шаман проанализирует его интересы',
        'Теперь можешь выбирать подарок!',
    ];

    console.log(API);

    return (
        <AuthProvider>
            <CookiesProvider>
                <MainLayoutComponent>
                    <main className={SMain.Main}>
                        <ResponseModalComponent
                            type={EResponseModalType.ERROR}
                            visible={visibleModal}
                            description={'message'}
                            onClose={toogleVisibleModal}
                        />
                        <LogInOfferModalComponent
                            startPartMessage="К сожалению, сервис пока не умеет искать подарки по имени, но мы работаем над этим! А пока можешь "
                            link="авторизоваться"
                            finishPartMessage="или вставить ссылку на страницу друга в ВК."
                            visible={visibleAuthModal}
                            handleAuthClick={signInRedirect}
                            onClose={toogleVisibleAuthModal}
                        />
                        <BreadcrumbsComponent
                            crumbList={[]}
                            className={SMain.Breadcrumbs}
                        />
                        <h1 className={SMain.Title}>
                            Сервис подбора подарков для ваших друзей
                        </h1>
                        <p className={SMain.SearchBlockTitle}>
                            Кому дарим подарок?
                        </p>
                        <SearchBlockComponent
                            className={SMain.SearchBlock}
                            onSearch={handleSearch}
                        />
                        <GiftsForStarsComponent />
                        <MagicStepsComponent
                            className={SMain.Steps}
                            title="Как это работает?"
                            steps={steps}
                        />
                        <FaqComponent faq={Faq?.data} className={SMain.Faq} />
                    </main>
                </MainLayoutComponent>
            </CookiesProvider>
        </AuthProvider>
    );
};

export default MainView;
