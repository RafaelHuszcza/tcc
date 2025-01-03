/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, 'bcryptjs']
    return config
  },
  output: 'standalone',
  reactStrictMode: false,
};

export default nextConfig;
