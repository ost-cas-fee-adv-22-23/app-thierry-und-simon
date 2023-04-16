/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['storage.googleapis.com', 'picsum.photos'],
  }
}

module.exports = nextConfig
