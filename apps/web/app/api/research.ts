import { ResearchDocument, ResearchQuery } from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";

export async function getResearch() {
  const data = await client.request<ResearchQuery>(ResearchDocument);
  return data;
}
