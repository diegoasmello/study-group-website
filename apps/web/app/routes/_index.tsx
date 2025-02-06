import { json, type MetaFunction } from "@remix-run/node";
import { Card } from "~/components/Card";
import { CardAction } from "~/components/CardAction";
import { CardEvent } from "~/components/CardEvent";
import { CardPublication } from "~/components/CardPublication";
import { Container } from "~/components/Container";
import { Link } from "~/components/Link";
import { IconArrowForward } from "~/components/icons/IconArrowForward";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import data from "~/data";
import { Carousel } from "~/components/Carousel";
import { CarouselHome, CarouselHomeItem } from "~/components/CarouselHome";
import { prisma } from "~/lib/prisma.server";
import { ButtonLink } from "~/components/ButtonLink";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: data.site.title },
    { name: "description", content: data.site.description },
  ];
};

export async function loader() {
  const researchAreas = await prisma.researchArea.findMany();
  const events = await prisma.event.findMany({
    orderBy: {
      date: "desc",
    },
    take: 9,
  });
  const publications = await prisma.publication.findMany({
    orderBy: {
      date: "desc",
    },
    take: 5,
    include: {
      researchers: true,
    },
  });
  const actions = await prisma.action.findMany({
    orderBy: {
      date: "desc",
    },
    take: 9,
  });
  return json({ researchAreas, events, publications, actions });
}

export default function Index() {
  const { researchAreas, events, publications, actions } =
    useLoaderData<typeof loader>();

  const carouselItems: CarouselHomeItem[] = [
    ...events.map(
      (event): CarouselHomeItem => ({
        id: event.id,
        slug: event.slug,
        title: event.title,
        description: event.content,
        image: event.image,
        date: Number(event.date),
        type: "event",
      })
    ),
    ...actions.map(
      (action): CarouselHomeItem => ({
        id: action.id,
        slug: action.slug,
        title: action.title,
        description: action.content,
        image: action.image,
        date: Number(action.date),
        type: "action",
      })
    ),
  ]
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);

  return (
    <main className="pt-8 pb-20  bg-page">
      <CarouselHome items={carouselItems} />

      {/* about section */}
      <Container className="pt-14 pb-20">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-6">
            <img
              src="/assets/card-image.png"
              alt="Sobre o grupo"
              className="w-full rounded-3xl"
            />
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-primary font-medium">Sobre o grupo</span>
              <span className="text-h2">
                Novos rumos para o ensino de língua em tempos de globalização
              </span>
              <p className="text-gray-800">
                Unimos pesquisadores e entusiastas para compreender como a
                diversidade linguística e a interculturalidade influenciam a
                criação, tradução e recepção das narrativas, enriquecendo a
                apreciação da riqueza literária global. Junte-se a nós nessa
                jornada de descobertas e análises, conectando-se com a essência
                da palavra escrita em suas variadas formas e manifestações.{" "}
              </p>
            </div>

            <nav className="flex flex-row gap-4">
              <ButtonLink to={"/history"}>História</ButtonLink>
              <ButtonLink to={"/team"} skin="outline">
                Equipe
              </ButtonLink>
            </nav>
          </div>
        </div>
      </Container>

      {/* research section */}
      <Container className="flex flex-col gap-8 pb-16 items-center">
        <h2 className="text-h3">Áreas de pesquisa</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {researchAreas.map((researchArea) => (
            <Card
              key={researchArea.id}
              type="flat"
              title={researchArea.title}
              text={researchArea.description}
              icon={
                <img src={researchArea.icon} alt="" className="size-[4.5rem]" />
              }
            />
          ))}
        </div>
        <Link to={`/research`} className="text-center">
          Saiba mais sobre nossa pesquisa{" "}
          <IconArrowForward className="size-5" />
        </Link>
      </Container>

      {/* events carousel */}
      <Container className="flex flex-col gap-8 pb-16 items-center">
        <h2 className="text-h3">Eventos e Cursos</h2>
        <div className="w-full">
          <Carousel>
            {(isSlideInView) =>
              events.map((event, index) => (
                <div
                  key={event.id}
                  className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                >
                  <CardEvent
                    size="default"
                    hideShadow={!isSlideInView(index)}
                    hideLocale
                    event={{
                      slug: event.slug,
                      title: event.title,
                      image: event.image,
                      date: new Date(event.date),
                      locale: event.locale,
                    }}
                  />
                </div>
              ))
            }
          </Carousel>
        </div>
        <Link to={`/events`} className="text-center">
          Ver todos eventos <IconArrowForward className="size-5" />
        </Link>
      </Container>

      {/* last publications */}
      <Container className="flex flex-col gap-8 pb-16 items-center">
        <h2 className="text-h3 text-left w-full">Últimas publicações</h2>
        <div className="grid grid-cols-4 grid-rows-2 gap-8">
          <div className="col-span-2 row-span-2">
            <CardPublication
              className="h-full"
              size="extended"
              publication={{
                slug: publications[0].slug,
                title: publications[0].title,
                description: publications[0].content,
                date: new Date(publications[0].date),
                researchers: publications[0].researchers,
              }}
            />
          </div>
          <div className="col-start-3">
            <CardPublication
              size="default"
              publication={{
                slug: publications[1].slug,
                title: publications[1].title,
                description: publications[1].content,
                date: new Date(publications[1].date),
                researchers: publications[1].researchers,
              }}
            />
          </div>
          <div className="col-start-3 row-start-2">
            <CardPublication
              size="default"
              publication={{
                slug: publications[2].slug,
                title: publications[2].title,
                description: publications[2].content,
                date: new Date(publications[2].date),
                researchers: publications[2].researchers,
              }}
            />
          </div>
          <div className="col-start-4 row-start-1">
            <CardPublication
              size="default"
              publication={{
                slug: publications[3].slug,
                title: publications[3].title,
                description: publications[3].content,
                date: new Date(publications[3].date),
                researchers: publications[3].researchers,
              }}
            />
          </div>
          <div className="col-start-4 row-start-2">
            <CardPublication
              size="default"
              publication={{
                slug: publications[4].slug,
                title: publications[4].title,
                description: publications[4].content,
                date: new Date(publications[4].date),
                researchers: publications[4].researchers,
              }}
            />
          </div>
        </div>
        <Link to={`/publications`} className="text-center">
          Ver todas publicações <IconArrowForward className="size-5" />
        </Link>
      </Container>

      {/* actions carousel */}
      <Container className="flex flex-col gap-8 pb-16 items-center">
        <h2 className="text-h3">Últimas ações</h2>
        <div className="w-full">
          <Carousel>
            {(isSlideInView) =>
              actions.map((action, index) => (
                <div
                  key={action.id}
                  className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                >
                  <CardAction
                    size="default"
                    action={{
                      slug: action.slug,
                      title: action.title,
                      image: action.image,
                      date: new Date(action.date),
                    }}
                    hideShadow={!isSlideInView(index)}
                  />
                </div>
              ))
            }
          </Carousel>
        </div>
        <Link to={`/actions`} className="text-center">
          Ver todas ações <IconArrowForward className="size-5" />
        </Link>
      </Container>

      <Container>
        <NewsletterBanner />
      </Container>
    </main>
  );
}
