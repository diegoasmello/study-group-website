import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { gql } from "graphql-request";
import { ButtonLink } from "~/components/ButtonLink";
import { ButtonShare } from "~/components/ButtonShare";
import { CardContainer } from "~/components/Card";
import { CardEvent } from "~/components/CardEvent";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { IconArrowForward } from "~/components/icons";
import { ExternalLink } from "~/components/Link";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import {
  EventQuery,
  EventQueryVariables,
  EventRelatedQuery,
  EventRelatedQueryVariables,
  QueryMode,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client";
import { getRelatedTerms, handleNotFound, metaTags } from "~/utils";

// where published
const query = gql`
  query Event($slug: String) {
    event(where: { slug: $slug }) {
      id
      slug
      title
      resume
      keywords
      link
      workload
      date
      locale
      status
      image {
        url
      }
      content {
        document
      }
    }
  }
`;

const relatedQuery = gql`
  query EventRelated($where: EventWhereInput) {
    events(where: $where) {
      id
      slug
      title
      date
      locale
      link
      image {
        url
      }
    }
  }
`;

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  return metaTags({
    title: data?.event?.title,
    description: data?.event?.resume,
    url: data?.url,
    pathname: location.pathname,
  });
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { event } = await client.request<EventQuery, EventQueryVariables>(
    query,
    { slug: params.slug },
  );

  handleNotFound(event, event?.status === "published");

  const { terms } = getRelatedTerms(event?.title, event?.keywords);

  const { events: related } = await client.request<
    EventRelatedQuery,
    EventRelatedQueryVariables
  >(relatedQuery, {
    where: {
      status: {
        equals: "published",
      },
      OR: terms.map((term) => ({
        OR: [
          {
            title: {
              contains: term,
              mode: QueryMode.Insensitive,
            },
          },
          {
            keywords: {
              contains: term,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      })),
    },
  });

  return json({ event, related, url: request.url });
}

export default function ViewEvent() {
  const { event, related } = useLoaderData<typeof loader>();

  if (!event) return null;

  return (
    <main className="pb-20  bg-page">
      <img
        src={event.image.url}
        alt={event.title}
        className="h-[340px] lg:h-[600px] w-full object-cover mb-12"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-h1 text-gray-950 mb-6">{event.title}</h1>
            <div
              className="mb-6 text-gray-950 grid gap-2"
              dangerouslySetInnerHTML={{ __html: event.content }}
            />
            <nav className="flex gap-4 mb-6">
              <ButtonLink to={event.link} external>
                Inscrever-se
              </ButtonLink>
              <ButtonShare skin="ghost">Compartilhar</ButtonShare>
            </nav>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <CardContainer className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Carga horária
                  </span>
                  <span className="text-gray-950">{event.workload} horas</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Data e hora
                  </span>
                  <p className="text-gray-950">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Local
                  </span>
                  <span className="text-gray-950">{event.locale}</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <ExternalLink to={event.link}>
                  <IconArrowForward className="size-5" /> Clique aqui para se
                  inscrever
                </ExternalLink>
              </div>
            </CardContainer>
          </div>
          {!!related?.length && (
            <div className="col-span-12 flex flex-col gap-6">
              <h2 className="text-h3 text-gray-950">Outros eventos</h2>
              <div className="w-full">
                <Carousel>
                  {(isSlideInView) =>
                    related.map((relatedEvent, index) => (
                      <div
                        key={index}
                        className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                      >
                        <CardEvent
                          size="default"
                          hideShadow={!isSlideInView(index)}
                          hideLocale
                          event={{
                            slug: relatedEvent.slug,
                            title: relatedEvent.title,
                            image: relatedEvent.image.url,
                            date: new Date(relatedEvent.date),
                            locale: relatedEvent.locale,
                            link: relatedEvent.link,
                          }}
                        />
                      </div>
                    ))
                  }
                </Carousel>
              </div>
            </div>
          )}
          <div className="col-span-12 mt-8">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
