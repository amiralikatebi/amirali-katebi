
import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow' },
        ],
      },
      {
        source: '/((?!$).*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
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

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  clientsClaim: true,
});

export default withPWA(nextConfig);
