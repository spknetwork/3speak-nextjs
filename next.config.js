/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.hive.blog',
        port: '',
        pathname: '/p/**',
      },
    ],
  }
}

module.exports = nextConfig
