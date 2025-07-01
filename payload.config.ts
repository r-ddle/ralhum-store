import { buildConfig } from "payload";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import path from "path";

// Import collections
import { Users } from "./src/payload/collections/Users";
import { Products } from "./src/payload/collections/Products";
import { Categories } from "./src/payload/collections/Categories";
import { Brands } from "./src/payload/collections/Brands";
import { News } from "./src/payload/collections/News";
import { CompanyInfo } from "./src/payload/collections/CompanyInfo";
import { HomepageContent } from "./src/payload/collections/HomepageContent";
import { Media } from "./src/payload/collections/Media";

export default buildConfig({
  // Admin configuration
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "@": path.resolve(__dirname, "./"),
        },
      },
    }),
    meta: {
      titleSuffix: "- Ralhum Sports Dashboard",
      favicon: "/favicon.ico",
      ogImage: "/ralhum-logo.png",
    },
    css: path.resolve(__dirname, "src/payload/styles/admin.css"),
  },

  // Collections
  collections: [
    Users,
    Products,
    Categories,
    Brands,
    News,
    CompanyInfo,
    HomepageContent,
    Media,
  ],

  // Database configuration
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    },
  }),

  // Rich text editor
  editor: lexicalEditor({}),

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },

  // GraphQL configuration
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },

  // CORS configuration
  cors: [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    process.env.NEXT_PUBLIC_SERVER_URL || "",
    "http://localhost:3000",
    "https://localhost:3000",
  ].filter(Boolean),

  // CSRF configuration
  csrf: [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    process.env.NEXT_PUBLIC_SERVER_URL || "",
    "http://localhost:3000",
    "https://localhost:3000",
  ].filter(Boolean),

  // Plugins
  plugins: [
    seoPlugin({
      collections: ["products", "news"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) =>
        `${doc?.title?.value || doc?.name?.value || "Untitled"} | Ralhum Sports`,
      generateDescription: ({ doc }) =>
        doc?.excerpt?.value ||
        doc?.description?.value ||
        "Ralhum Sports - Premium Sports Equipment",
    }),
  ],

  // Server URL
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",

  // Localization (optional, for future multi-language support)
  localization: {
    locales: ["en"],
    defaultLocale: "en",
    fallback: true,
  },

  // Rate limiting
  rateLimit: {
    max: 500,
    trustProxy: true,
  },

  // Email configuration (for password resets, etc.)
  email: {
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
    fromName: "Ralhum Sports Dashboard",
    fromAddress: process.env.SMTP_FROM || "noreply@ralhumsports.com",
  },
});
