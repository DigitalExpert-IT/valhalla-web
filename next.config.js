/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/bangyosh-dev/image/upload/**",
      },
    ],
  },
  publicRuntimeConfig: {
    chain_id: process.env.NEXT_PUBLIC_CHAIN_ID,
    thirdweb_id: process.env.NEXT_PUBLIC_THIRDWEB,
    database_url: process.env.DATABASE_URL,
    telegram_invite_link: process.env.NEXT_PUBLIC_TELEGRAM_INVITE_LINK,
  },
};

module.exports = nextConfig;
