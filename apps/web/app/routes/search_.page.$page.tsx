import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData, useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import { parseISO } from "date-fns";
import { gql } from "graphql-request";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import { CardContainer } from "~/components/Card";
import { CardAction } from "~/components/CardAction";
import { CardEvent } from "~/components/CardEvent";
import { CardProject } from "~/components/CardProject";
import { CardPublication } from "~/components/CardPublication";
import { CardResearch } from "~/components/CardResearch";
import { Container } from "~/components/Container";
import { FilterForm, parseSearchParams } from "~/components/FilterForm";
import { IconChevronDown } from "~/components/icons";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { NoResults } from "~/components/NoResults";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import {
  SearchFilterContentQuery,
  SearchQuery,
  SearchQueryVariables,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";
import { ArrayElement } from "~/types";

import { getRootMatch } from "~/utils";
import { paginate } from "~/utils/paginator.server";

const SEARCH_QUERY = gql`
  query Search(
    $query: String
    $researchAreas: [ID!]
    $researcher: ID
    $startDate: CalendarDay
    $endDate: CalendarDay
  ) {
    actions(
      where: {
        status: { equals: published }
        title: { contains: $query, mode: insensitive }
        date: { gte: $startDate, lte: $endDate }
      }
    ) {
      id
      slug
      title
      image {
        url
      }
      date
      __typename
    }
    publications(
      where: {
        status: { equals: published }
        title: { contains: $query, mode: insensitive }
        researchers: { some: { id: { equals: $researcher } } }
        researchArea: { id: { in: $researchAreas } }
        date: { gte: $startDate, lte: $endDate }
      }
    ) {
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
      __typename
    }
    events(
      where: {
        status: { equals: published }
        title: { contains: $query, mode: insensitive }
        date: { gte: $startDate, lte: $endDate }
      }
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
      __typename
    }
    projects(
      where: {
        status: { equals: published }
        title: { contains: $query, mode: insensitive }
        researchers: { some: { id: { equals: $researcher } } }
        researchArea: { id: { in: $researchAreas } }
        startDate: { gte: $startDate }
        endDate: { lte: $endDate }
      }
    ) {
      id
      slug
      title
      image {
        url
      }
      __typename
    }
  }
`;

const FILTER_CONTENT_QUERY = gql`
  query SearchFilterContent {
    researchAreas(where: { status: { equals: published } }) {
      id
      title
    }
    researchers(
      where: { publications: { every: { status: { equals: published } } } }
    ) {
      id
      name
    }
  }
`;

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const {
    data: { company },
  } = getRootMatch(matches);
  return [{ title: "Search | " + company?.title }];
};

type SearchReturnType = Array<
  | ArrayElement<SearchQuery["actions"]>
  | ArrayElement<SearchQuery["events"]>
  | ArrayElement<SearchQuery["publications"]>
  | ArrayElement<SearchQuery["projects"]>
>;

export async function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams);
  const page = params.page ? Number(params.page) : 1;

  const items = await paginate<
    SearchReturnType,
    SearchQueryVariables,
    SearchQuery
  >({
    query: SEARCH_QUERY,
    pageInfo: {
      currentPage: page,
      perPage: 5,
    },
    variables: {
      researcher: searchParams.researcher?.value,
      researchAreas: searchParams.researchAreas,
      query: searchParams.query,
      startDate: searchParams.startDate || undefined,
      endDate: searchParams.endDate || undefined,
    },
    extract: (response) => ({
      count:
        (response.actions ?? [])?.length +
        (response.events ?? [])?.length +
        (response.publications ?? [])?.length +
        (response.projects ?? [])?.length,
      data: [
        ...(response.actions ?? []).map((item) => ({
          ...item,
          __typename: "Action",
        })),
        ...(response.publications ?? []).map((item) => ({
          ...item,
          __typename: "Publication",
        })),
        ...(response.events ?? []).map((item) => ({
          ...item,
          __typename: "Event",
        })),
        ...(response.projects ?? []).map((item) => ({
          ...item,
          __typename: "Project",
        })),
      ] as SearchReturnType,
    }),
  });

  const { researchAreas, researchers } =
    await client.request<SearchFilterContentQuery>(FILTER_CONTENT_QUERY);

  return json({ items, researchAreas, researchers });
}

export default function Search() {
  const { items, researchAreas, researchers } = useLoaderData<typeof loader>();

  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const parsedSearchParams = parseSearchParams(searchParams);

  const { data, meta } = items;

  const isFiltering = !!Object.values(parsedSearchParams).filter((i) => i)
    .length;

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title="Search"
        text={`${t("Search.showingLabel")} ${meta.total} ${t("Search.resultsLabel", { count: meta.total })}:`}
        illustration={
          <img
            src="/assets/illustrations/search.svg"
            alt=""
            className="h-[445px] max-w-max absolute top-[-56px] right-[-78px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 grid lg:hidden">
            <CardContainer className="p-6">
              <Disclosure defaultOpen={isFiltering}>
                {({ open }) => (
                  <Fragment>
                    <DisclosureButton className="flex justify-between">
                      <span className="text-h5 text-primary uppercase font-medium">
                        {t("PublicationList.filterTitle")}
                      </span>
                      <IconChevronDown
                        className={clsx(
                          "size-6 -mr-2 transition-all text-primary",
                          open && "rotate-180",
                        )}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-4">
                      <FilterForm
                        action="/publications"
                        className="flex flex-col items-start gap-6"
                        researchAreas={researchAreas ?? []}
                        researchers={researchers ?? []}
                        defaultValues={parsedSearchParams}
                      />
                    </DisclosurePanel>
                  </Fragment>
                )}
              </Disclosure>
            </CardContainer>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {data?.length ? (
              data.map((item) => {
                if (item.__typename === "Action") {
                  return (
                    <CardAction
                      key={item.id}
                      size="extended"
                      action={{
                        slug: item.slug,
                        title: item.title,
                        date: parseISO(item.date),
                        image: item.image.url,
                      }}
                    />
                  );
                }
                if (item.__typename === "Event") {
                  return (
                    <CardEvent
                      key={item.id}
                      size="extended"
                      event={{
                        slug: item.slug,
                        title: item.title,
                        date: parseISO(item.date),
                        image: item.image.url,
                        locale: item.locale,
                        link: item.link,
                      }}
                    />
                  );
                }
                if (item.__typename === "Publication") {
                  return (
                    <CardPublication
                      key={item.id}
                      size="extended"
                      publication={{
                        slug: item.slug,
                        title: item.title,
                        description: item.resume,
                        date: parseISO(item.date),
                        link: item.link,
                        researchers: item.researchers ?? [],
                      }}
                    />
                  );
                }
                if (item.__typename === "Project") {
                  return (
                    <CardProject
                      key={item.id}
                      size="extended"
                      project={{
                        slug: item.slug,
                        title: item.title,
                        image: item.image.url,
                      }}
                    />
                  );
                }
              })
            ) : (
              <NoResults
                className="pt-5"
                text={
                  isFiltering
                    ? t("PublicationList.emptySearch")
                    : t("PublicationList.empty")
                }
              />
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 flex-col gap-6 hidden lg:flex">
            <CardContainer className="p-6 flex flex-col items-start gap-6">
              <FilterForm
                action="/search"
                researchAreas={researchAreas ?? []}
                researchers={researchers ?? []}
                defaultValues={parsedSearchParams}
              />
            </CardContainer>
            <CardResearch />
          </div>
          <div className="col-span-12 flex justify-center mt-8 mb-10">
            <Paginator {...meta} />
          </div>
        </section>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
