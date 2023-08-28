/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8888",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com"
      }
    ],
  },
};

module.exports = nextConfig;
