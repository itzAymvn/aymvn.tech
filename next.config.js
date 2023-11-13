/** @type {import('next').NextConfig} */

const nextConfig = {
    async redirects() {
        return [
            {
                source: "/norage",
                destination: "https://xayman.net/norage",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
