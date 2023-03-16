
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
const path = require('path')

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://cryptopanic.com/api/v1/posts/?auth_token=08eaed58a4c964032efba9463b82ae360c214b3a&public=true",
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
module.exports = nextConfig