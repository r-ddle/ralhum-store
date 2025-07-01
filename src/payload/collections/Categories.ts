import type { CollectionConfig } from "payload";

const isAdminOrProductManager = ({ req: { user } }) => {
  return user?.role === "admin" || user?.role === "product-manager";
};

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "categoryName",
    defaultColumns: ["categoryName", "status", "productsCount"],
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
      name: "categoryName",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "The name of the category",
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
              if (!value && data?.categoryName) {
                return data.categoryName
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
      name: "categoryDescription",
      type: "textarea",
      admin: {
        description: "Description of the category",
      },
    },
    {
      name: "categoryImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Category featured image",
      },
    },
    {
      name: "parentCategory",
      type: "relationship",
      relationTo: "categories",
      admin: {
        description: "Parent category (for subcategories)",
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
        description: "Order in which categories are displayed",
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
          if (!data.seoTitle && data.categoryName) {
            data.seoTitle = `${data.categoryName} Equipment | Ralhum Sports`;
          }
        }
      },
    ],
  },
  timestamps: true,
};
