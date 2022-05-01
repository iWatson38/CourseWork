/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: ['./styles'],
        prependData:
            '@import "styles/Colors.variables.scss"; @import "styles/Fonts.variables.scss";',
    },
};

module.exports = nextConfig;
