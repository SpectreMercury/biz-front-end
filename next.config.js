/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/user/email/registration',
  //       destination: 'http://124.223.105.57:8883/user/email/registration',
  //     },
  //   ]
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  images: {
    domains: ['nftstorage.link', 'bafybeibietdc7lxki2jeggdu5namnyisuujhgej2zsq26nn7orn2cngm6y.ipfs.nftstorage.link', 'bafkreicetd3xpmgbj33g7lovw6oh6xexlbsi76icghrb2y5i4e5igexyqy.ipfs.nftstorage.link', 'bafkreia54oepzxeu7uln5mo2wlp36rhinj2fed6lfou3tomdlyp6hfmobm.ipfs.nftstorage.link', 'bafkreibonzmrl3snslc2ijhees2hmd7xntb32vzlax6kllurpptvh5qsra.ipfs.nftstorage.link', 'bafkreiebnftam4dfgeaefwgzdmbabd4jcrvw46pgijn6b3qizglc56tmm4.ipfs.nftstorage.link', 'bafkreia7yso2i6bzd7ypcdl26zv3pncdansqwadnt5utd56bvnjjhbd5j4.ipfs.nftstorage.link', 'bafkreig6nroroczis7jvjeqyh4y2s4a54kqaifnjz2tuzm2jbl6madwif4.ipfs.nftstorage.link' , 'i.imgs.ovh', 'nftstorage.link', 's2.coinmarketcap.com'],
  },
}

module.exports = nextConfig
