import "dotenv/config";
import { config } from "@keystone-6/core";
import { session, withAuth } from "./auth";
import { static as static_ } from "express";
import { join } from "path";
import { Action } from "./schema/lists/action";
import { Company } from "./schema/lists/company";
import { Event } from "./schema/lists/event";
import { History } from "./schema/lists/history";
import { HomeSection } from "./schema/lists/home-section";
import { NewsletterList } from "./schema/lists/newsletter-list";
import { Project } from "./schema/lists/project";
import { Publication } from "./schema/lists/publication";
import { ResearchArea } from "./schema/lists/research-area";
import { Researcher } from "./schema/lists/researcher";
import { TeamMember } from "./schema/lists/team-member";
import { User } from "./schema/lists/user";
import { HeroSection } from "./schema/lists/hero-section";

export default config(
  withAuth({
    server: {
      extendExpressApp: (app) => {
        app.use("/assets", static_(join(process.cwd(), "public/assets")));
      },
    },
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL,
      prismaClientPath: "node_modules/.prisma/client",
    },
    storage: {
      local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${process.env.STORAGE_URL}/uploads${path}`,
        serverRoute: {
          path: "/uploads",
        },
        storagePath: "public/uploads",
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    session,
    lists: {
      Action,
      Company,
      Event,
      History,
      HomeSection,
      NewsletterList,
      Project,
      Publication,
      ResearchArea,
      Researcher,
      TeamMember,
      User,
      ResearchSection: HeroSection,
      TeamSection: HeroSection,
      HistorySection: HeroSection,
      PublicationsSection: HeroSection,
      EventsSection: HeroSection,
      ActionsSection: HeroSection,
      ProjectsSection: HeroSection,
    },
  }),
);
