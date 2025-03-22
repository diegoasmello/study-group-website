import { group, list, type ListConfig } from "@keystone-6/core";
import { allowAll, denyAll } from "@keystone-6/core/access";
import { document } from "@keystone-6/fields-document";
import {
  calendarDay,
  image,
  integer,
  password,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { imageRequired } from "./validations/image-validations";
import { slugify } from "./utils/slugify";
import { documentRequired } from "./validations/document-validations";
import { relationshipRequired } from "./validations/relationship-validations";
import { ImageExtension } from "@keystone-6/core/types";

const statusSelect = select({
  options: [
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
  ],
  validation: { isRequired: true },
  defaultValue: "draft",
  ui: { displayMode: "segmented-control" },
  graphql: { isNonNull: { read: true } },
  type: "enum",
});

const contentDocument = document({
  formatting: true,
  links: true,
  layouts: [
    [1, 1],
    [1, 1, 1],
  ],
  graphql: { isNonNull: { read: true } },
  isFilterable: true,
});

const imageField = image({
  storage: "local_images",
  graphql: { isNonNull: { read: true } },
});

const sectionList = list({
  access: {
    operation: {
      create: denyAll,
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

export const lists: Record<string, ListConfig<any>> = {
  Action: list({
    access: allowAll,
    fields: {
      title: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      slug: text({
        isIndexed: "unique",
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
        graphql: { isNonNull: { read: true } },
      }),
      keywords: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        ui: {
          description: "Separe words by semicolon (;)",
        },
        graphql: { isNonNull: { read: true } },
      }),
      resume: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
        graphql: { isNonNull: { read: true } },
      }),
      content: contentDocument,
      image: imageField,
      date: calendarDay({
        validation: { isRequired: true },
        graphql: { isNonNull: { read: true } },
      }),
      publishedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      status: statusSelect,
    },
    hooks: {
      resolveInput: ({ resolvedData, item }) => {
        return {
          ...resolvedData,
          slug: slugify(resolvedData.title ?? item.title),
        };
      },
      validate: async ({ item, resolvedData, addValidationError }) => {
        imageRequired({ item, resolvedData, addValidationError });
        documentRequired(item, resolvedData, addValidationError);
      },
    },
    ui: {
      listView: {
        initialColumns: ["title", "date", "status"],
        initialSort: {
          direction: "DESC",
          field: "publishedAt",
        },
      },
    },
  }),
  Project: list({
    access: allowAll,
    fields: {
      title: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      slug: text({
        isIndexed: "unique",
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
        graphql: { isNonNull: { read: true } },
      }),
      keywords: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        ui: {
          description: "Separe words by semicolon (;)",
        },
        graphql: { isNonNull: { read: true } },
      }),
      content: contentDocument,
      image: imageField,
      link: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      startDate: calendarDay({
        validation: { isRequired: true },
        graphql: { isNonNull: { read: true } },
      }),
      endDate: calendarDay({
        validation: { isRequired: true },
        graphql: { isNonNull: { read: true } },
      }),
      researchers: relationship({ ref: "Researcher.projects", many: true }),
      researchArea: relationship({
        ref: "ResearchArea.projects",
        many: false,
      }),
      publishedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      status: statusSelect,
    },
    hooks: {
      resolveInput: ({ resolvedData, item }) => {
        return {
          ...resolvedData,
          slug: slugify(resolvedData.title ?? item.title),
        };
      },
      validate: async ({ item, resolvedData, addValidationError }) => {
        imageRequired({ item, resolvedData, addValidationError });
        documentRequired(item, resolvedData, addValidationError);
        relationshipRequired<
          { researchAreaId: string },
          { researchArea: { disconnect: boolean } }
        >({
          item,
          resolvedData,
          addValidationError,
          extractRelationId: (item) => item?.researchAreaId,
          extractRelation: (resolvedData) => resolvedData?.researchArea,
          errorMessage: "Research Area must not be null",
        });
      },
    },
    ui: {
      listView: {
        initialColumns: ["title", "startDate", "status"],
        initialSort: {
          direction: "DESC",
          field: "publishedAt",
        },
      },
    },
  }),
  Event: list({
    access: allowAll,
    fields: {
      title: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      slug: text({
        isIndexed: "unique",
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
        graphql: { isNonNull: { read: true } },
      }),
      keywords: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        ui: {
          description: "Separe words by semicolon (;)",
        },
        graphql: { isNonNull: { read: true } },
      }),
      resume: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
        graphql: { isNonNull: { read: true } },
      }),
      content: contentDocument,
      image: imageField,
      link: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      workload: integer({
        validation: { isRequired: true },
        graphql: { isNonNull: { read: true } },
      }),
      date: calendarDay({
        validation: { isRequired: true },
        graphql: { isNonNull: { read: true } },
      }),
      locale: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      publishedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      status: statusSelect,
    },
    hooks: {
      resolveInput: ({ resolvedData, item }) => {
        return {
          ...resolvedData,
          slug: slugify(resolvedData.title ?? item.title),
        };
      },
      validate: async ({ item, resolvedData, addValidationError }) => {
        imageRequired({ item, resolvedData, addValidationError });
        documentRequired(item, resolvedData, addValidationError);
      },
    },
    ui: {
      listView: {
        initialColumns: ["title", "locale", "date", "status"],
        initialSort: {
          direction: "DESC",
          field: "publishedAt",
        },
      },
    },
  }),
  Publication: list({
    access: allowAll,
    fields: {
      title: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      slug: text({
        isIndexed: "unique",
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
        graphql: { isNonNull: { read: true } },
      }),
      keywords: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        ui: {
          description: "Separe words by semicolon (;)",
        },
        graphql: { isNonNull: { read: true } },
      }),
      resume: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
        graphql: { isNonNull: { read: true } },
      }),
      content: contentDocument,
      link: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      date: calendarDay({
        validation: { isRequired: true },
        graphql: { isNonNull: { read: true } },
      }),
      researchers: relationship({
        ref: "Researcher.publications",
        many: true,
      }),
      researchArea: relationship({
        ref: "ResearchArea.publications",
        many: false,
      }),
      magazine: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      doi: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      license: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      publishedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      status: statusSelect,
    },
    hooks: {
      resolveInput: ({ resolvedData, item }) => {
        return {
          ...resolvedData,
          slug: slugify(resolvedData.title ?? item.title),
        };
      },
      validate: async ({ addValidationError, resolvedData, item }) => {
        documentRequired(item, resolvedData, addValidationError);
        relationshipRequired<
          { researchAreaId: string },
          { researchArea: { disconnect: boolean } }
        >({
          item,
          resolvedData,
          addValidationError,
          extractRelationId: (item) => item?.researchAreaId,
          extractRelation: (resolvedData) => resolvedData?.researchArea,
          errorMessage: "Research Area must not be null",
        });
      },
    },
    ui: {
      listView: {
        initialColumns: ["title", "magazine", "date", "status"],
        initialSort: {
          direction: "DESC",
          field: "publishedAt",
        },
      },
    },
  }),
  TeamMember: list({
    access: allowAll,
    fields: {
      name: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      role: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      image: imageField,
      link: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        graphql: { isNonNull: { read: true } },
      }),
      publishedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      status: statusSelect,
    },
    hooks: {
      validate: async ({ item, resolvedData, addValidationError }) => {
        imageRequired({ item, resolvedData, addValidationError });
      },
    },
    ui: {
      listView: {
        initialColumns: ["name", "role", "status"],
        initialSort: {
          direction: "DESC",
          field: "publishedAt",
        },
      },
    },
  }),
  ResearchArea: list({
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
      content: contentDocument,
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
      status: statusSelect,
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
        }); // fix
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
  }),
  Researcher: list({
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
      status: statusSelect,
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
  }),
  HomeSection: sectionList,
  ResearchSection: sectionList,
  TeamSection: sectionList,
  HistorySection: sectionList,
  PublicationsSection: sectionList,
  EventsSection: sectionList,
  ActionsSection: sectionList,
  ProjectsSection: sectionList,
  History: list({
    access: {
      operation: {
        create: denyAll,
        delete: denyAll,
        query: allowAll,
        update: allowAll,
      },
    },
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
    isSingleton: true,
  }),
  Company: list({
    access: {
      operation: {
        create: denyAll,
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
  }),
  NewsletterList: list({
    access: allowAll,
    fields: {
      email: text({ isIndexed: "unique" }),
    },
    ui: {
      hideCreate: true,
      hideDelete: true,
      listView: {
        initialSort: {
          direction: "DESC",
          field: "publishedAt",
        },
      },
    },
  }),
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),
      password: password({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialSort: {
          direction: "DESC",
          field: "publishedAt",
        },
      },
    },
  }),
};
