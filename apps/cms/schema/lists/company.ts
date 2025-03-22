import { ListConfig, list } from "@keystone-6/core";
import { allowAll, denyAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";

export const Company: ListConfig<any> = list({
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
    address: text({
      validation: { isRequired: true },
      graphql: { isNonNull: { read: true } },
    }),
    phone: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    email: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    facebookUrl: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    instagramUrl: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    youtubeUrl: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
  },
  isSingleton: true,
});
