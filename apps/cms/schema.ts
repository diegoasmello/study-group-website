import { list, type ListConfig } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
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
import { documentRequired, imageRequired } from "./validator";
import { slugify } from "./utils";

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
      image: image({
        storage: "local_images",
        graphql: { isNonNull: { read: true } },
      }),
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
      validate: async ({ addValidationError, resolvedData }) => {
        documentRequired(resolvedData.content, addValidationError);
        imageRequired(resolvedData.image, addValidationError);
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
      image: image({
        storage: "local_images",
        graphql: { isNonNull: { read: true } },
      }),
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
      validate: async ({ addValidationError, resolvedData }) => {
        imageRequired(resolvedData.image, addValidationError);
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
      image: image({
        storage: "local_images",
        graphql: { isNonNull: { read: true } },
      }),
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
      validate: async ({ addValidationError, resolvedData }) => {
        imageRequired(resolvedData.image, addValidationError);
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
      image: image({
        storage: "local_images",
        graphql: { isNonNull: { read: true } },
      }),
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
      validate: async ({ addValidationError, resolvedData }) => {
        imageRequired(resolvedData.image, addValidationError);
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
      image: image({
        storage: "local_images",
        graphql: { isNonNull: { read: true } },
      }),
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
      validate: async ({ addValidationError, resolvedData }) => {
        imageRequired(resolvedData.image, addValidationError);
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
      image: image({
        storage: "local_images",
        graphql: { isNonNull: { read: true } },
      }),
      icon: image({
        storage: "local_images",
        graphql: { isNonNull: { read: true } },
      }),
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
      validate: async ({ addValidationError, resolvedData }) => {
        imageRequired(resolvedData.image, addValidationError);
        imageRequired(
          resolvedData.icon,
          addValidationError,
          "Icon must not be null",
        );
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
  SectionContent: list({
    access: allowAll,
    ui: {
      hideCreate: true,
      hideDelete: true,
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
      section: select({
        options: [
          {
            label: "Home",
            value: "HOME_HERO",
          },
          {
            label: "Research",
            value: "RESEARCH_HERO",
          },
          {
            label: "Team",
            value: "TEAM_HERO",
          },
          {
            label: "Publications",
            value: "PUBLICATIONS_HERO",
          },
          {
            label: "Events",
            value: "EVENTS_HERO",
          },
          {
            label: "Actions",
            value: "ACTIONS_HERO",
          },
          {
            label: "Projects",
            value: "PROJECTS_HERO",
          },
          {
            label: "History Hero",
            value: "HISTORY_HERO",
          },
          {
            label: "History Section",
            value: "HISTORY_SECTION",
          },
        ],
        type: "enum",
        validation: { isRequired: true },
        graphql: { isNonNull: { read: true } },
      }),
    },
  }),
  Company: list({
    access: allowAll,
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
