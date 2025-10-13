/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      { hostname: "img.clerk.com" },
      { hostname: "cdn.sanity.io" },
      { hostname: "i.scdn.co" },
      { hostname: "avatars.githubusercontent.com" },
    ],
    domains: [
      'aioverviews.ir',
      'mahoganyacademy.de',
      'tehranmu.de',
      'riahin.com',
      'iranrayeha.com',
      'parsianclinic.de',
      'wizardry.ir',
      'www.google.com',
      'avatars.githubusercontent.com',
    ],
  },
  pageExtensions: ["js", "jsx", "mdx"],
    webpack: (config, { dev, isServer }) => {
    config.devtool = false;

    return config;
  },
};

export default nextConfig;
