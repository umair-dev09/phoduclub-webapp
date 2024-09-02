/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        });
        return config;
    }
};

module.exports = nextConfig;
