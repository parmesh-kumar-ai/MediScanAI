/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverActions: {
    bodySizeLimit: '30mb',
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
