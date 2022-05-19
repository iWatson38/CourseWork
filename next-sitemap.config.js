/** @type {import('next-sitemap').IConfig} */

const axios = require('axios');

const siteUrl = process.env.NEXT_PUBLIC_APP_URL;
const friendsIdUrl = process.env.NEXT_PUBLIC_FRIENDS_ID_API_URL;

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/singIn', '/favorites', '/friends'],
            },
        ],
    },
    additionalPaths: async (config) => {
        const { data: friendsIdList } = await axios.get(
            `${friendsIdUrl}/api/v2/users`,
        );
        const fields = friendsIdList.data.map((friendId) => ({
            loc: `${siteUrl}/catalog/${friendId}`,
            lastmod: new Date().toISOString(),
        }));
        return fields;
    },
    exclude: ['/signIn', '/favorites', '/friends'],
};
