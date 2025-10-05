/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "img.clerk.com" },
      { hostname: "cdn.sanity.io" },
      { hostname: "i.scdn.co" },
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
    ],
  },
  pageExtensions: ["js", "jsx", "mdx"],
};

export default nextConfig;
