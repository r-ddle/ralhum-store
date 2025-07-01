import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      // Add your domain here when deploying
      process.env.VERCEL_URL || "",
    ].filter(Boolean),
  },

  // Environment variables
  env: {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    DATABASE_URL: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  },

  // Experimental features for better performance
  experimental: {
    reactCompiler: false,
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects for better UX
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/admin",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
