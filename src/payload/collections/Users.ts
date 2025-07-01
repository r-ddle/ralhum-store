import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "role", "firstName", "lastName"],
  },
  access: {
    create: ({ req: { user } }) => {
      // Only admins can create users
      return user?.role === "admin";
    },
    read: ({ req: { user } }) => {
      // Users can read their own profile, admins can read all
      if (user?.role === "admin") return true;
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    update: ({ req: { user } }) => {
      // Users can update their own profile, admins can update all
      if (user?.role === "admin") return true;
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    delete: ({ req: { user } }) => {
      // Only admins can delete users
      return user?.role === "admin";
    },
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "product-manager",
      options: [
        {
          label: "Admin (Manager)",
          value: "admin",
        },
        {
          label: "Product Manager",
          value: "product-manager",
        },
      ],
      access: {
        create: ({ req: { user } }) => user?.role === "admin",
        update: ({ req: { user } }) => user?.role === "admin",
      },
    },
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "lastLogin",
      type: "date",
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeLogin: [
      ({ user }) => {
        // Update last login timestamp
        return {
          ...user,
          lastLogin: new Date(),
        };
      },
    ],
  },
  timestamps: true,
};
