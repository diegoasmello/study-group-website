import { ListConfig, list, group } from "@keystone-6/core";
import { allowAll, denyAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";

export const History: ListConfig<any> = list({
  access: {
    operation: {
      create: allowAll,
      delete: denyAll,
      query: allowAll,
      update: allowAll,
    },
  },
  isSingleton: true,
  fields: {
    ...group({
      label: "First section",
      fields: {
        titleOne: text({
          label: "Title",
          validation: { isRequired: true, length: { min: 1, max: 200 } },
          graphql: { isNonNull: { read: true } },
        }),
        contentOne: text({
          label: "Content",
          ui: { displayMode: "textarea" },
          validation: { isRequired: true },
          graphql: { isNonNull: { read: true } },
        }),
      },
    }),
    ...group({
      label: "Second section",
      fields: {
        titleTwo: text({
          label: "Title",
          validation: { isRequired: true, length: { min: 1, max: 200 } },
          graphql: { isNonNull: { read: true } },
        }),
        contentTwo: text({
          label: "Content",
          ui: { displayMode: "textarea" },
          validation: { isRequired: true },
          graphql: { isNonNull: { read: true } },
        }),
      },
    }),
    ...group({
      label: "Third section",
      fields: {
        titleThree: text({
          label: "Title",
          validation: { isRequired: true, length: { min: 1, max: 200 } },
          graphql: { isNonNull: { read: true } },
        }),
        contentThree: text({
          label: "Content",
          ui: { displayMode: "textarea" },
          validation: { isRequired: true },
          graphql: { isNonNull: { read: true } },
        }),
      },
    }),
    ...group({
      label: "Fourth section",
      fields: {
        titleFour: text({
          label: "Title",
          validation: { isRequired: true, length: { min: 1, max: 200 } },
          graphql: { isNonNull: { read: true } },
        }),
        contentFour: text({
          label: "Content",
          ui: { displayMode: "textarea" },
          validation: { isRequired: true },
          graphql: { isNonNull: { read: true } },
        }),
      },
    }),
    ...group({
      label: "Fifth section",
      fields: {
        titleFive: text({
          label: "Title",
          validation: { isRequired: true, length: { min: 1, max: 200 } },
          graphql: { isNonNull: { read: true } },
        }),
        contentFive: text({
          label: "Content",
          ui: { displayMode: "textarea" },
          validation: { isRequired: true },
          graphql: { isNonNull: { read: true } },
        }),
      },
    }),
  },
});
