const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb',
    },
  },
  images: {
    domains: ['img.youtube.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
