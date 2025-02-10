import { PrismaClient, Sections } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const NUMBER_OF_ROWS = 30;

function createContent(length: number = 5) {
  return Array.from({ length })
    .map(() => `<p>${faker.lorem.paragraph(6)}</p>`)
    .join("");
}

async function main() {
  await prisma.teamMember.createMany({
    data: Array.from({ length: NUMBER_OF_ROWS }).map(() => ({
      name: faker.person.fullName(),
      link: faker.internet.url(),
      image: faker.image.avatar(),
      role: faker.person.jobDescriptor(),
    })),
  });

  await prisma.researcher.createMany({
    data: Array.from({ length: NUMBER_OF_ROWS }).map(() => ({
      name: faker.person.fullName(),
    })),
  });

  const { count: researchAreaCount } = await prisma.researchArea.createMany({
    data: [
      {
        title: "Reading and Writing",
        description: faker.lorem.sentence({ min: 10, max: 16 }),
        content: createContent(4),
        icon: faker.image.avatar(),
        image: faker.image.url(),
      },
      {
        title: "Multilinguism",
        description: faker.lorem.sentence({ min: 10, max: 16 }),
        content: createContent(4),
        icon: faker.image.avatar(),
        image: faker.image.url(),
      },
      {
        title: "Transculturality",
        description: faker.lorem.sentence({ min: 10, max: 16 }),
        content: createContent(4),
        icon: faker.image.avatar(),
        image: faker.image.url(),
      },
    ],
  });

  Array.from({ length: NUMBER_OF_ROWS }).forEach(
    async () =>
      await prisma.publication.create({
        data: {
          title: faker.lorem.sentence({ min: 7, max: 15 }),
          slug: faker.lorem.slug({ min: 3, max: 8 }),
          keywords: Array.from({ length: 3 })
            .map(() => faker.lorem.words(1))
            .join("; "),
          resume: faker.lorem.paragraph(15),
          content: createContent(),
          image: faker.image.url(),
          date: faker.date.soon(),
          link: faker.internet.url(),
          magazine: faker.book.title(),
          doi: `${faker.string.alphanumeric(6)}/${faker.string.alphanumeric(
            12
          )}`,
          license: "CC BY 4.0",
          researchers: {
            connect: Array.from({ length: 3 }).map(() => ({
              id: faker.number.int({ min: 1, max: NUMBER_OF_ROWS }),
            })),
          },
          researchArea: {
            connect: {
              id: faker.number.int({ min: 1, max: researchAreaCount }),
            },
          },
          published: true,
        },
      })
  );

  await prisma.event.createMany({
    data: Array.from({ length: NUMBER_OF_ROWS }).map(() => ({
      title: faker.lorem.sentence({ min: 7, max: 15 }),
      slug: faker.lorem.slug({ min: 3, max: 8 }),
      keywords: Array.from({ length: 3 })
        .map(() => faker.lorem.words(1))
        .join("; "),
      content: createContent(),
      image: faker.image.url(),
      workload: faker.number.int({ min: 10, max: 60 }),
      date: faker.date.soon(),
      link: faker.internet.url(),
      locale: faker.location.streetAddress(true),
      published: true,
    })),
  });

  Array.from({ length: NUMBER_OF_ROWS }).forEach(
    async () =>
      await prisma.project.create({
        data: {
          title: faker.lorem.sentence({ min: 1, max: 3 }),
          slug: faker.lorem.slug({ min: 3, max: 8 }),
          keywords: Array.from({ length: 3 })
            .map(() => faker.lorem.words(1))
            .join("; "),
          content: createContent(),
          image: faker.image.url(),
          link: faker.internet.url(),
          endDate: faker.date.soon(),
          startDate: faker.date.soon(),
          researchArea: {
            connect: {
              id: faker.number.int({ min: 1, max: researchAreaCount }),
            },
          },
          researchers: {
            connect: Array.from({ length: 3 }).map(() => ({
              id: faker.number.int({ min: 1, max: NUMBER_OF_ROWS }),
            })),
          },
          published: true,
        },
      })
  );

  await prisma.action.createMany({
    data: Array.from({ length: NUMBER_OF_ROWS }).map(() => ({
      title: faker.lorem.sentence({ min: 7, max: 15 }),
      slug: faker.lorem.slug({ min: 3, max: 8 }),
      keywords: Array.from({ length: 3 })
        .map(() => faker.lorem.words(1))
        .join("; "),
      content: createContent(),
      image: faker.image.url(),
      date: faker.date.soon(),
      published: true,
    })),
  });

  await prisma.sectionsContent.createMany({
    data: [
      {
        section: Sections.HOME_HERO,
        title: "New directions for language teaching in times of globalization",
        content: faker.lorem.paragraph(10),
      },
      {
        section: Sections.RESEARCH_HERO,
        title: "Our research",
        content: faker.lorem.paragraph(2),
      },
      {
        section: Sections.TEAM_HERO,
        title: "Our team",
        content: faker.lorem.paragraph(2),
      },
      {
        section: Sections.PUBLICATIONS_HERO,
        title: "Publications",
        content: faker.lorem.paragraph(2),
      },
      {
        section: Sections.EVENTS_HERO,
        title: "Events",
        content: faker.lorem.paragraph(2),
      },
      {
        section: Sections.ACTIONS_HERO,
        title: "Actions",
        content: faker.lorem.paragraph(2),
      },
      {
        section: Sections.PROJECTS_HERO,
        title: "Projects",
        content: faker.lorem.paragraph(2),
      },
      {
        section: Sections.HISTORY_HERO,
        title: "New directions for language teaching in times of globalization",
        content: faker.lorem.paragraph(3),
      },
      {
        section: Sections.HISTORY_SECTION,
        title: "Inspiring origins",
        content: faker.lorem.paragraph(15),
      },
      {
        section: Sections.HISTORY_SECTION,
        title: "First steps",
        content: faker.lorem.paragraph(15),
      },
      {
        section: Sections.HISTORY_SECTION,
        title: "Commitment to depth",
        content: faker.lorem.paragraph(15),
      },
      {
        section: Sections.HISTORY_SECTION,
        title: "Collaboration and growth",
        content: faker.lorem.paragraph(15),
      },
      {
        section: Sections.HISTORY_SECTION,
        title: "Glimpsing the future",
        content: faker.lorem.paragraph(15),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
