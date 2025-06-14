import { HomeDocument, HomeQuery } from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";

export async function getHome() {
  const data = await client.request<HomeQuery>(HomeDocument);
  return data;
}
