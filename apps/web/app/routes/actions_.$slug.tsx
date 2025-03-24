import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { parseISO } from "date-fns";
import { gql } from "graphql-request";
import { useTranslations } from "use-intl";
import { ButtonShare } from "~/components/ButtonShare";
import { CardAction } from "~/components/CardAction";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { DocumentRenderer } from "~/components/DocumentRenderer";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import {
  ActionQuery,
  ActionQueryVariables,
  ActionRelatedQuery,
  ActionRelatedQueryVariables,
  ActionStatusType,
  QueryMode,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";
import { getRelatedTerms, handleNotFound, metaTags } from "~/utils";

const ACTION_QUERY = gql`
  query Action($slug: String) {
    action(where: { slug: $slug }) {
      id
      slug
      title
      resume
      keywords
      status
      image {
        url
      }
      content {
        document
      }
    }
  }
`;

const RELATED_QUERY = gql`
  query ActionRelated($where: ActionWhereInput) {
    actions(where: $where) {
      id
      slug
      title
      date
      image {
        url
      }
    }
  }
`;

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  return metaTags({
    title: data?.action?.title,
    description: data?.action?.resume,
    url: data?.url,
    pathname: location.pathname,
  });
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { action } = await client.request<ActionQuery, ActionQueryVariables>(
    ACTION_QUERY,
    { slug: params.slug },
  );

  handleNotFound(action, action?.status === ActionStatusType.Published);

  const { terms } = getRelatedTerms(action?.title, action?.keywords);

  const { actions: related } = await client.request<
    ActionRelatedQuery,
    ActionRelatedQueryVariables
  >(RELATED_QUERY, {
    where: {
      status: {
        equals: ActionStatusType.Published,
      },
      id: {
        not: {
          equals: action?.id,
        },
      },
      OR: terms.map((term) => ({
        OR: [
          {
            title: {
              contains: term,
              mode: QueryMode.Insensitive,
            },
          },
          {
            keywords: {
              contains: term,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      })),
    },
  });

  return json({ action, related, url: request.url });
}

export default function ViewAction() {
  const { action, related } = useLoaderData<typeof loader>();

  const t = useTranslations("Action");

  if (!action) return null;

  return (
    <main className="pb-20  bg-page">
      <img
        src={action.image.url}
        alt=""
        className="h-[340px] lg:h-[600px] w-full object-cover mb-12"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <h1 className="text-h1 text-gray-950 mb-6">{action.title}</h1>
            <div className="mb-6 text-gray-950">
              <DocumentRenderer document={action.content.document} />
            </div>
            <nav className="flex gap-4 mb-6">
              <ButtonShare>{t("shareButtonLabel")}</ButtonShare>
            </nav>
          </div>
          {!!related?.length && (
            <div className="col-span-12 flex flex-col gap-6">
              <h2 className="text-h3 text-gray-950">{t("relatedTitle")}</h2>
              <div className="w-full">
                <Carousel>
                  {(isSlideInView) =>
                    related.map((relatedAction, index) => (
                      <div
                        key={relatedAction.id}
                        className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                      >
                        <CardAction
                          size="default"
                          action={{
                            slug: relatedAction.slug,
                            title: relatedAction.title,
                            image: relatedAction.image.url,
                            date: parseISO(relatedAction.date),
                          }}
                          hideShadow={!isSlideInView(index)}
                        />
                      </div>
                    ))
                  }
                </Carousel>
              </div>
            </div>
          )}
          <div className="col-span-12 mt-8">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
