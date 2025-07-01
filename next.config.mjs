import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing config
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
    optimizePackageImports: ["@payloadcms/ui"],
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
      {
        source: "/admin",
        destination: "/admin/collections/products",
        permanent: false,
      },
    ];
  },

  // Webpack configuration for PayloadCMS
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("payload");
    }

    // Handle PayloadCMS modules
    config.resolve.alias = {
      ...config.resolve.alias,
      "payload-config": path.resolve(__dirname, "./payload.config.ts"),
    };

    return config;
  },
};

export default withPayload(nextConfig);
