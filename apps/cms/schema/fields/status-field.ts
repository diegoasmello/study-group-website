import { select } from "@keystone-6/core/fields";

export const statusField = select({
  options: [
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
  ],
  validation: { isRequired: true },
  defaultValue: "published",
  ui: { displayMode: "segmented-control" },
  graphql: { isNonNull: { read: true } },
  type: "enum",
});
