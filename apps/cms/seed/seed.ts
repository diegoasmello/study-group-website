import { getContext } from "@keystone-6/core/context";
import config from "../keystone";
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

  const teamMembers = await context.db.TeamMember.createMany({
    data: Array.from({ length: NUMBER_OF_ITEMS }).map(() => ({
      name: faker.person.fullName(),
      link: faker.internet.url(),
      role: faker.person.jobDescriptor(),
      image: prepareFile("placeholder.jpg"),
      status: "published",
    })),
  });

  console.log(`Inserted ${teamMembers.length} team members`);

  const researchers = await context.db.Researcher.createMany({
    data: Array.from({ length: NUMBER_OF_ITEMS }).map(() => ({
      name: faker.person.fullName(),
      status: "published",
    })),
  });

  console.log(`Inserted ${researchers.length} researchers`);

  const researchAreas = await context.db.ResearchArea.createMany({
    data: [
      {
        title: "Reading and Writing",
        resume: faker.lorem.sentence({ min: 10, max: 16 }),
        content: createContent(4),
        icon: prepareFile("reading-writing-icon.png", "image/png"),
        image: prepareFile("placeholder.jpg"),
        status: "published",
      },
      {
        title: "Multilinguism",
        resume: faker.lorem.sentence({ min: 10, max: 16 }),
        content: createContent(4),
        icon: prepareFile("multilinguism-icon.png", "image/png"),
        image: prepareFile("placeholder.jpg"),
        status: "published",
      },
      {
        title: "Transculturality",
        resume: faker.lorem.sentence({ min: 10, max: 16 }),
        content: createContent(4),
        icon: prepareFile("transculturality-icon.png", "image/png"),
        image: prepareFile("placeholder.jpg"),
        status: "published",
      },
    ],
  });

  console.log(`Inserted ${researchAreas.length} research areas`);

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

  console.log(`Inserted ${NUMBER_OF_ITEMS} publications`);

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

  console.log(`Inserted ${NUMBER_OF_ITEMS} events`);

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

  console.log(`Inserted ${NUMBER_OF_ITEMS} projects`);

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

  console.log(`Inserted ${NUMBER_OF_ITEMS} actions`);

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

  console.log(`Inserted company`);

  await context.db.HomeSection.createOne({
    data: {
      title: "New directions for language teaching in times of globalization",
      content: faker.lorem.paragraph(10),
      image: prepareFile("placeholder.jpg"),
    },
  });

  console.log(`Inserted home section`);

  await context.db.HistorySection.createOne({
    data: {
      title: "Our history",
      content: faker.lorem.paragraph(2),
    },
  });

  console.log(`Inserted history section`);

  await context.db.ResearchSection.createOne({
    data: {
      title: "Our research",
      content: faker.lorem.paragraph(2),
    },
  });

  console.log(`Inserted research section`);

  await context.db.TeamSection.createOne({
    data: {
      title: "Our team",
      content: faker.lorem.paragraph(2),
    },
  });

  console.log(`Inserted team section`);

  await context.db.PublicationsSection.createOne({
    data: {
      title: "Publications",
      content: faker.lorem.paragraph(2),
    },
  });

  console.log(`Inserted publications section`);

  await context.db.EventsSection.createOne({
    data: {
      title: "Events",
      content: faker.lorem.paragraph(2),
    },
  });

  console.log(`Inserted events section`);

  await context.db.ActionsSection.createOne({
    data: {
      title: "Actions",
      content: faker.lorem.paragraph(2),
    },
  });

  console.log(`Inserted actions section`);

  await context.db.ProjectsSection.createOne({
    data: {
      title: "Projects",
      content: faker.lorem.paragraph(2),
    },
  });

  console.log(`Inserted projects section`);

  await context.db.History.createOne({
    data: {
      titleOne: "Inspiring origins",
      contentOne: faker.lorem.paragraph(15),
      titleTwo: "First steps",
      contentTwo: faker.lorem.paragraph(15),
      titleThree: "Commitment to depth",
      contentThree: faker.lorem.paragraph(15),
      titleFour: "Collaboration and growth",
      contentFour: faker.lorem.paragraph(15),
      titleFive: "Glimpsing the future",
      contentFive: faker.lorem.paragraph(15),
    },
  });

  console.log(`Inserted history page content`);

  console.log(`✅ Seed data inserted`);
}

function prepareFile(
  path_: string,
  mimetype: "image/jpeg" | "image/png" = "image/jpeg",
) {
  const path = resolve(`${__dirname}/${path_}`);
  const upload = new Upload();
  upload.resolve({
    createReadStream: () => createReadStream(path),
    filename: basename(path),
    mimetype: mimetype,
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
