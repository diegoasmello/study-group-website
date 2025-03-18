import { ActionFunction, json } from "@remix-run/node";
import { gql } from "graphql-request";
import {
  AddNewsletterListMutation,
  AddNewsletterListMutationVariables,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";

const ADD_NEWSLETTER_MUTATION = gql`
  mutation AddNewsletterList($data: NewsletterListCreateInput!) {
    createNewsletterList(data: $data) {
      id
    }
  }
`;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email !== "string" || !email.includes("@")) {
    return json({ error: "E-mail inválido" }, { status: 400 });
  }

  try {
    await client.request<
      AddNewsletterListMutation,
      AddNewsletterListMutationVariables
    >(ADD_NEWSLETTER_MUTATION, { data: { email } });
  } catch (e) {
    return json({ error: "Error" }, { status: 400 });
  }

  return json({ success: true });
};
