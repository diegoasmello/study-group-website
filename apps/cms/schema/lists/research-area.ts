import { ListConfig, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, relationship, timestamp } from "@keystone-6/core/fields";
import { ImageExtension } from "@keystone-6/core/types";
import { documentField } from "../fields/document-field";
import { imageField } from "../fields/image-field";
import { statusField } from "../fields/status-field";
import { documentRequired } from "../validations/document-validations";
import { imageRequired } from "../validations/image-validations";

export const ResearchArea: ListConfig<any> = list({
  access: allowAll,
  fields: {
    title: text({
      validation: { isRequired: true, length: { min: 1, max: 200 } },
      graphql: { isNonNull: { read: true } },
    }),
    resume: text({
      ui: { displayMode: "textarea" },
      validation: { isRequired: true },
      graphql: { isNonNull: { read: true } },
    }),
    content: documentField,
    image: imageField,
    icon: imageField,
    projects: relationship({ ref: "Project.researchArea", many: true }),
    publications: relationship({
      ref: "Publication.researchArea",
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
  hooks: {
    validate: async ({ item, resolvedData, addValidationError }) => {
      imageRequired({ item, resolvedData, addValidationError });
      imageRequired<{
        icon_id: string;
        icon_filesize: number;
        icon_width: number;
        icon_height: number;
        icon_extension: ImageExtension;
      }>({
        item,
        resolvedData,
        extractItemImage: (item) => ({
          id: item.icon_id,
          filesize: item.icon_filesize,
          width: item.icon_width,
          height: item.icon_height,
          extension: item.icon_extension,
        }),
        extractResolvedImage: (resolvedData) => resolvedData.icon,
        addValidationError,
        errorMessage: "Icon must not be null",
      });
      documentRequired(item, resolvedData, addValidationError);
    },
  },
  ui: {
    listView: {
      initialColumns: ["title", "status"],
      initialSort: {
        direction: "DESC",
        field: "publishedAt",
      },
    },
  },
});
