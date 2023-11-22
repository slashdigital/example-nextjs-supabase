/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en-US', 'km-KH'],
    defaultLocale: 'en-US',
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '',
          pathname: '/photo-**',
        },
        {
          protocol: 'https',
          hostname: 'kcviwgcjkuxtmsaypjcj.supabase.co',
          port: '',
          pathname: '/storage/**',
        },
      ],
    },
}

module.exports = nextConfig
