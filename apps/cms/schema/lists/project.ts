import { list, ListConfig } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  calendarDay,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { documentField } from "../fields/document-field";
import { imageField } from "../fields/image-field";
import { statusField } from "../fields/status-field";
import { slugify } from "../../utils/slugify";
import { documentRequired } from "../validations/document-validations";
import { imageRequired } from "../validations/image-validations";
import { relationshipRequired } from "../validations/relationship-validations";

export const Project: ListConfig<any> = list({
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
    content: documentField,
    image: imageField,
    link: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    startDate: calendarDay({
      validation: { isRequired: true },
      graphql: { isNonNull: { read: true } },
    }),
    endDate: calendarDay({
      validation: { isRequired: true },
      graphql: { isNonNull: { read: true } },
    }),
    researchers: relationship({ ref: "Researcher.projects", many: true }),
    researchArea: relationship({
      ref: "ResearchArea.projects",
      many: false,
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
    validate: async ({ item, resolvedData, operation, addValidationError }) => {
      if (operation !== "delete") {
        imageRequired({ item, resolvedData, addValidationError });
        documentRequired(item, resolvedData, addValidationError);
        relationshipRequired<
          { researchAreaId: string },
          { researchArea: { disconnect: boolean } }
        >({
          item,
          resolvedData,
          addValidationError,
          extractRelationId: (item) => item?.researchAreaId,
          extractRelation: (resolvedData) => resolvedData?.researchArea,
          errorMessage: "Research Area must not be null",
        });
      }
    },
  },
  ui: {
    listView: {
      initialColumns: ["title", "startDate", "status"],
      initialSort: {
        direction: "DESC",
        field: "publishedAt",
      },
    },
  },
});
