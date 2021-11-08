import { MyCustomObject } from "../src/MyCustomObject";
import MyCustomString from "../src/MyCustomString";

// sanity/schemas/homepage.js
export default {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Homepage title",
      type: "string",
      description: "What's the title of the homepage hero?",
    },
    {
      name: "subtitle",
      title: "Homepage subtitle",
      type: "string",
      description: "What's the subtitle of the homepage hero?",
    },
    {
      name: "image",
      title: "Homepage image",
      type: "image",
    },
    {
      name: "customString",
      title: "This is a custom string",
      description: "Custom Field Description",
      type: "string",
      inputComponent: MyCustomString,
      validation: (Rule) => Rule.max(100),
    },
    {
      name: "cta",
      description: "What's URL for the homepage CTA?",
      title: "CTA",
      type: "slug",
      options: {
        maxLength: 200,
      },
      validation: (Rule) => [Rule.required().error("Field cannot be empty")],
    },
    {
      name: "customObject",
      description: "This is a custom object with FormBuilder",
      title: "Custom Object",
      type: "object",
      inputComponent: MyCustomObject,
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
        columns: 2, // Defines a grid for the fields and how many columns it should have
      },
      fields: [
        {
          name: "customObjectCtaText",
          type: "string",
          title: "Custom Object CTA Text",
        },
        {
          name: "customObjectCtaUrl",
          type: "url",
          title: "Custom Object CTA Url",
        },
      ],
    },
    {
      name: "conditionalField",
      title: "Conditional Field",
      type: "object",
      fields: [
        {
          name: "status",
          title: "Status",
          type: "string",
          options: {
            list: [
              { title: "Text", value: "text" },
              { title: "Date", value: "date" },
            ],
          },
          defaultValue: "text",
        },
        {
          name: "date",
          title: "Date",
          type: "datetime",
          hidden: ({ parent }) => parent?.status == "text",
        },
        {
          name: "text",
          title: "Text",
          type: "string",
          hidden: ({ parent }) => parent?.status == "date",
        },
      ],
    },
  ],
};
