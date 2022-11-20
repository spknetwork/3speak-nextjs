/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.hive.blog',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
        {
            source: '/@:author',
            destination: '/:author'
        }
    ];
}
}

module.exports = nextConfig
