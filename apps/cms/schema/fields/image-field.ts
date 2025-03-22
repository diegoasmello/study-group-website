import { image } from "@keystone-6/core/fields";

export const imageField = image({
  storage: "local_images",
  graphql: { isNonNull: { read: true } },
});
