/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/@:author",
        destination: "/:author",
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
