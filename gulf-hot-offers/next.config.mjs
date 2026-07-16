/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Demo images are inline SVG data URIs, so remote patterns are only needed
    // once a real product-image CDN (e.g. Cloudinary / imgix) is connected.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
