import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";
import path from "path";

// Import collections
import { Users } from "./src/payload/collections/Users";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(__dirname),
    },
  },

  collections: [Users],

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

  cors: ["http://localhost:3000"],

  csrf: ["http://localhost:3000"],

  sharp,
});
