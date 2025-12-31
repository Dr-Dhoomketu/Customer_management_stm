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
    // Skip API routes during static generation
    trailingSlash: false,
    generateBuildId: async () => {
        return 'stm-build-' + Date.now()
    },
    // Disable static optimization for API routes
    experimental: {
        isrMemoryCacheSize: 0,
    },
    // Skip pre-rendering API routes
    async rewrites() {
        return []
    },
};

module.exports = nextConfig;
