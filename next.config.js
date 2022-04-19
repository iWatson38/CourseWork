/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_URL: 'https://api.stage.shaman.to/',
        VK_APP_ID: 7761575,
        APP_URL: 'http://localhost:3000',
    },
    sassOptions: {
        includePaths: ['./styles'],
        prependData:
            '@import "styles/Colors.variables.scss"; @import "styles/Fonts.variables.scss";',
    },
};

module.exports = nextConfig;
