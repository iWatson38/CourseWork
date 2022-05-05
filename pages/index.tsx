import SMain from './index.module.scss';
import {
    EResponseModalType,
    ResponseModalComponent,
} from 'components/Modals/ResponseModal/ResponseModal.component';
import { useEffect, useState } from 'react';
import { dehydrate, DehydratedState, QueryClient, useQuery } from 'react-query';
import { useGetOneFriend } from 'utils/queries/Friends/OneFriend.query';
import { BreadcrumbsComponent } from 'components/Breadcrumbs/Breadcrumbs.component';
import {
    ISearchFields,
    SearchBlockComponent,
} from 'components/MainView/SearchBlock/SearchBlock.component';
import { GiftsForStarsComponent } from 'components/MainView/GiftsForStars/GiftsForStars.component';
import { MagicStepsComponent } from 'components/MainView/MagicSteps/MagicSteps.component';
import { FaqComponent } from 'components/Common/Faq/Faq.component';
import { getFaq, useGetFaq } from 'utils/queries/Faq/Faq.query';
import { MainLayoutComponent } from 'components/Layout/MainLayout/MainLayout.component';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useCookies } from 'react-cookie';
import { useModals } from 'components/Providers/ModalsProvider/Modals.provider';
import Head from 'next/head';

const LogoForMeta = '/NavBar/LogoForMeta.png';

export interface IView {
    isAuth: boolean;
}

const MainView: React.FC<IView> = ({ isAuth }) => {
    const [cookies] = useCookies();
    const router = useRouter();
    const modals = useModals();

    const { data: Faq } = useGetFaq();

    const counterTries = () => {
        if (!localStorage.getItem('Tries')) {
            localStorage.setItem('Tries', '0');
        } else if (Number(localStorage.getItem('Tries')) < 3) {
            localStorage.setItem(
                'Tries',
                `${Number(localStorage.getItem('Tries')) + 1}`,
            );
        }
    };

    const handleError = (message?: string) => {
        switch (message) {
            case `the user is deleted, or the user's page is closed or the nickname is not correct`:
                modals.toogleClosedFriendModal();
                break;
            case 'error':
                modals.toogleSearchNameModal();
                break;
            case 'success':
                if (isAuth) {
                    localStorage.setItem('Tries', '0');
                } else {
                    Number(localStorage.getItem('Tries')) === 3
                        ? modals.toogleLogInOfferModal()
                        : counterTries();
                }
                break;
            default:
                modals.toggleErrorModal();
        }
    };

    const [link, setLink] = useState('');
    const [fetch, setFetching] = useState(false);

    const handleSearch = (values: ISearchFields) => {
        setLink(values.link);
        setFetching(true);
    };

    const { data: friendData, refetch } = useGetOneFriend(
        19235,
        handleError,
        link,
    );

    const [visibleModal, setVisibleModal] = useState(false);
    const toogleVisibleModal = () => {
        setVisibleModal((prev) => !prev);
    };

    useEffect(() => {
        if (
            friendData?.success &&
            Number(localStorage.getItem('Tries')) !== 3
        ) {
            router.push(`/catalog/${friendData?.data?.vk_id}`);
        }
    }, [friendData]);

    useEffect(() => {
        if (link !== '') {
            refetch();
            setFetching(false);
        }
    }, [fetch]);

    useEffect(() => {
        if (!cookies.access_token) {
            router.push('/');
        }
    }, [cookies]);

    const steps = [
        'Вставь ник друга во ВКонтакте или ссылку на его страницу',
        'Шаман проанализирует его интересы',
        'Теперь можешь выбирать подарок!',
    ];

    return (
        <>
            <Head>
                <meta property="og:url" content="https://www.shaman.to" />
                <meta
                    property="og:title"
                    content="Шаман – Сервис умного подбора подарков. Знаем, что подарить"
                />
                <meta
                    property="og:description"
                    content="Подбор подарков для друзей и знакомых по профилю Вконтакте. Автоматически подберем подарок, который понравится его обладателю."
                />
                <meta property="og:image" content={LogoForMeta} />

                <title>
                    Шаман знает, что подарить другу. Умный поиск подарков.
                </title>
                <meta
                    name="description"
                    content="Сервис подбора подарков на базе цифрового профиля пользователя. Укажите ник пользователя и получите рекомендуемые подарки с учетом его интересов."
                ></meta>
            </Head>
            <MainLayoutComponent isAuth={isAuth}>
                <main className={SMain.Main}>
                    <ResponseModalComponent
                        type={EResponseModalType.ERROR}
                        visible={visibleModal}
                        description={'message'}
                        onClose={toogleVisibleModal}
                    />
                    <BreadcrumbsComponent
                        crumbList={[]}
                        className={SMain.Breadcrumbs}
                    />
                    <h1 className={SMain.Title}>
                        Сервис подбора подарков для ваших друзей
                    </h1>
                    <h2 className={SMain.SearchBlockTitle}>
                        Кому дарим подарок?
                    </h2>
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
        </>
    );
};

export default MainView;

export const getServerSideProps: GetServerSideProps = async (
    context,
): Promise<{
    props: { isAuth: boolean; dehydratedState: DehydratedState };
}> => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('faq', getFaq);

    return {
        props: {
            isAuth: !!context.req.cookies.access_token,
            dehydratedState: dehydrate(queryClient),
        },
    };
};
