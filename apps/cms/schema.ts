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

const publishStatus = select({
  options: [
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
  ],
  validation: { isRequired: true },
  defaultValue: "draft",
  ui: { displayMode: "segmented-control" },
});

const contentDocument = document({
  formatting: true,
  links: true,
  layouts: [
    [1, 1],
    [1, 1, 1],
  ],
});

function generateSlug(text: string) {
  return text
    .toLowerCase() // Converte para minúsculas
    .normalize("NFD") // Remove acentos
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9 ]/g, "") // Remove caracteres especiais
    .trim() // Remove espaços extras
    .replace(/\s+/g, "-"); // Substitui espaços por hífens
}

export const lists: Record<string, ListConfig<any>> = {
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
  Action: list({
    access: allowAll,
    fields: {
      title: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      slug: text({
        isIndexed: "unique",
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      keywords: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        ui: {
          description: "Separe words by semicolon (;)",
        },
      }),
      resume: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
      content: contentDocument,
      image: image({ storage: "local_images" }),
      date: calendarDay({ validation: { isRequired: true } }),
      publishedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      status: publishStatus,
    },
    hooks: {
      resolveInput: ({ resolvedData, item }) => {
        return {
          ...resolvedData,
          slug: generateSlug(resolvedData.title ?? item.title),
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
      }),
      slug: text({
        isIndexed: "unique",
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      keywords: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        ui: {
          description: "Separe words by semicolon (;)",
        },
      }),
      content: contentDocument,
      image: image({ storage: "local_images" }),
      link: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      startDate: calendarDay({ validation: { isRequired: true } }),
      endDate: calendarDay({ validation: { isRequired: true } }),
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
      status: publishStatus,
    },
    hooks: {
      resolveInput: ({ resolvedData, item }) => {
        return {
          ...resolvedData,
          slug: generateSlug(resolvedData.title ?? item.title),
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
      }),
      slug: text({
        isIndexed: "unique",
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      keywords: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        ui: {
          description: "Separe words by semicolon (;)",
        },
      }),
      resume: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
      content: contentDocument,
      image: image({ storage: "local_images" }),
      link: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      workload: integer(),
      date: calendarDay({ validation: { isRequired: true } }),
      locale: text(),
      publishedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      status: publishStatus,
    },
    hooks: {
      resolveInput: ({ resolvedData, item }) => {
        return {
          ...resolvedData,
          slug: generateSlug(resolvedData.title ?? item.title),
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
      }),
      slug: text({
        isIndexed: "unique",
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      keywords: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
        ui: {
          description: "Separe words by semicolon (;)",
        },
      }),
      resume: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
      content: contentDocument,
      image: image({ storage: "local_images" }),
      link: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      date: calendarDay({ validation: { isRequired: true } }),
      researchers: relationship({
        ref: "Researcher.publications",
        many: true,
      }),
      researchArea: relationship({
        ref: "ResearchArea.publications",
        many: false,
      }),
      magazine: text(),
      doi: text(),
      license: text(),
      publishedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      status: publishStatus,
    },
    hooks: {
      resolveInput: ({ resolvedData, item }) => {
        return {
          ...resolvedData,
          slug: generateSlug(resolvedData.title ?? item.title),
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
      }),
      role: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      image: image({ storage: "local_images" }),
      link: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      publishedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "hidden" },
        },
      }),
      status: publishStatus,
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
      }),
      resume: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
      content: contentDocument,
      image: image({ storage: "local_images" }),
      icon: image({ storage: "local_images" }),
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
      status: publishStatus,
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
      status: publishStatus,
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
  Company: list({
    access: allowAll,
    fields: {
      title: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      address: text({ validation: { isRequired: true } }),
      phone: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      email: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      facebookUrl: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      instagramUrl: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      youtubeUrl: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
    },
    isSingleton: true,
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
      }),
      content: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
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
      }),
    },
  }),
};
