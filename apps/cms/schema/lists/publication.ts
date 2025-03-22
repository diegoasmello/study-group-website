import { ListConfig, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  text,
  calendarDay,
  relationship,
  timestamp,
} from "@keystone-6/core/fields";
import { documentField } from "../fields/document-field";
import { statusField } from "../fields/status-field";
import { slugify } from "../../utils/slugify";
import { documentRequired } from "../validations/document-validations";
import { relationshipRequired } from "../validations/relationship-validations";

export const Publication: ListConfig<any> = list({
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
    link: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    date: calendarDay({
      validation: { isRequired: true },
      graphql: { isNonNull: { read: true } },
    }),
    researchers: relationship({
      ref: "Researcher.publications",
      many: true,
    }),
    researchArea: relationship({
      ref: "ResearchArea.publications",
      many: false,
    }),
    magazine: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    doi: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    license: text({
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
    validate: async ({ addValidationError, operation, resolvedData, item }) => {
      if (operation !== "delete") {
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
      initialColumns: ["title", "magazine", "date", "status"],
      initialSort: {
        direction: "DESC",
        field: "publishedAt",
      },
    },
  },
});
