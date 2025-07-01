import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";
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
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(__dirname),
    },
    meta: {
      titleSuffix: "- Ralhum Sports Dashboard",
      favicon: "/favicon.ico",
    },
  },

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

  db: sqliteAdapter({
    client: {
      url: path.resolve(__dirname, "ralhum_sports.db"),
    },
  }),

  editor: lexicalEditor({}),

  secret: process.env.PAYLOAD_SECRET || "temp-secret-for-dev-only",

  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },

  plugins: [
    // seoPlugin will be added after initial setup
  ],

  cors: [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    process.env.NEXT_PUBLIC_SERVER_URL || "",
    "http://localhost:3000",
    "https://localhost:3000",
  ].filter(Boolean),

  csrf: [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    process.env.NEXT_PUBLIC_SERVER_URL || "",
    "http://localhost:3000",
    "https://localhost:3000",
  ].filter(Boolean),

  sharp,
});
