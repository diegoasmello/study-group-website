import { ListConfig, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, integer, calendarDay, timestamp } from "@keystone-6/core/fields";
import { documentField } from "../fields/document-field";
import { imageField } from "../fields/image-field";
import { statusField } from "../fields/status-field";
import { slugify } from "../../utils/slugify";
import { documentRequired } from "../validations/document-validations";
import { imageRequired } from "../validations/image-validations";

export const Event: ListConfig<any> = list({
  access: allowAll,
  fields: {
    title: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    slug: text({
      isIndexed: "unique",
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "hidden" },
      },
      graphql: { isNonNull: { read: true } },
    }),
    keywords: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      ui: {
        description: "Separe words by semicolon (;)",
      },
      graphql: { isNonNull: { read: true } },
    }),
    resume: text({
      ui: { displayMode: "textarea" },
      validation: { isRequired: true },
      graphql: { isNonNull: { read: true } },
    }),
    content: documentField,
    image: imageField,
    link: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    workload: integer({
      validation: { isRequired: true },
      graphql: { isNonNull: { read: true } },
    }),
    date: calendarDay({
      validation: { isRequired: true },
      graphql: { isNonNull: { read: true } },
    }),
    locale: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    publishedAt: timestamp({
      db: { updatedAt: true },
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "hidden" },
      },
    }),
    status: statusField,
  },
  hooks: {
    resolveInput: ({ resolvedData, item }) => {
      return {
        ...resolvedData,
        slug: slugify(resolvedData.title ?? item.title),
      };
    },
    validate: async ({ item, resolvedData, addValidationError }) => {
      imageRequired({ item, resolvedData, addValidationError });
      documentRequired(item, resolvedData, addValidationError);
    },
  },
  ui: {
    listView: {
      initialColumns: ["title", "locale", "date", "status"],
      initialSort: {
        direction: "DESC",
        field: "publishedAt",
      },
    },
  },
});
