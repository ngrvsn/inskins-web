import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '*'
    }]
  },
  webpack: (config: any) => {
    config.externals.push({ canvas: 'commonjs canvas' })
    return config
  },
  output: 'standalone' // https://nextjs.org/docs/pages/api-reference/next-config-js/output
}

export default nextConfig
