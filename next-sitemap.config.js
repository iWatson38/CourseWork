const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', disallow: '/singIn' },
            { userAgent: '*', disallow: '/favorites' },
            { userAgent: '*', disallow: '/friends' },
            { userAgent: '*', allow: '/' },
        ],
        additionalSitemaps: [
            `${siteUrl}/sitemap.xml`,
            `${siteUrl}/server-sitemap.xml`,
        ],
    },
    exclude: ['/signIn', '/favorites', '/friends'],
};
