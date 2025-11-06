/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/ishanportfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ishanportfolio/' : '',
};
export default nextConfig;
