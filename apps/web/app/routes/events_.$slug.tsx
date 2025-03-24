import { DocumentRenderer } from "~/components/DocumentRenderer";
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
  EventStatusType,
  QueryMode,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";
import { getRelatedTerms, handleNotFound, metaTags } from "~/utils";
import { parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { useLocale } from "~/lib/useLocale";

const EVENT_QUERY = gql`
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

const RELATED_QUERY = gql`
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
    EVENT_QUERY,
    { slug: params.slug },
  );

  handleNotFound(event, event?.status === EventStatusType.Published);

  const { terms } = getRelatedTerms(event?.title, event?.keywords);

  const { events: related } = await client.request<
    EventRelatedQuery,
    EventRelatedQueryVariables
  >(RELATED_QUERY, {
    where: {
      status: {
        equals: EventStatusType.Published,
      },
      id: {
        not: {
          equals: event?.id,
        },
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

  const locale = useLocale();
  const { t } = useTranslation();

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
            <div className="mb-6 text-gray-950">
              <DocumentRenderer document={event.content.document} />
            </div>
            <nav className="flex gap-4 mb-6">
              <ButtonLink to={event.link} external>
                {t("Event.subscribeButtonLabel")}
              </ButtonLink>
              <ButtonShare skin="ghost">
                {t("Event.shareButtonLabel")}
              </ButtonShare>
            </nav>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <CardContainer className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    {t("Event.workloadTitle")}
                  </span>
                  <span className="text-gray-950 lowercase">
                    {event.workload}{" "}
                    {t("Event.workloadText", { count: event.workload })}
                  </span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    {t("Event.dateTitle")}
                  </span>
                  <p className="text-gray-950">
                    {parseISO(event.date).toLocaleDateString(locale)}
                  </p>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    {t("Event.localeTitle")}
                  </span>
                  <span className="text-gray-950">{event.locale}</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <ExternalLink to={event.link}>
                  <IconArrowForward className="size-5" />{" "}
                  {t("Event.actionToSubscribeLabel")}
                </ExternalLink>
              </div>
            </CardContainer>
          </div>
          {!!related?.length && (
            <div className="col-span-12 flex flex-col gap-6">
              <h2 className="text-h3 text-gray-950">
                {t("Event.relatedTitle")}
              </h2>
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
                            date: parseISO(relatedEvent.date),
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
