/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'conspix.tv', 'sorcery.exposed'],
  },

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  sassOptions: {
    includePaths: ['./styles'],
  },
}

module.exports = nextConfig