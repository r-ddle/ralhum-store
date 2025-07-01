import type { CollectionConfig } from "payload";

const isAdminOrProductManager = ({ req: { user } }) => {
  return user?.role === "admin" || user?.role === "product-manager";
};

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "alt", "mimeType", "filesize"],
  },
  access: {
    create: isAdminOrProductManager,
    read: () => true, // Public read access for images
    update: isAdminOrProductManager,
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    mimeTypes: ["image/*", "application/pdf", "video/*"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 576,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
      {
        name: "desktop",
        width: 1920,
        height: undefined,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Alternative text for accessibility and SEO",
      },
    },
    {
      name: "caption",
      type: "text",
      admin: {
        description: "Image caption for display purposes",
      },
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        description: "Detailed description of the media file",
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
        description: "Tags for organizing and searching media files",
      },
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Product Images", value: "product-images" },
        { label: "Brand Logos", value: "brand-logos" },
        { label: "News Images", value: "news-images" },
        { label: "Company Photos", value: "company-photos" },
        { label: "Hero Images", value: "hero-images" },
        { label: "Backgrounds", value: "backgrounds" },
        { label: "Icons", value: "icons" },
        { label: "Documents", value: "documents" },
        { label: "Videos", value: "videos" },
        { label: "Other", value: "other" },
      ],
      admin: {
        description: "Category for organizing media files",
      },
    },
    {
      name: "photographer",
      type: "text",
      admin: {
        description: "Photographer or image source credit",
      },
    },
    {
      name: "usage",
      type: "select",
      hasMany: true,
      options: [
        { label: "Website", value: "website" },
        { label: "Social Media", value: "social-media" },
        { label: "Print", value: "print" },
        { label: "Email", value: "email" },
        { label: "Advertising", value: "advertising" },
        { label: "Press", value: "press" },
      ],
      admin: {
        description: "Intended usage for this media file",
      },
    },
    {
      name: "copyright",
      type: "group",
      fields: [
        {
          name: "owner",
          type: "text",
        },
        {
          name: "license",
          type: "select",
          options: [
            { label: "All Rights Reserved", value: "all-rights-reserved" },
            { label: "Creative Commons", value: "creative-commons" },
            { label: "Public Domain", value: "public-domain" },
            { label: "Company Owned", value: "company-owned" },
            { label: "Stock Photo", value: "stock-photo" },
          ],
        },
        {
          name: "licenseUrl",
          type: "text",
        },
      ],
      admin: {
        description: "Copyright and licensing information",
      },
    },
    {
      name: "seo",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "keywords",
          type: "array",
          fields: [
            {
              name: "keyword",
              type: "text",
              required: true,
            },
          ],
        },
      ],
      admin: {
        description: "SEO optimization for this media file",
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" || operation === "update") {
          // Auto-generate SEO title if not provided
          if (!data.seo?.title && data.alt) {
            if (!data.seo) data.seo = {};
            data.seo.title = data.alt;
          }
        }
      },
    ],
  },
  timestamps: true,
};
