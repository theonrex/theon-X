/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};
const path = require("path");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.NEXT_PUBLIC_CRYPTOPANIC_AUTH_TOKEN}&public=true`,
      },
      {
        source: "/coins/:id*",
        destination: "https://api.coingecko.com/",
      },
      {
        source: "/coins/:id*",
        destination: "https://theon-x.vercel.app",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.icons8.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
module.exports = nextConfig;
