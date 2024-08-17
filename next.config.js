const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Ajoutez ici les domaines autorisés pour les images
  },
  env: {
    // Définissez ici vos variables d'environnement
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  },
  webpack: (config, { isServer }) => {
    // Configurations spécifiques à Webpack
    if (isServer) {
      // Configuration du code côté serveur
    } else {
      // Configuration du code côté client
    }
    return config;
  },
};

module.exports = withPlugins([withImages], nextConfig);
