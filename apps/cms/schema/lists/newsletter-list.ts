import { ListConfig, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp } from "@keystone-6/core/fields";

export const NewsletterList: ListConfig<any> = list({
  access: allowAll,
  fields: {
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    publishedAt: timestamp({
      db: { updatedAt: true },
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "hidden" },
      },
    }),
  },
  ui: {
    listView: {
      initialSort: {
        direction: "DESC",
        field: "publishedAt",
      },
    },
  },
});
