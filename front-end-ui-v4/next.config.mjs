/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Skips ESLint entirely
      },
      typescript: {
        ignoreBuildErrors: true, // Ignores TypeScript errors in production builds
      },
};

export default nextConfig;
