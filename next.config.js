/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['storage.googleapis.com', 'picsum.photos', 'cas-fee-advanced-ocvdad.zitadel.cloud'],
  },
  async redirects() {
    return [
      {
        source: '/mk-timeline',
        destination: '/',
        permanent: true,
      },
    ]
  }
}


module.exports = nextConfig
