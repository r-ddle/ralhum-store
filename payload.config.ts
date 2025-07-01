import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

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
  },

  collections: [Users],

  editor: lexicalEditor({}),

  secret: process.env.PAYLOAD_SECRET || "temp-secret-key-for-dev",

  sharp,
});
