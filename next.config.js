/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

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


module.exports = withPWA(nextConfig)
