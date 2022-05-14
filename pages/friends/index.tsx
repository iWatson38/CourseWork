import React, { useEffect, useRef, useState } from 'react';
import SCommon from 'styles/Common.module.scss';
import { useErrorHandler } from 'hooks/ErrorHandler.hook';
import {
    BreadcrumbsComponent,
    ICrumb,
} from 'components/Breadcrumbs/Breadcrumbs.component';
import {
    ISearchFields,
    SearchBlockComponent,
} from 'components/FriendsView/SearchBlock/SearchBlock.component';
import { FriendsAreaComponent } from 'components/FriendsView/FriendsArea/FriendsArea.component';
import SFriendsView from './index.module.scss';
import { getUser, useGetUser } from 'utils/queries/User/User.query';
import { GetServerSideProps } from 'next';
import { API } from 'utils/api/api.util';
import { useCookies } from 'react-cookie';
import { MainLayoutComponent } from 'components/Layout/MainLayout/MainLayout.component';
import { useRouter } from 'next/router';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';
import {
    getInfiniteFriends,
    useGetInfiniteFriends,
} from 'utils/queries/Friends/Friends.query';
import { IView } from 'pages';

const FriendsView: React.FC<IView> = ({ isAuth }) => {
    useEffect(() => {
        if (cookies.access_token) {
            API.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${cookies.access_token}`;
        }
    }, []);

    const router = useRouter();
    const [cookies] = useCookies();

    const { data: userData, error } = useGetUser();
    useErrorHandler(error);

    const [name, setName] = useState('');
    const [fetch, setFetch] = useState(false);

    const {
        data: friendsData,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetInfiniteFriends(name, 16);

    useEffect(() => {
        if (fetch && !isFetchingNextPage) {
            fetchNextPage();
        }
        setFetch(false);
    }, [fetch, isFetchingNextPage]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return removeEventListener('scroll', scrollHandler);
    }, []);

    const scrollHandler = (event: Event) => {
        if (
            (event.target as Document).documentElement.scrollHeight -
                ((event.target as Document).documentElement.scrollTop +
                    window.innerHeight) <
            430
        ) {
            setFetch(true);
        } else {
            setFetch(false);
        }
    };

    const handleSearch = (values: ISearchFields) => {
        setName(values.search);
    };

    useEffect(() => {
        if (!cookies.access_token) {
            router.push('/');
        }
    }, [cookies]);

    const breadcrumbs: Array<ICrumb> = [
        {
            name: 'Друзья',
            path: '/friends',
        },
    ];

    return (
        <MainLayoutComponent isAuth={isAuth}>
            <main className={SFriendsView.Friends}>
                <div className={SCommon.Container}>
                    <BreadcrumbsComponent
                        crumbList={breadcrumbs}
                        className={SFriendsView.Breadcrumbs}
                    />
                    <h4 className={SFriendsView.Title}>
                        {`Привет, ${userData?.first_name}, кому ищем подарок?`}
                    </h4>

                    <SearchBlockComponent
                        className={SFriendsView.SearchBlockComponent}
                        onSearch={handleSearch}
                    />
                    {friendsData?.pages.map((page) => (
                        <React.Fragment key={page.data.current_page}>
                            <FriendsAreaComponent
                                className={SFriendsView.FriendsAreaContainer}
                                users={page.data.items}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </main>
        </MainLayoutComponent>
    );
};

export default FriendsView;

export const getServerSideProps: GetServerSideProps = async (
    context,
): Promise<{
    props: {
        isAuth: boolean;
        dehydratedState: DehydratedState;
    };
}> => {
    if (context.req.cookies.access_token) {
        API.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${context.req.cookies.access_token}`;
    }
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('user', getUser);
    await queryClient.prefetchInfiniteQuery(
        ['friends', '', 16],
        getInfiniteFriends('', 16),
    );
    return {
        props: {
            isAuth: !!context.req.cookies.access_token,
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
};
