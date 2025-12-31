/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    serverExternalPackages: ['@prisma/client', 'prisma'],
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client'],
    },
    // Skip API routes during static generation
    trailingSlash: false,
    generateBuildId: async () => {
        return 'stm-build-' + Date.now()
    },
};

module.exports = nextConfig;
