import type { CollectionConfig } from "payload";

const isAdminOrProductManager = ({ req: { user } }) => {
  return user?.role === "admin" || user?.role === "product-manager";
};

export const Brands: CollectionConfig = {
  slug: "brands",
  admin: {
    useAsTitle: "brandName",
    defaultColumns: ["brandName", "status", "featured"],
    group: "E-commerce",
  },
  access: {
    create: isAdminOrProductManager,
    read: () => true, // Public read access
    update: isAdminOrProductManager,
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "brandName",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "The name of the brand",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, operation, data }) => {
            if (operation === "create" || operation === "update") {
              if (!value && data?.brandName) {
                return data.brandName
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
              }
            }
            return value;
          },
        ],
      },
    },
    {
      name: "brandDescription",
      type: "richText",
      admin: {
        description: "Detailed brand description and history",
      },
    },
    {
      name: "shortDescription",
      type: "textarea",
      maxLength: 160,
      admin: {
        description: "Brief brand description for previews",
      },
    },
    {
      name: "brandLogo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Brand logo image",
      },
    },
    {
      name: "brandCoverImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Brand cover/hero image",
      },
    },
    {
      name: "brandWebsite",
      type: "text",
      admin: {
        description: "Official brand website URL",
      },
      validate: (val) => {
        if (val && !val.match(/^https?:\/\/.+/)) {
          return "Please enter a valid URL starting with http:// or https://";
        }
        return true;
      },
    },
    {
      name: "heritage",
      type: "text",
      admin: {
        description: 'Brand heritage/founding information (e.g., "Since 1855")',
      },
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      admin: {
        description: "Categories this brand operates in",
      },
    },
    {
      name: "keyFeatures",
      type: "array",
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Key brand features or selling points",
      },
    },
    {
      name: "partnerships",
      type: "array",
      fields: [
        {
          name: "partnershipName",
          type: "text",
          required: true,
        },
        {
          name: "partnershipDescription",
          type: "text",
        },
      ],
      admin: {
        description: "Notable partnerships or sponsorships",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Feature this brand prominently",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Inactive",
          value: "inactive",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "displayOrder",
      type: "number",
      admin: {
        position: "sidebar",
        description: "Order in which brands are displayed",
      },
    },
    {
      name: "brandColor",
      type: "text",
      admin: {
        description: "Brand primary color (hex code)",
      },
      validate: (val) => {
        if (val && !val.match(/^#[0-9A-Fa-f]{6}$/)) {
          return "Please enter a valid hex color code (e.g., #003DA5)";
        }
        return true;
      },
    },
    {
      name: "seoTitle",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "seoDescription",
      type: "textarea",
      maxLength: 160,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" || operation === "update") {
          if (!data.seoTitle && data.brandName) {
            data.seoTitle = `${data.brandName} Sports Equipment | Ralhum Sports`;
          }
        }
      },
    ],
  },
  timestamps: true,
};
