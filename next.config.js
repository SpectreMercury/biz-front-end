/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/user/email/registration',
        destination: 'http://124.223.105.57:8883/user/email/registration',
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['i.imgs.ovh'],
  },
}

module.exports = nextConfig
