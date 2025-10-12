/** @type {import('next').NextConfig} */
// import  nextI18NextConfig from './next-i18next.config.js';

const nextConfig = {
    // ...nextI18NextConfig,
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kabbik-space.sgp1.digitaloceanspaces.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kabbik-space.sgp1.cdn.digitaloceanspaces.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d3t3ozftmdmh3i.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // experimental: {
  //   serverActions: {
  //     allowedOrigins: ["localhost:8097"],
  //     // allowedForwardedHosts: ["localhost:3000"],
  //     // ^ You might have to use this property depending on your exact version.
  //   }
  // }
};

export default nextConfig;
