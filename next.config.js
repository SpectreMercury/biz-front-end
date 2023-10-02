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
  }

module.exports = nextConfig
