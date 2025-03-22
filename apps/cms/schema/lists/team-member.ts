import { ListConfig, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp } from "@keystone-6/core/fields";
import { imageField } from "../fields/image-field";
import { statusField } from "../fields/status-field";
import { imageRequired } from "../validations/image-validations";

export const TeamMember: ListConfig<any> = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    role: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    image: imageField,
    link: text({
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
    validate: async ({ item, resolvedData, addValidationError }) => {
      imageRequired({ item, resolvedData, addValidationError });
    },
  },
  ui: {
    listView: {
      initialColumns: ["name", "role", "status"],
      initialSort: {
        direction: "DESC",
        field: "publishedAt",
      },
    },
  },
});
