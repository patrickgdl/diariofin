/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  transpilePackages: ["@fluxozen/ui"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
