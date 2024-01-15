import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        // Option format
        '*.md': [
          {
            loader: '@mdx-js/loader',
            options: {
              format: 'md',
            },
          },
        ],
        // Option-less format
        '*.mdx': ['@mdx-js/loader'],
      },
    },
  },
  redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'token',
            value: 'false',
          },
        ],
        destination: '/login',
        permanent: false,
      },
    ]
  },
}

const millionConfig = {
  auto: true, // if you're using RSC: auto: { rsc: true },
}

export default million.next(nextConfig, millionConfig)
