import SMain from './index.module.scss';
import { useEffect, useState } from 'react';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';
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
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useCookies } from 'react-cookie';
import { useModals } from 'components/Providers/ModalsProvider/Modals.provider';
import Head from 'next/head';
import { LoaderComponent } from 'components/Loaders/Loader/Loader.component';
import { NavBarComponent } from 'components/Layout/NavBar/NavBar.component';
import { RequestSurveyComponent } from 'components/Layout/RequestSurvey/RequestSurvey.component';
import SCommon from 'styles/Common.module.scss';
import { MenuConstant } from 'constants/Menu.constant';
import { FooterComponent } from 'components/Layout/Footer/Footer.component';

const LogoForMeta = '/NavBar/LogoForMeta.png';

export interface IView {
    isAuth: boolean;
}

const MainView: React.FC<IView> = ({ isAuth }) => {
    const [cookies] = useCookies();
    const router = useRouter();
    const modals = useModals();

    const { data: Faq } = useGetFaq();

    const handleError = (message: string) => {
        switch (message) {
            case `Request failed with status code 403`:
                modals.toogleClosedFriendModal();
                break;
            case 'Request failed with status code 500':
                modals.toogleSearchNameModal();
                break;
            default:
                console.log(message);
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

    useEffect(() => {
        if (friendData?.success) {
            setVisibleLoader((prev) => !prev);
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

    const [visibleLoader, setVisibleLoader] = useState(false);

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
                />
            </Head>
            <NavBarComponent
                isAuth={isAuth || false}
                className={SCommon.Container}
                menuItems={MenuConstant(isAuth || false)}
            />
            <RequestSurveyComponent />
            <main className={SMain.Main}>
                <LoaderComponent visible={visibleLoader} />
                <BreadcrumbsComponent
                    crumbList={[]}
                    className={SMain.Breadcrumbs}
                />
                <h1 className={SMain.Title}>
                    Сервис подбора подарков для ваших друзей
                </h1>
                <h2 className={SMain.SearchBlockTitle}>Кому дарим подарок?</h2>
                <SearchBlockComponent
                    className={SMain.SearchBlock}
                    onSearch={handleSearch}
                />
                <GiftsForStarsComponent
                    setLoader={() => setVisibleLoader((prev) => !prev)}
                />
                <MagicStepsComponent
                    className={SMain.Steps}
                    title="Как это работает?"
                    steps={steps}
                />
                <FaqComponent faq={Faq?.data} className={SMain.Faq} />
            </main>
            <FooterComponent shareBlock />
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
