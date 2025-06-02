import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  MetaFunction,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { parseISO } from "date-fns";
import { gql } from "graphql-request";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CardEvent } from "~/components/CardEvent";
import { Container } from "~/components/Container";
import { TextInput } from "~/components/TextInput";
import { IconSearch } from "~/components/icons";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { NoResults } from "~/components/NoResults";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import {
  EventsPageQuery,
  EventsPaginatedQuery,
  EventsPaginatedQueryVariables,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";
import { checkPageNotFound, getRootMatch, metaTags } from "~/utils";
import { paginate } from "~/utils/paginator.server";

const EVENTS_QUERY = gql`
  query EventsPaginated($query: String, $take: Int, $skip: Int) {
    data: events(
      take: $take
      skip: $skip
      where: {
        status: { equals: published }
        title: { contains: $query, mode: insensitive }
      }
      orderBy: { publishedAt: desc }
    ) {
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
    count: eventsCount(
      where: {
        status: { equals: published }
        title: { contains: $query, mode: insensitive }
      }
    )
  }
`;

const PAGE_QUERY = gql`
  query EventsPage {
    eventsSection {
      id
      title
      content
    }
  }
`;

export const meta: MetaFunction<typeof loader> = ({
  data,
  matches,
  location,
}) => {
  const {
    data: { company },
  } = getRootMatch(matches);

  return metaTags({
    title: data?.heroSection?.title + " | " + company?.title,
    description: data?.heroSection?.content,
    pathname: location.pathname,
    url: data?.url,
  });
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const page = params.page ? Number(params.page) : 1;

  const paginatedEvents = await paginate<
    EventsPaginatedQuery["data"],
    EventsPaginatedQueryVariables
  >({
    query: EVENTS_QUERY,
    pageInfo: {
      currentPage: page,
      perPage: 6,
    },
    variables: { query: q ?? "" },
  });

  const { eventsSection } = await client.request<EventsPageQuery>(PAGE_QUERY);

  checkPageNotFound({ page, lastPage: paginatedEvents.meta.lastPage });

  return json({
    heroSection: eventsSection,
    paginatedEvents,
    q,
    url: request.url,
  });
}

export default function EventsPage() {
  const {
    heroSection,
    paginatedEvents: { data: events, meta: metaPaginated },
    q,
  } = useLoaderData<typeof loader>();

  const submit = useSubmit();
  const { t } = useTranslation();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  if (!heroSection)
    return (
      <div className="py-20">
        <NoResults text={t("EventList.empty")} />
      </div>
    );

  const isFiltering = !!q?.length;

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={heroSection.title}
        text={heroSection.content}
        illustration={
          <img
            src="/assets/illustrations/events.svg"
            alt=""
            className="h-[472px] max-w-max absolute top-[-58px] right-[-100px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <Form
            action="/events"
            role="search"
            className="col-span-12 flex gap-8"
            onChange={(event) => {
              const isFirstSearch = q === null;
              submit(event.currentTarget, {
                replace: !isFirstSearch,
              });
            }}
          >
            <TextInput
              name="q"
              id="q"
              type="search"
              defaultValue={q || ""}
              placeholder={t("EventList.filterPlaceholder")}
              className="w-full lg:w-[34vw]"
              Icon={IconSearch}
            />
          </Form>

          {!events?.length ? (
            <div className="col-span-12 mb-10">
              <NoResults
                text={
                  isFiltering
                    ? t("EventList.emptySearch")
                    : t("EventList.empty")
                }
              />
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="col-span-12 lg:col-span-6">
                <CardEvent
                  size="extended"
                  className="h-full"
                  event={{
                    slug: event.slug,
                    title: event.title,
                    image: event.image.url,
                    date: parseISO(event.date),
                    locale: event.locale,
                    link: event.link,
                  }}
                />
              </div>
            ))
          )}

          {!!events?.length && (
            <div className="col-span-12 flex justify-center mt-8 mb-10">
              <Paginator {...metaPaginated} />
            </div>
          )}

          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
