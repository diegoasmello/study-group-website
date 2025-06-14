import {
  SearchFilterContentDocument,
  SearchFilterContentQuery,
  SearchPaginatedDocument,
  SearchPaginatedQuery,
  SearchPaginatedQueryVariables,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";
import { SearchParams } from "~/routes/search_.page.$page";
import { ArrayElement } from "~/types";
import { paginate } from "~/utils/paginator.server";

type SearchReturnType = Array<
  | ArrayElement<SearchPaginatedQuery["actions"]>
  | ArrayElement<SearchPaginatedQuery["events"]>
  | ArrayElement<SearchPaginatedQuery["publications"]>
  | ArrayElement<SearchPaginatedQuery["projects"]>
>;

export async function getSearchPaginated(
  page: number,
  searchParams: SearchParams,
) {
  const items = await paginate<
    SearchReturnType,
    SearchPaginatedQueryVariables,
    SearchPaginatedQuery
  >({
    query: SearchPaginatedDocument,
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

  return items;
}

export async function getSearchFilterContent() {
  const data = await client.request<SearchFilterContentQuery>(
    SearchFilterContentDocument,
  );
  return data;
}
