/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["source.unsplash.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
