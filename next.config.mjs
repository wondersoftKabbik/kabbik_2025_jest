/** @type {import('next').NextConfig} */
// import  nextI18NextConfig from './next-i18next.config.js';

const nextConfig = {
    // ...nextI18NextConfig,
  // experimental: {
  //   serverActions: true,
  // },
  images:{domains:[
    'kabbik-space.sgp1.digitaloceanspaces.com'
  ]},
  // experimental: {
  //   serverActions: {
  //     allowedOrigins: ["localhost:8097"],
  //     // allowedForwardedHosts: ["localhost:3000"],
  //     // ^ You might have to use this property depending on your exact version.
  //   }
  // }
};

export default nextConfig;
