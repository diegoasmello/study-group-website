import { getContext } from "@keystone-6/core/context";
import config from "./keystone";
import * as PrismaModule from ".prisma/client";
import { faker } from "@faker-js/faker";
import { TypeInfo } from ".keystone/types";
import { resolve, basename } from "path";
import { createReadStream } from "fs";
import Upload from "graphql-upload/Upload.js";

const NUMBER_OF_ITEMS = 30;

async function main() {
  const context = getContext<TypeInfo>(config, PrismaModule);

  console.log(`🌱 Inserting seed data`);

  await context.db.TeamMember.createMany({
    data: Array.from({ length: NUMBER_OF_ITEMS }).map(() => ({
      name: faker.person.fullName(),
      link: faker.internet.url(),
      role: faker.person.jobDescriptor(),
      image: prepareFile("placeholder.jpg"),
      status: "published",
    })),
  });

  const researchers = await context.db.Researcher.createMany({
    data: Array.from({ length: NUMBER_OF_ITEMS }).map(() => ({
      name: faker.person.fullName(),
      status: "published",
    })),
  });

  const researchAreas = await context.db.ResearchArea.createMany({
    data: [
      {
        title: "Reading and Writing",
        resume: faker.lorem.sentence({ min: 10, max: 16 }),
        content: createContent(4),
        icon: prepareFile("reading-writing-icon.jpg"),
        image: prepareFile("placeholder.jpg"),
        status: "published",
      },
      {
        title: "Multilinguism",
        resume: faker.lorem.sentence({ min: 10, max: 16 }),
        content: createContent(4),
        icon: prepareFile("multilinguism-icon.jpg"),
        image: prepareFile("placeholder.jpg"),
        status: "published",
      },
      {
        title: "Transculturality",
        resume: faker.lorem.sentence({ min: 10, max: 16 }),
        content: createContent(4),
        icon: prepareFile("transculturality-icon.jpg"),
        image: prepareFile("placeholder.jpg"),
        status: "published",
      },
    ],
  });

  Array.from({ length: NUMBER_OF_ITEMS }).forEach(
    async () =>
      await context.db.Publication.createOne({
        data: {
          title: faker.lorem.sentence({ min: 7, max: 15 }),
          keywords: Array.from({ length: 3 })
            .map(() => faker.lorem.words(1))
            .join("; "),
          resume: faker.lorem.paragraph(15),
          content: createContent(),
          image: prepareFile("placeholder.jpg"),
          date: faker.date.soon().toISOString().split("T")[0],
          link: faker.internet.url(),
          magazine: faker.book.title(),
          doi: `${faker.string.alphanumeric(6)}/${faker.string.alphanumeric(
            12,
          )}`,
          license: "CC BY 4.0",
          researchers: {
            connect: Array.from({ length: 3 }).map(() => ({
              id: researchers[getRandom(researchers.length)].id,
            })),
          },
          researchArea: {
            connect: {
              id: researchAreas[getRandom(researchAreas.length)].id,
            },
          },
          status: "published",
        },
      }),
  );

  await context.db.Event.createMany({
    data: Array.from({ length: NUMBER_OF_ITEMS }).map(() => ({
      title: faker.lorem.sentence({ min: 7, max: 15 }),
      keywords: Array.from({ length: 3 })
        .map(() => faker.lorem.words(1))
        .join("; "),
      resume: faker.lorem.paragraph(4),
      content: createContent(),
      image: prepareFile("placeholder.jpg"),
      workload: faker.number.int({ min: 10, max: 60 }),
      date: faker.date.soon().toISOString().split("T")[0],
      link: faker.internet.url(),
      locale: faker.location.streetAddress(true),
      status: "published",
    })),
  });

  Array.from({ length: NUMBER_OF_ITEMS }).forEach(
    async () =>
      await context.db.Project.createOne({
        data: {
          title: faker.lorem.sentence({ min: 1, max: 3 }),
          keywords: Array.from({ length: 3 })
            .map(() => faker.lorem.words(1))
            .join("; "),
          content: createContent(),
          image: prepareFile("placeholder.jpg"),
          link: faker.internet.url(),
          endDate: faker.date.soon().toISOString().split("T")[0],
          startDate: faker.date.soon().toISOString().split("T")[0],
          researchers: {
            connect: Array.from({ length: 3 }).map(() => ({
              id: researchers[getRandom(researchers.length)].id,
            })),
          },
          researchArea: {
            connect: {
              id: researchAreas[getRandom(researchAreas.length)].id,
            },
          },
          status: "published",
        },
      }),
  );

  await context.db.Action.createMany({
    data: Array.from({ length: NUMBER_OF_ITEMS }).map(() => ({
      title: faker.lorem.sentence({ min: 7, max: 15 }),
      keywords: Array.from({ length: 3 })
        .map(() => faker.lorem.words(1))
        .join("; "),
      resume: faker.lorem.paragraph(4),
      content: createContent(),
      image: prepareFile("placeholder.jpg"),
      date: faker.date.soon().toISOString().split("T")[0],
      status: "published",
    })),
  });

  await context.db.Company.createOne({
    data: {
      title: "study-group-site",
      address:
        "The Cupboard under the Stair, 4 Privet Drive, Little Whinging, Surrey.",
      email: faker.internet.email(),
      phone: faker.phone.number(),
      facebookUrl: faker.internet.url(),
      instagramUrl: faker.internet.url(),
      youtubeUrl: faker.internet.url(),
    },
  });

  await context.db.SectionContent.createMany({
    data: [
      {
        section: "HOME_HERO",
        title: "New directions for language teaching in times of globalization",
        content: faker.lorem.paragraph(10),
      },
      {
        section: "RESEARCH_HERO",
        title: "Our research",
        content: faker.lorem.paragraph(2),
      },
      {
        section: "TEAM_HERO",
        title: "Our team",
        content: faker.lorem.paragraph(2),
      },
      {
        section: "PUBLICATIONS_HERO",
        title: "Publications",
        content: faker.lorem.paragraph(2),
      },
      {
        section: "EVENTS_HERO",
        title: "Events",
        content: faker.lorem.paragraph(2),
      },
      {
        section: "ACTIONS_HERO",
        title: "Actions",
        content: faker.lorem.paragraph(2),
      },
      {
        section: "PROJECTS_HERO",
        title: "Projects",
        content: faker.lorem.paragraph(2),
      },
      {
        section: "HISTORY_HERO",
        title: "New directions for language teaching in times of globalization",
        content: faker.lorem.paragraph(3),
      },
      {
        section: "HISTORY_SECTION",
        title: "Inspiring origins",
        content: faker.lorem.paragraph(15),
      },
      {
        section: "HISTORY_SECTION",
        title: "First steps",
        content: faker.lorem.paragraph(15),
      },
      {
        section: "HISTORY_SECTION",
        title: "Commitment to depth",
        content: faker.lorem.paragraph(15),
      },
      {
        section: "HISTORY_SECTION",
        title: "Collaboration and growth",
        content: faker.lorem.paragraph(15),
      },
      {
        section: "HISTORY_SECTION",
        title: "Glimpsing the future",
        content: faker.lorem.paragraph(15),
      },
    ],
  });

  console.log(`✅ Seed data inserted`);
}

function prepareFile(path_: string) {
  const path = resolve(`${__dirname}/seed/${path_}`);
  const upload = new Upload();
  upload.resolve({
    createReadStream: () => createReadStream(path),
    filename: basename(path),
    mimetype: "image/jpeg",
    encoding: "utf-8",
  });
  return { upload };
}

function createContent(length: number = 5) {
  return Array.from({ length }).map(() => ({
    type: "paragraph",
    children: [{ text: faker.lorem.paragraph(6) }],
  }));
}

function getRandom(max: number) {
  return Math.floor(Math.random() * max - 1) + 1;
}

main()
  .catch((err) => {
    console.error("Erro ao popular o banco:", err);
  })
  .finally(() => {
    process.exit(0);
  });
