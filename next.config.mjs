/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  experimental: {
    reactCompiler: false,
  },
};

export default nextConfig;
