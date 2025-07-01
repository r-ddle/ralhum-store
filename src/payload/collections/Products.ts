import { CollectionConfig } from "payload/types";

const isAdminOrProductManager = ({ req: { user } }) => {
  return user?.role === "admin" || user?.role === "product-manager";
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "productName",
    defaultColumns: [
      "productName",
      "productBrand",
      "productCategory",
      "productPrice",
      "stockQuantity",
      "productStatus",
    ],
    group: "E-commerce",
  },
  access: {
    create: isAdminOrProductManager,
    read: () => true, // Public read access for frontend
    update: isAdminOrProductManager,
    delete: ({ req: { user } }) => user?.role === "admin", // Only admins can delete
  },
  fields: [
    {
      name: "productName",
      type: "text",
      required: true,
      admin: {
        description: "The name of the product",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "URL-friendly version of the product name",
      },
      hooks: {
        beforeValidate: [
          ({ value, operation, data }) => {
            if (operation === "create" || operation === "update") {
              if (!value && data?.productName) {
                return data.productName
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
      name: "productCategory",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: {
        description: "Select the product category",
      },
    },
    {
      name: "productBrand",
      type: "relationship",
      relationTo: "brands",
      required: true,
      admin: {
        description: "Select the product brand",
      },
    },
    {
      name: "productPrice",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Price in USD (will be converted to LKR on frontend)",
        step: 0.01,
      },
    },
    {
      name: "compareAtPrice",
      type: "number",
      min: 0,
      admin: {
        description: "Original price before discount (optional)",
        step: 0.01,
      },
    },
    {
      name: "skuCode",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Unique product identifier for inventory",
      },
    },
    {
      name: "stockQuantity",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Available stock quantity",
      },
    },
    {
      name: "productImages",
      type: "array",
      required: true,
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "alt",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Product images (first image will be the main image)",
      },
    },
    {
      name: "productDescription",
      type: "richText",
      admin: {
        description: "Detailed product description",
      },
    },
    {
      name: "shortDescription",
      type: "textarea",
      maxLength: 160,
      admin: {
        description: "Brief product description for cards and previews",
      },
    },
    {
      name: "productSizes",
      type: "text",
      admin: {
        description: "Available sizes (e.g., S, M, L, XL or 38, 40, 42)",
      },
    },
    {
      name: "productColors",
      type: "text",
      admin: {
        description: "Available colors (e.g., Red, Blue, Black)",
      },
    },
    {
      name: "specifications",
      type: "group",
      admin: {
        description: "Product specifications and technical details",
      },
      fields: [
        {
          name: "material",
          type: "text",
        },
        {
          name: "weight",
          type: "text",
        },
        {
          name: "dimensions",
          type: "text",
        },
        {
          name: "additionalSpecs",
          type: "array",
          fields: [
            {
              name: "specName",
              type: "text",
              required: true,
            },
            {
              name: "specValue",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "shippingConfig",
      type: "group",
      admin: {
        description: "Shipping and delivery options",
      },
      fields: [
        {
          name: "freeShipping",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Eligible for free shipping",
          },
        },
        {
          name: "islandWideDelivery",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Available for island-wide delivery",
          },
        },
        {
          name: "easyReturn",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Eligible for easy returns",
          },
        },
        {
          name: "shippingWeight",
          type: "number",
          min: 0,
          admin: {
            description: "Shipping weight in kg",
          },
        },
      ],
    },
    {
      name: "productStatus",
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
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Out of Stock",
          value: "out-of-stock",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Feature this product on homepage and category pages",
      },
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Product tags for filtering and search",
      },
    },
    {
      name: "relatedProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      maxDepth: 1,
      admin: {
        description: "Related or similar products",
      },
    },
    // SEO fields (handled by SEO plugin)
    {
      name: "seoTitle",
      type: "text",
      admin: {
        position: "sidebar",
        description: "SEO title (leave empty to auto-generate)",
      },
    },
    {
      name: "seoDescription",
      type: "textarea",
      maxLength: 160,
      admin: {
        position: "sidebar",
        description: "SEO meta description",
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" || operation === "update") {
          // Auto-generate SEO title if not provided
          if (!data.seoTitle && data.productName) {
            data.seoTitle = `${data.productName} | Ralhum Sports`;
          }

          // Auto-generate SEO description if not provided
          if (!data.seoDescription && data.shortDescription) {
            data.seoDescription = data.shortDescription;
          }
        }
      },
    ],
  },
  timestamps: true,
};
