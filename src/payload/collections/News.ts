import type { CollectionConfig } from "payload";

const isAdminOrProductManager = ({ req: { user } }) => {
  return user?.role === "admin" || user?.role === "product-manager";
};

export const News: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "postTitle",
    defaultColumns: ["postTitle", "author", "publishDate", "status"],
    group: "Content",
  },
  access: {
    create: isAdminOrProductManager,
    read: ({ req: { user } }) => {
      // Public can only read published posts
      if (!user) {
        return {
          status: {
            equals: "published",
          },
        };
      }
      // Admin/Product Manager can read all
      return true;
    },
    update: isAdminOrProductManager,
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // Auto-save every 100ms while typing
      },
    },
    maxPerDoc: 10,
  },
  fields: [
    {
      name: "postTitle",
      type: "text",
      required: true,
      admin: {
        description: "The title of the blog post/news article",
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
              if (!value && data?.postTitle) {
                return data.postTitle
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
      name: "postExcerpt",
      type: "textarea",
      maxLength: 160,
      admin: {
        description: "Brief summary for previews and SEO",
      },
    },
    {
      name: "postContent",
      type: "richText",
      required: true,
      admin: {
        description: "Main article content",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Main image for the article",
      },
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
        },
      ],
      admin: {
        description: "Additional images for the article",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        position: "sidebar",
        description: "Article author",
      },
      defaultValue: ({ user }) => user?.id,
    },
    {
      name: "publishDate",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      defaultValue: () => new Date(),
    },
    {
      name: "categories",
      type: "array",
      fields: [
        {
          name: "category",
          type: "select",
          required: true,
          options: [
            { label: "Company Updates", value: "company-updates" },
            { label: "New Partnerships", value: "new-partnerships" },
            { label: "Sports Events", value: "sports-events" },
            { label: "Product Launches", value: "product-launches" },
            { label: "Industry Insights", value: "industry-insights" },
            { label: "Equipment Reviews", value: "equipment-reviews" },
            { label: "Training Tips", value: "training-tips" },
            { label: "Athlete Stories", value: "athlete-stories" },
          ],
        },
      ],
      admin: {
        description: "Article categories for organization",
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
        description: "Tags for filtering and search",
      },
    },
    {
      name: "readingTime",
      type: "number",
      admin: {
        description: "Estimated reading time in minutes (auto-calculated)",
        readOnly: true,
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Feature this article prominently",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
        {
          label: "Archived",
          value: "archived",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "relatedProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      maxDepth: 1,
      admin: {
        description: "Products mentioned or related to this article",
      },
    },
    {
      name: "relatedArticles",
      type: "relationship",
      relationTo: "news",
      hasMany: true,
      maxDepth: 1,
      admin: {
        description: "Related news articles",
        filterOptions: ({ id }) => {
          return {
            id: {
              not_equals: id,
            },
          };
        },
      },
    },
    {
      name: "socialSharing",
      type: "group",
      admin: {
        description: "Social media sharing configuration",
      },
      fields: [
        {
          name: "enableSharing",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "customSocialImage",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Custom image for social media sharing (optional)",
          },
        },
        {
          name: "twitterHandle",
          type: "text",
          admin: {
            description: "Author's Twitter handle (without @)",
          },
        },
      ],
    },
    // SEO fields
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
    {
      name: "seoKeywords",
      type: "array",
      fields: [
        {
          name: "keyword",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "SEO keywords for this article",
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" || operation === "update") {
          // Auto-generate SEO title if not provided
          if (!data.seoTitle && data.postTitle) {
            data.seoTitle = `${data.postTitle} | Ralhum Sports News`;
          }

          // Auto-generate SEO description if not provided
          if (!data.seoDescription && data.postExcerpt) {
            data.seoDescription = data.postExcerpt;
          }

          // Calculate reading time
          if (data.postContent) {
            const content = JSON.stringify(data.postContent);
            const wordCount = content.split(" ").length;
            data.readingTime = Math.ceil(wordCount / 200); // 200 words per minute
          }
        }
      },
    ],
  },
  timestamps: true,
};
