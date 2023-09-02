/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    domains: ['api.exercisedb.io', 'placehold.co'],
  },
  experimental: {
    serverActions: true,
  },
};
