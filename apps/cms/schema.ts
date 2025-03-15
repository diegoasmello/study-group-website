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

const publishStatus = select({
  options: [
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
  ],
  defaultValue: "draft",
  ui: { displayMode: "segmented-control" },
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
  }),
  Action: list({
    access: allowAll,
    fields: {
      title: text({
        validation: { isRequired: true, length: { min: 1, max: 200 } },
      }),
      slug: text({ isIndexed: "unique" }),
      keywords: text({
        ui: {
          description: "Separe words by comma (,)",
        },
      }),
      resume: text({ ui: { displayMode: "textarea" } }),
      content: document(),
      image: image({ storage: "local_images" }),
      date: calendarDay(),
      publishedAt: timestamp({ db: { updatedAt: true } }),
      status: publishStatus,
    },
    hooks: {
      resolveInput: ({ resolvedData }) => {
        return { ...resolvedData, slug: generateSlug(resolvedData.title) };
      },
    },
  }),
  Project: list({
    access: allowAll,
    fields: {
      title: text(),
      slug: text({ isIndexed: "unique" }),
      keywords: text(),
      content: document(),
      image: image({ storage: "local_images" }),
      link: text(),
      startDate: calendarDay(),
      endDate: calendarDay(),
      researchers: relationship({ ref: "Researcher.projects", many: true }),
      researchArea: relationship({
        ref: "ResearchArea.projects",
        many: false,
      }),
      publishedAt: timestamp(),
      status: publishStatus,
    },
    hooks: {
      resolveInput: ({ resolvedData }) => {
        return { ...resolvedData, slug: generateSlug(resolvedData.title) };
      },
    },
  }),
  Event: list({
    access: allowAll,
    fields: {
      title: text(),
      slug: text({ isIndexed: "unique" }),
      keywords: text(),
      resume: text(),
      content: document(),
      image: image({ storage: "local_images" }),
      link: text(),
      workload: integer(),
      date: calendarDay(),
      locale: text(),
      publishedAt: timestamp(),
      status: publishStatus,
    },
    hooks: {
      resolveInput: ({ resolvedData }) => {
        return { ...resolvedData, slug: generateSlug(resolvedData.title) };
      },
    },
  }),
  Publication: list({
    access: allowAll,
    fields: {
      title: text(),
      slug: text({ isIndexed: "unique" }),
      keywords: text(),
      resume: text(),
      content: document(),
      image: image({ storage: "local_images" }),
      link: text(),
      date: calendarDay(),
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
      publishedAt: timestamp(),
      status: publishStatus,
    },
    hooks: {
      resolveInput: ({ resolvedData }) => {
        return { ...resolvedData, slug: generateSlug(resolvedData.title) };
      },
    },
  }),
  TeamMember: list({
    access: allowAll,
    fields: {
      name: text(),
      role: text(),
      image: image({ storage: "local_images" }),
      link: text(),
      publishedAt: timestamp(),
      status: publishStatus,
    },
  }),
  ResearchArea: list({
    access: allowAll,
    fields: {
      title: text(),
      resume: text(),
      content: document(),
      image: image({ storage: "local_images" }),
      icon: image({ storage: "local_images" }),
      projects: relationship({ ref: "Project.researchArea", many: true }),
      publications: relationship({
        ref: "Publication.researchArea",
        many: true,
      }),
      publishedAt: timestamp(),
      status: publishStatus,
    },
  }),
  Researcher: list({
    access: allowAll,
    fields: {
      name: text(),
      projects: relationship({ ref: "Project.researchers", many: true }),
      publications: relationship({
        ref: "Publication.researchers",
        many: true,
      }),
      publishedAt: timestamp(),
      status: publishStatus,
    },
  }),
  NewsletterList: list({
    access: allowAll,
    ui: {
      hideCreate: true,
      hideDelete: true,
    },
    fields: {
      email: text({ isIndexed: "unique" }),
    },
  }),
  Company: list({
    access: allowAll,
    fields: {
      title: text(),
      address: text(),
      phone: text(),
      email: text(),
      facebookUrl: text(),
      instagramUrl: text(),
      youtubeUrl: text(),
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
      title: text(),
      content: text(),
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
