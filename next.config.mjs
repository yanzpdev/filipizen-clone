/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      // 'www.filipizen.com',
      // 'lh3.googleusercontent.com',
      // 'platform-lookaside.fbsbx.com'
      {
        protocol: 'https',
        hostname: 'www.filipizen.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
