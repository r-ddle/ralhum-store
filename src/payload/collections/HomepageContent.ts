import { CollectionConfig } from "payload/types";

export const HomepageContent: CollectionConfig = {
  slug: "homepage-content",
  admin: {
    useAsTitle: "contentTitle",
    defaultColumns: ["contentTitle", "contentType", "displayOrder", "status"],
    group: "Content",
  },
  access: {
    create: ({ req: { user } }) => user?.role === "admin", // Only admins can create
    read: () => true, // Public read access
    update: ({ req: { user } }) => user?.role === "admin", // Only admins can update
    delete: ({ req: { user } }) => user?.role === "admin", // Only admins can delete
  },
  fields: [
    {
      name: "contentType",
      type: "select",
      required: true,
      options: [
        { label: "Hero Banner", value: "hero-banner" },
        { label: "Featured Products", value: "featured-products" },
        { label: "Brand Showcase", value: "brand-showcase" },
        { label: "Announcement Bar", value: "announcement" },
        { label: "News Highlight", value: "news-highlight" },
        { label: "Testimonials", value: "testimonials" },
        { label: "Company Stats", value: "company-stats" },
        { label: "Call to Action", value: "cta-section" },
        { label: "About Preview", value: "about-preview" },
        { label: "Sports Categories", value: "sports-categories" },
      ],
      admin: {
        description: "Type of homepage content section",
      },
    },
    {
      name: "contentTitle",
      type: "text",
      required: true,
      admin: {
        description: "Title for this content section",
      },
    },
    {
      name: "contentSubtitle",
      type: "text",
      admin: {
        description: "Subtitle or secondary text",
      },
    },
    {
      name: "contentDescription",
      type: "richText",
      admin: {
        description: "Main content description",
      },
    },
    {
      name: "contentImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Primary image for this content section",
      },
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Background image for the section",
      },
    },
    {
      name: "contentLink",
      type: "group",
      fields: [
        {
          name: "linkText",
          type: "text",
        },
        {
          name: "linkUrl",
          type: "text",
        },
        {
          name: "openInNewTab",
          type: "checkbox",
          defaultValue: false,
        },
      ],
      admin: {
        description: "Call-to-action link for this section",
      },
    },
    {
      name: "additionalLinks",
      type: "array",
      fields: [
        {
          name: "linkText",
          type: "text",
          required: true,
        },
        {
          name: "linkUrl",
          type: "text",
          required: true,
        },
        {
          name: "buttonStyle",
          type: "select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
            { label: "Text Link", value: "text" },
          ],
          defaultValue: "primary",
        },
        {
          name: "openInNewTab",
          type: "checkbox",
          defaultValue: false,
        },
      ],
      admin: {
        description: "Additional action buttons or links",
      },
    },
    {
      name: "featuredProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      maxDepth: 1,
      admin: {
        description:
          "Products to feature in this section (for featured products type)",
        condition: (data) => data.contentType === "featured-products",
      },
    },
    {
      name: "featuredBrands",
      type: "relationship",
      relationTo: "brands",
      hasMany: true,
      maxDepth: 1,
      admin: {
        description: "Brands to showcase (for brand showcase type)",
        condition: (data) => data.contentType === "brand-showcase",
      },
    },
    {
      name: "featuredNews",
      type: "relationship",
      relationTo: "news",
      hasMany: true,
      maxDepth: 1,
      admin: {
        description: "News articles to highlight (for news highlight type)",
        condition: (data) => data.contentType === "news-highlight",
      },
    },
    {
      name: "statistics",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "icon",
          type: "select",
          options: [
            { label: "Trophy", value: "trophy" },
            { label: "Award", value: "award" },
            { label: "Star", value: "star" },
            { label: "Target", value: "target" },
            { label: "Users", value: "users" },
            { label: "Globe", value: "globe" },
            { label: "Package", value: "package" },
            { label: "Clock", value: "clock" },
          ],
        },
      ],
      admin: {
        description: "Statistics to display (for company stats type)",
        condition: (data) => data.contentType === "company-stats",
      },
    },
    {
      name: "testimonials",
      type: "array",
      fields: [
        {
          name: "quote",
          type: "textarea",
          required: true,
        },
        {
          name: "author",
          type: "text",
          required: true,
        },
        {
          name: "authorTitle",
          type: "text",
        },
        {
          name: "authorImage",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "rating",
          type: "number",
          min: 1,
          max: 5,
          defaultValue: 5,
        },
      ],
      admin: {
        description: "Customer testimonials (for testimonials type)",
        condition: (data) => data.contentType === "testimonials",
      },
    },
    {
      name: "styling",
      type: "group",
      fields: [
        {
          name: "backgroundColor",
          type: "select",
          options: [
            { label: "White", value: "white" },
            { label: "Gray Light", value: "gray-50" },
            { label: "Gray", value: "gray-100" },
            { label: "Blue (Brand)", value: "blue-brand" },
            { label: "Orange (Accent)", value: "orange-accent" },
            { label: "Dark", value: "dark" },
            { label: "Gradient Blue", value: "gradient-blue" },
            { label: "Gradient Orange", value: "gradient-orange" },
          ],
          defaultValue: "white",
        },
        {
          name: "textColor",
          type: "select",
          options: [
            { label: "Dark", value: "dark" },
            { label: "Light", value: "light" },
            { label: "Brand Blue", value: "brand-blue" },
            { label: "Brand Orange", value: "brand-orange" },
          ],
          defaultValue: "dark",
        },
        {
          name: "textAlign",
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
          defaultValue: "center",
        },
        {
          name: "padding",
          type: "select",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
            { label: "Extra Large", value: "xl" },
          ],
          defaultValue: "large",
        },
      ],
      admin: {
        description: "Visual styling options for this section",
      },
    },
    {
      name: "displayOrder",
      type: "number",
      required: true,
      admin: {
        position: "sidebar",
        description:
          "Order in which content appears on homepage (lower numbers first)",
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
        {
          label: "Scheduled",
          value: "scheduled",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "scheduledStart",
      type: "date",
      admin: {
        position: "sidebar",
        condition: (data) => data.status === "scheduled",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "scheduledEnd",
      type: "date",
      admin: {
        position: "sidebar",
        condition: (data) => data.status === "scheduled",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "analytics",
      type: "group",
      admin: {
        description: "Analytics tracking for this section",
      },
      fields: [
        {
          name: "trackClicks",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "trackViews",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "customTrackingId",
          type: "text",
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" || operation === "update") {
          // Ensure display order is set
          if (!data.displayOrder) {
            data.displayOrder = 0;
          }
        }
      },
    ],
  },
  timestamps: true,
};
