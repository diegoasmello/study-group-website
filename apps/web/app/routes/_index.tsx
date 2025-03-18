import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Card } from "~/components/Card";
import { CardAction } from "~/components/CardAction";
import { CardEvent } from "~/components/CardEvent";
import { CardPublication } from "~/components/CardPublication";
import { Container } from "~/components/Container";
import { Link } from "~/components/Link";
import { IconArrowForward } from "~/components/icons/IconArrowForward";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { Carousel } from "~/components/Carousel";
import { CarouselHome, CarouselHomeItem } from "~/components/CarouselHome";
import { ButtonLink } from "~/components/ButtonLink";
import { useLoaderData } from "@remix-run/react";
import { getRootMatch, metaTags } from "~/utils";
import { gql } from "graphql-request";
import { client } from "~/lib/graphql-client.server";
import { HomePageQuery } from "~/graphql/generated";

const HOME_PAGE_QUERY = gql`
  query HomePage {
    sectionContents(where: { section: { equals: HOME_HERO } }) {
      title
      content
      image {
        url
      }
    }
    researchAreas {
      id
      title
      resume
      icon {
        url
      }
    }
    events(take: 9, orderBy: { publishedAt: desc }) {
      id
      slug
      title
      resume
      date
      locale
      link
      image {
        url
      }
    }
    actions(take: 9, orderBy: { publishedAt: desc }) {
      id
      slug
      title
      resume
      date
      image {
        url
      }
    }
    publications(take: 5, orderBy: { publishedAt: desc }) {
      id
      slug
      title
      resume
      date
      link
      researchers {
        id
        name
      }
    }
  }
`;

export const meta: MetaFunction<typeof loader> = ({
  data,
  matches,
  location,
}) => {
  const {
    data: { company, heroSection },
  } = getRootMatch(matches);

  return metaTags({
    title: company?.title,
    description: heroSection?.content,
    pathname: location.pathname,
    url: data?.url,
  });
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { actions, events, publications, researchAreas, sectionContents } =
    await client.request<HomePageQuery>(HOME_PAGE_QUERY);

  return json({
    heroSection: sectionContents?.[0],
    researchAreas: researchAreas ?? [],
    events: events ?? [],
    publications: publications ?? [],
    actions: actions ?? [],
    url: request.url,
  });
}

