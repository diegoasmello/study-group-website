import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  json,
  redirect,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { gql } from "graphql-request";
import { CardContainer } from "~/components/Card";
import { CardAction } from "~/components/CardAction";
import { CardEvent } from "~/components/CardEvent";
import { CardProject } from "~/components/CardProject";
import { CardPublication } from "~/components/CardPublication";
import { CardResearch } from "~/components/CardResearch";
import { Container } from "~/components/Container";
import { FilterForm, parseSearchParams } from "~/components/FilterForm";
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
import { getRootMatch } from "~/utils";
import { paginate } from "~/utils/paginator.server";

const SEARCH_QUERY = gql`
  query Search($query: String, $skip: Int, $take: Int) {
    data: search(query: $query, skip: $skip, take: $take) {
      totalCount
      items {
        ... on Action {
          id
          slug
          title
          image {
            url
          }
          date
          __typename
        }
        ... on Publication {
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
        ... on Event {
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
        ... on Project {
          id
          slug
          title
          image {
            url
          }
          __typename
        }
      }
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

export async function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams);
  const page = params.page ? Number(params.page) : 1;

  const items = await paginate<
    NonNullable<SearchQuery["data"]>["items"],
    SearchQueryVariables,
    SearchQuery
  >({
    query: SEARCH_QUERY,
    pageInfo: {
      currentPage: page,
      perPage: 5,
    },
    variables: {
      query: searchParams.query,
    },
    extract: (response) => ({
      data: response.data?.items ?? [],
      count: response.data?.totalCount ?? 0,
    }),
  });

  const { researchAreas, researchers } =
    await client.request<SearchFilterContentQuery>(FILTER_CONTENT_QUERY);

  if (!searchParams.query) return redirect("/");

  return json({ items, researchAreas, researchers });
}

export default function Search() {
  const { items, researchAreas, researchers } = useLoaderData<typeof loader>();

  const [searchParams] = useSearchParams();
  const parsedSearchParams = parseSearchParams(searchParams);

  const { data, meta } = items;

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title="Search"
        text={`Showing ${meta.total} results for “${parsedSearchParams.query}”:`} // pluralize
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
          <div className="col-span-8 flex flex-col gap-6">
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
                        date: new Date(item.date),
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
                        date: new Date(item.date),
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
                        date: new Date(item.date),
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
              <NoResults className="pt-5" />
            )}
          </div>
          <div className="col-span-4 flex flex-col gap-6">
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
