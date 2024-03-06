import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
  experimental: {
    optimizePackageImports: ['antd', 'lodash-es', 'ahooks', '@ant-design/icons'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
}

// const millionConfig = {
//   auto: {
//     threshold: 0.05, // default: 0.1,
//     skip: ['useBadHook', /badVariable/g], // default []
//     // if you're using RSC: auto: { rsc: true },
//   },
// }

export default nextConfig