export default function Index() {
  const { heroSection, researchAreas, events, publications, actions } =
    useLoaderData<typeof loader>();

  const carouselItems: CarouselHomeItem[] = [
    ...events.map(
      (event): CarouselHomeItem => ({
        id: event.id,
        slug: event.slug,
        title: event.title,
        description: event.resume,
        image: event.image.url,
        date: Number(event.date),
        type: "event",
      }),
    ),
    ...actions.map(
      (action): CarouselHomeItem => ({
        id: action.id,
        slug: action.slug,
        title: action.title,
        description: action.resume,
        image: action.image.url,
        date: Number(action.date),
        type: "action",
      }),
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
              src={heroSection?.image?.url}
              alt="About the group"
              className="w-full rounded-3xl"
            />
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-primary font-medium">About the group</span>
              <div className="flex flex-col gap-4">
                <span className="text-h2">{heroSection?.title}</span>
                <p className="text-gray-800">{heroSection?.content}</p>
              </div>
            </div>

            <nav className="flex flex-row gap-4">
              <ButtonLink to={"/history"}>History</ButtonLink>
              <ButtonLink to={"/team"} skin="outline">
                Team
              </ButtonLink>
            </nav>
          </div>
        </div>
      </Container>

      {/* research section */}
      <Container className="flex flex-col gap-8 pb-16 items-center">
        <h2 className="text-h3">Research areas</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {researchAreas.map((researchArea) => (
            <Card
              key={researchArea.id}
              type="flat"
              title={researchArea.title}
              text={researchArea.resume}
              icon={
                <img
                  src={researchArea.icon.url}
                  alt=""
                  className="size-[4.5rem]"
                />
              }
            />
          ))}
        </div>
        <Link to={`/research`} className="text-center">
          Learn more about our research <IconArrowForward className="size-5" />
        </Link>
      </Container>

      {/* events carousel */}
      <Container className="flex flex-col gap-8 pb-16 items-center">
        <h2 className="text-h3">Events and Courses</h2>
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
                      image: event.image.url,
                      date: new Date(event.date),
                      locale: event.locale,
                      link: event.link,
                    }}
                  />
                </div>
              ))
            }
          </Carousel>
        </div>
        <Link to={`/events`} className="text-center">
          See all events <IconArrowForward className="size-5" />
        </Link>
      </Container>

      {/* last publications */}
      {publications.length && (
        <Container className="flex flex-col gap-8 pb-16 items-center">
          <h2 className="text-h3 text-center lg:text-left w-full">
            Latest publications
          </h2>

          <div className="w-full lg:hidden">
            <Carousel>
              {(isSlideInView) =>
                publications.map((publication, index) => (
                  <div
                    key={publication.id}
                    className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                  >
                    <CardPublication
                      className="h-full"
                      size="default"
                      publication={{
                        slug: publication.slug,
                        title: publication.title,
                        description: publication.resume,
                        date: new Date(publication.date),
                        researchers: publication.researchers ?? [],
                        link: publication.link,
                      }}
                      hideShadow={!isSlideInView(index)}
                    />
                  </div>
                ))
              }
            </Carousel>
          </div>

          <div className="grid-cols-4 grid-rows-2 gap-8 hidden lg:grid">
            <div className="col-span-2 row-span-2">
              <CardPublication
                className="h-full"
                size="extended"
                publication={{
                  slug: publications[0].slug,
                  title: publications[0].title,
                  description: publications[0].resume,
                  date: new Date(publications[0].date),
                  researchers: publications[0].researchers ?? [],
                  link: publications[0].link,
                }}
              />
            </div>
            <div className="col-start-3">
              <CardPublication
                className="h-full"
                size="default"
                publication={{
                  slug: publications[1].slug,
                  title: publications[1].title,
                  description: publications[1].resume,
                  date: new Date(publications[1].date),
                  researchers: publications[1].researchers ?? [],
                  link: publications[1].link,
                }}
              />
            </div>
            <div className="col-start-3 row-start-2">
              <CardPublication
                className="h-full"
                size="default"
                publication={{
                  slug: publications[2].slug,
                  title: publications[2].title,
                  description: publications[2].resume,
                  date: new Date(publications[2].date),
                  researchers: publications[2].researchers ?? [],
                  link: publications[2].link,
                }}
              />
            </div>
            <div className="col-start-4 row-start-1">
              <CardPublication
                className="h-full"
                size="default"
                publication={{
                  slug: publications[3].slug,
                  title: publications[3].title,
                  description: publications[3].resume,
                  date: new Date(publications[3].date),
                  researchers: publications[3].researchers ?? [],
                  link: publications[3].link,
                }}
              />
            </div>
            <div className="col-start-4 row-start-2">
              <CardPublication
                className="h-full"
                size="default"
                publication={{
                  slug: publications[4].slug,
                  title: publications[4].title,
                  description: publications[4].resume,
                  date: new Date(publications[4].date),
                  researchers: publications[4].researchers ?? [],
                  link: publications[4].link,
                }}
              />
            </div>
          </div>
          <Link to={`/publications`} className="text-center">
            See all publications <IconArrowForward className="size-5" />
          </Link>
        </Container>
      )}

      {/* actions carousel */}
      <Container className="flex flex-col gap-8 pb-16 items-center">
        <h2 className="text-h3">Latest actions</h2>
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
                      image: action.image.url,
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
          See all actions <IconArrowForward className="size-5" />
        </Link>
      </Container>

      <Container>
        <NewsletterBanner />
      </Container>
    </main>
  );
}
