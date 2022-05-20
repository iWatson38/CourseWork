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
} from 'utils/queries/Friends/AllFriends.query';
import { IView } from 'pages';
import { Friend } from 'components/FriendsView/Friend/Friend.component';
import { useInView } from 'react-intersection-observer';
import { LoaderComponent } from 'components/Loaders/Loader/Loader.component';

const FriendsView: React.FC<IView> = ({ isAuth }) => {
    const listRef = useRef<HTMLUListElement>(null);
    const { ref: endBlockRef, inView } = useInView();

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

    const { data: friendsData, fetchNextPage } = useGetInfiniteFriends(
        name,
        16,
    );

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    const handleSearch = (values: ISearchFields) => {
        setName(values.search);
    };

    useEffect(() => {
        if (!cookies.access_token) {
            router.push('/', undefined, { scroll: false });
        }
    }, [cookies]);

    const breadcrumbs: Array<ICrumb> = [
        {
            name: 'Друзья',
            path: '/friends',
        },
    ];

    const [visibleLoader, setVisibleLoader] = useState(false);

    return (
        <MainLayoutComponent isAuth={isAuth}>
            <LoaderComponent visible={visibleLoader} />
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
                    <ul ref={listRef} className={SFriendsView.FriendsArea}>
                        {friendsData?.pages.map((page) =>
                            page.data.items.map((friend) => (
                                <Friend
                                    id={friend.vk_id}
                                    key={`${friend.vk_id}${friend.first_name}Friend`}
                                    userAvatar={friend.photo_100}
                                    userName={`${friend.first_name} ${friend.last_name}`}
                                    setVisibleLoader={() =>
                                        setVisibleLoader(true)
                                    }
                                />
                            )),
                        )}
                    </ul>
                    <div ref={endBlockRef} />
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
