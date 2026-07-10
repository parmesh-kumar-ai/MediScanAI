/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
