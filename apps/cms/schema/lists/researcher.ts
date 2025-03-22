import { ListConfig, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, relationship, timestamp } from "@keystone-6/core/fields";
import { statusField } from "../fields/status-field";

export const Researcher: ListConfig<any> = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    projects: relationship({ ref: "Project.researchers", many: true }),
    publications: relationship({
      ref: "Publication.researchers",
      many: true,
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
  ui: {
    listView: {
      initialColumns: ["name", "status"],
      initialSort: {
        direction: "DESC",
        field: "publishedAt",
      },
    },
  },
});
