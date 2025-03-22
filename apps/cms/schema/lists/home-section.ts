import { ListConfig, list } from "@keystone-6/core";
import { allowAll, denyAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";
import { imageField } from "../fields/image-field";
import { imageRequired } from "../validations/image-validations";

export const HomeSection: ListConfig<any> = list({
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
    image: imageField,
  },
  isSingleton: true,
  hooks: {
    validate: async ({ item, resolvedData, addValidationError }) => {
      imageRequired({ item, resolvedData, addValidationError });
    },
  },
});
