import { buildConfig } from "payload";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";

// Simple Users collection for testing
const Users = {
  slug: "users",
  auth: true,
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "admin",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ],
};

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- Ralhum Sports Dashboard",
    },
  },

  collections: [Users],

  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL || "postgresql://localhost:5432/ralhum_sports",
    },
  }),

  editor: lexicalEditor({}),

  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },

  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
});
