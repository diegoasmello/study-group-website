import {
  EventDocument,
  EventPaginatedDocument,
  EventPaginatedQuery,
  EventPaginatedQueryVariables,
  EventQuery,
  EventQueryVariables,
  EventRelatedDocument,
  EventRelatedQuery,
  EventRelatedQueryVariables,
  EventSectionDocument,
  EventSectionQuery,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";
import { getRelatedTermsWhereInput } from "~/utils";
import { paginate } from "~/utils/paginator.server";

export async function getEvent(slug: string) {
  const { event } = await client.request<EventQuery, EventQueryVariables>(
    EventDocument,
    { slug },
  );
  return event;
}

export async function getEventSection() {
  const { eventsSection } =
    await client.request<EventSectionQuery>(EventSectionDocument);
  return eventsSection;
}

export async function getEventRelated(id: string, terms: string[]) {
  const { events } = await client.request<
    EventRelatedQuery,
    EventRelatedQueryVariables
  >(EventRelatedDocument, {
    id,
    terms: getRelatedTermsWhereInput(terms),
  });

  return events;
}

export async function getEventPaginated(query: string | null, page: number) {
  const paginatedEvents = await paginate<
    EventPaginatedQuery["data"],
    EventPaginatedQueryVariables
  >({
    query: EventPaginatedDocument,
    pageInfo: {
      currentPage: page,
      perPage: 6,
    },
    variables: { query: query ?? "" },
  });

  return paginatedEvents;
}
