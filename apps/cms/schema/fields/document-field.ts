import { document } from "@keystone-6/fields-document";

export const documentField = document({
  formatting: true,
  links: true,
  layouts: [
    [1, 1],
    [1, 1, 1],
  ],
  graphql: { isNonNull: { read: true } },
  isFilterable: true,
});
