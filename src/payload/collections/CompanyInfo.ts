import { CollectionConfig } from "payload/types";

export const CompanyInfo: CollectionConfig = {
  slug: "company-info",
  admin: {
    useAsTitle: "sectionName",
    defaultColumns: ["sectionName", "lastUpdated"],
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
      name: "sectionName",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          'Name of the company section (e.g., "About Us", "History", "Mission")',
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
              if (!value && data?.sectionName) {
                return data.sectionName
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
      name: "sectionContent",
      type: "richText",
      required: true,
      admin: {
        description: "Main content for this company section",
      },
    },
    {
      name: "sectionImages",
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
        {
          name: "altText",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Images related to this company section",
      },
    },
    {
      name: "keyPoints",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
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
            { label: "Shield", value: "shield" },
            { label: "Truck", value: "truck" },
            { label: "Clock", value: "clock" },
            { label: "Heart", value: "heart" },
          ],
        },
      ],
      admin: {
        description: "Key points or highlights for this section",
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
      ],
      admin: {
        description: "Company statistics and achievements",
      },
    },
    {
      name: "timeline",
      type: "array",
      fields: [
        {
          name: "year",
          type: "text",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
      admin: {
        description: "Company timeline/milestones",
      },
    },
    {
      name: "teamMembers",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "position",
          type: "text",
          required: true,
        },
        {
          name: "bio",
          type: "textarea",
        },
        {
          name: "photo",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "linkedin",
          type: "text",
        },
        {
          name: "email",
          type: "email",
        },
      ],
      admin: {
        description: "Team member information",
      },
    },
    {
      name: "contactInfo",
      type: "group",
      fields: [
        {
          name: "phone",
          type: "text",
        },
        {
          name: "email",
          type: "email",
        },
        {
          name: "whatsapp",
          type: "text",
        },
        {
          name: "address",
          type: "textarea",
        },
        {
          name: "hours",
          type: "textarea",
        },
        {
          name: "socialMedia",
          type: "array",
          fields: [
            {
              name: "platform",
              type: "select",
              required: true,
              options: [
                { label: "Facebook", value: "facebook" },
                { label: "Instagram", value: "instagram" },
                { label: "Twitter", value: "twitter" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "YouTube", value: "youtube" },
                { label: "WhatsApp", value: "whatsapp" },
              ],
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
      ],
      admin: {
        description: "Contact information for this section",
      },
    },
    {
      name: "displayOrder",
      type: "number",
      admin: {
        position: "sidebar",
        description: "Order in which sections are displayed",
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
      name: "lastUpdated",
      type: "date",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" || operation === "update") {
          data.lastUpdated = new Date();
        }
      },
    ],
  },
  timestamps: true,
};
