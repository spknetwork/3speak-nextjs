/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "magic-sdk",
  "@magic-sdk/provider",
  "@magic-sdk/types",
  "@magic-sdk/commons",
]);


module.exports = withTM({
  reactStrictMode: true,
  images: {
    // domains: ['*'],
    domains: [ "bworldonline.com", "www.bworldonline.com", "images.hive.blog","s3.eu-central-1.wasabisys.com", "files.peakd.com", "https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.hive.blog",
    //     port: "",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "s3.eu-central-1.wasabisys.com",
    //   },
    // ],
  },
  async rewrites() {
    return [
      {
        source: "/@:author",
        destination: "/:author",
      },
    ];
  },
});

const nextConfig = {
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
