import SMain from './index.module.scss';
import {
    EResponseModalType,
    ResponseModalComponent,
} from 'components/Modals/ResponseModal/ResponseModal.component';
import { useEffect, useState } from 'react';
import { LogInOfferModalComponent } from 'components/Modals/LogInOfferModal/LogInOfferModal.component';
import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';
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
import { IFaqResponse } from 'utils/queries/interfaces/Faq/Faq.interface';
import { getFaq, useGetFaq } from 'utils/queries/Faq/Faq.query';
import { MainLayoutComponent } from 'components/Layout/MainLayout/MainLayout.component';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useCookies } from 'react-cookie';

export interface IView {
    isAuth: boolean;
}

const MainView: React.FC<IView> = ({ isAuth }) => {
    const [cookies] = useCookies();
    const { data: Faq } = useGetFaq();

    const router = useRouter();

    const { signInRedirect } = useAuth();

    const [link, setLink] = useState('');

    const { data: friendData } = useGetOneFriend(19235, link);

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
        <MainLayoutComponent isAuth={isAuth}>
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
                <p className={SMain.SearchBlockTitle}>Кому дарим подарок?</p>
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
