import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { friendsIdApi } from 'utils/api/api.util';

interface IFriendsIdResponce {
    success: boolean;
    data: number[];
    message: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data: friendsIdList } = await friendsIdApi.get<IFriendsIdResponce>(
        'api/v2/users',
    );

    const fields: ISitemapField[] = friendsIdList.data.map((friendId) => ({
        loc: `${process.env.NEXT_PUBLIC_APP_URL}/catalog/${friendId}`,
        lastmod: new Date().toISOString(),
    }));

    console.log('FriendsId: ', fields);

    return getServerSideSitemap(context, fields);
};

// This function is need for just make an tsx happy
export default function Site() {}
