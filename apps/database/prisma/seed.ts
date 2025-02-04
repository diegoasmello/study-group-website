import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  await prisma.teamMember.createMany({
    data: Array.from({ length: 30 }).map(() => ({
      name: faker.person.fullName(),
      link: faker.internet.url(),
      avatar: faker.image.avatar(),
    })),
  });

  await prisma.researcher.createMany({
    data: Array.from({ length: 30 }).map(() => ({
      name: faker.person.fullName(),
    })),
  });

  const { count: researchAreaCount } = await prisma.researchArea.createMany({
    data: [
      {
        title: "Leitura e Escrita",
        description: faker.lorem.sentence({ min: 10, max: 16 }),
        content: faker.lorem.paragraphs(3, "<br/>\n"),
        icon: faker.image.avatar(),
        image: faker.image.url(),
      },
      {
        title: "Multilinguismo",
        description: faker.lorem.sentence({ min: 10, max: 16 }),
        content: faker.lorem.paragraphs(3, "<br/>\n"),
        icon: faker.image.avatar(),
        image: faker.image.url(),
      },
      {
        title: "Transculturalidade",
        description: faker.lorem.sentence({ min: 10, max: 16 }),
        content: faker.lorem.paragraphs(3, "<br/>\n"),
        icon: faker.image.avatar(),
        image: faker.image.url(),
      },
    ],
  });

  await prisma.publication.createMany({
    data: Array.from({ length: 30 }).map(() => ({
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      slug: faker.lorem.slug({ min: 3, max: 8 }),
      content: faker.lorem.paragraphs(3, "<br/>\n"),
      image: faker.image.url(),
      cargaHoraria: faker.number.int({ min: 10, max: 60 }),
      date: faker.date.soon(),
      researchAreaId: faker.number.int({ min: 1, max: researchAreaCount }),
    })),
  });

  await prisma.event.createMany({
    data: Array.from({ length: 30 }).map(() => ({
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      slug: faker.lorem.slug({ min: 3, max: 8 }),
      content: faker.lorem.paragraphs(3, "<br/>\n"),
      image: faker.image.url(),
      cargaHoraria: faker.number.int({ min: 10, max: 60 }),
      date: faker.date.soon(),
      isOnline: faker.datatype.boolean(),
      link: faker.internet.url(),
      locale: faker.location.streetAddress(true),
    })),
  });

  await prisma.project.createMany({
    data: Array.from({ length: 30 }).map(() => ({
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      slug: faker.lorem.slug({ min: 3, max: 8 }),
      content: faker.lorem.paragraphs(3, "<br/>\n"),
      image: faker.image.url(),
      link: faker.internet.url(),
      researchAreaId: faker.number.int({ min: 1, max: researchAreaCount }),
      endDate: faker.date.soon(),
      startDate: faker.date.soon(),
    })),
  });

  await prisma.action.createMany({
    data: Array.from({ length: 30 }).map(() => ({
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      slug: faker.lorem.slug({ min: 3, max: 8 }),
      content: faker.lorem.paragraphs(3, "<br/>\n"),
      image: faker.image.url(),
      date: faker.date.soon(),
    })),
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
