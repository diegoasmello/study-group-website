import { client } from "~/lib/graphql-client.server";
import {
  ActionDocument,
  ActionPaginatedDocument,
  ActionPaginatedQuery,
  ActionPaginatedQueryVariables,
  ActionRelatedDocument,
  ActionSectionDocument,
  ActionSectionQuery,
  type ActionQuery,
  type ActionQueryVariables,
  type ActionRelatedQuery,
  type ActionRelatedQueryVariables,
} from "~/graphql/generated";
import { paginate } from "~/utils/paginator.server";
import { getRelatedTermsWhereInput } from "~/utils";

export async function getAction(slug: string) {
  const { action } = await client.request<ActionQuery, ActionQueryVariables>(
    ActionDocument,
    { slug },
  );
  return action;
}

export async function getActionSection() {
  const { actionsSection } = await client.request<ActionSectionQuery>(
    ActionSectionDocument,
  );
  return actionsSection;
}

export async function getActionRelated(id: string, terms: string[]) {
  const { actions } = await client.request<
    ActionRelatedQuery,
    ActionRelatedQueryVariables
  >(ActionRelatedDocument, {
    id,
    terms: getRelatedTermsWhereInput(terms),
  });

  return actions;
}

export async function getActionPaginated(query: string | null, page: number) {
  const paginatedActions = await paginate<
    ActionPaginatedQuery["data"],
    ActionPaginatedQueryVariables
  >({
    query: ActionPaginatedDocument,
    pageInfo: {
      currentPage: page,
      perPage: 6,
    },
    variables: { query: query ?? "" },
  });

  return paginatedActions;
}
