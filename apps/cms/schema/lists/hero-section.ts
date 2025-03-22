import { ListConfig, list } from "@keystone-6/core";
import { allowAll, denyAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";

export const HeroSection: ListConfig<any> = list({
  access: {
    operation: {
      create: allowAll,
      delete: denyAll,
      query: allowAll,
      update: allowAll,
    },
  },
  fields: {
    title: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    content: text({
      ui: { displayMode: "textarea" },
      validation: { isRequired: true },
      graphql: { isNonNull: { read: true } },
    }),
  },
  isSingleton: true,
});
