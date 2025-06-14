import { HistoryDocument, HistoryQuery } from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";

export async function getHistory() {
  const data = await client.request<HistoryQuery>(HistoryDocument);
  return data;
}
