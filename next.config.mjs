/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.dummyjson.com", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/products/images/**",
      },
    ],
  },
};

export default nextConfig;
