import {
  PublicationDocument,
  PublicationPageDocument,
  PublicationPageQuery,
  PublicationPaginatedDocument,
  PublicationPaginatedQuery,
  PublicationPaginatedQueryVariables,
  PublicationQuery,
  PublicationQueryVariables,
  PublicationRelatedDocument,
  PublicationRelatedQuery,
  PublicationRelatedQueryVariables,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";
import { PublicationParams } from "~/routes/publications_.page.$page";
import { getRelatedTermsWhereInput } from "~/utils";
import { paginate } from "~/utils/paginator.server";

export async function getPublication(slug: string) {
  const { publication } = await client.request<
    PublicationQuery,
    PublicationQueryVariables
  >(PublicationDocument, { slug });
  return publication;
}

export async function getPublicationRelated(id: string, terms: string[]) {
  const { publications } = await client.request<
    PublicationRelatedQuery,
    PublicationRelatedQueryVariables
  >(PublicationRelatedDocument, {
    id,
    terms: getRelatedTermsWhereInput(terms),
  });

  return publications;
}

export async function getPublicationPaginated(
  page: number,
  searchParams: PublicationParams,
) {
  const paginatedPublications = await paginate<
    PublicationPaginatedQuery["data"],
    PublicationPaginatedQueryVariables
  >({
    query: PublicationPaginatedDocument,
    pageInfo: {
      currentPage: page,
      perPage: 6,
    },
    variables: {
      researcher: searchParams.researcher?.value || undefined,
      researchAreas: searchParams.researchAreas,
      query: searchParams.query,
      startDate: searchParams.startDate || undefined,
      endDate: searchParams.endDate || undefined,
    },
  });

  return paginatedPublications;
}

export async function getPublicationPage() {
  const data = await client.request<PublicationPageQuery>(
    PublicationPageDocument,
  );
  return data;
}
