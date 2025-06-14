import {
  TeamPaginatedDocument,
  TeamPaginatedQuery,
  TeamPaginatedQueryVariables,
  TeamSectionDocument,
  TeamSectionQuery,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";
import { paginate } from "~/utils/paginator.server";

export async function getTeamSection() {
  const { teamSection } =
    await client.request<TeamSectionQuery>(TeamSectionDocument);
  return teamSection;
}

export async function getTeamPaginated(page: number) {
  const paginatedProjects = await paginate<
    TeamPaginatedQuery["data"],
    TeamPaginatedQueryVariables
  >({
    query: TeamPaginatedDocument,
    pageInfo: {
      currentPage: page,
      perPage: 6,
    },
  });

  return paginatedProjects;
}
