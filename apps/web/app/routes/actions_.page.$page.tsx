import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  MetaFunction,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { gql } from "graphql-request";
import { useEffect } from "react";
import { CardAction } from "~/components/CardAction";
import { Container } from "~/components/Container";
import { TextInput } from "~/components/form-fields/TextInput";
import { IconSearch } from "~/components/icons";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { NoResults } from "~/components/NoResults";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import {
  ActionsPageHeroQuery,
  ActionsPageQuery,
  ActionsPageQueryVariables,
} from "~/graphql/generated";

import { client } from "~/lib/graphql-client";
import { getRootMatch, handleNotFound, metaTags, paginate } from "~/utils";

const pageQuery = gql`
  query ActionsPage($query: String, $take: Int, $skip: Int) {
    data: actions(
      take: $take
      skip: $skip
      where: {
        status: { equals: "published" }
        title: { contains: $query, mode: insensitive }
      }
      orderBy: { publishedAt: desc }
    ) {
      id
      slug
      title
      date
      image {
        url
      }
    }
    count: actionsCount
  }
`;

const heroQuery = gql`
  query ActionsPageHero {
    sectionContents(where: { section: { equals: ACTIONS_HERO } }) {
      id
      title
      content
    }
  }
`;

export const meta: MetaFunction<typeof loader> = ({
  data,
  matches,
  location,
}) => {
  const {
    data: { company },
  } = getRootMatch(matches);

  return metaTags({
    title: data?.heroSection?.title + " | " + company?.title,
    description: data?.heroSection?.content,
    pathname: location.pathname,
    url: data?.url,
  });
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const page = params.page ? Number(params.page) : 1;

  const paginatedActions = await paginate<
    ActionsPageQuery["data"],
    ActionsPageQueryVariables
  >(
    pageQuery,
    {
      currentPage: page,
      perPage: 6,
    },
    { query: q ?? "" },
  );

  const { sectionContents } =
    await client.request<ActionsPageHeroQuery>(heroQuery);

  handleNotFound(paginatedActions?.data?.length, q);

  return json({
    heroSection: sectionContents?.[0],
    paginatedActions,
    q,
    url: request.url,
  });
}

export default function ActionsPage() {
  const {
    heroSection,
    paginatedActions: { data: actions, meta: metaPaginated },
    q,
  } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  if (!heroSection) return null;

  const isFiltering = !!q?.length;

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={heroSection.title}
        text={heroSection.content}
        illustration={
          <img
            src="/assets/illustrations/actions.svg"
            alt=""
            className="h-[552px] max-w-max absolute top-[-74px] right-[-120px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <Form
            action="/actions"
            role="search"
            className="col-span-12 flex gap-8"
            onChange={(event) => {
              const isFirstSearch = q === null;
              submit(event.currentTarget, {
                replace: !isFirstSearch,
              });
            }}
          >
            <TextInput
              name="q"
              id="q"
              type="search"
              defaultValue={q || ""}
              placeholder="Pesquise por título, data ou palavras-chave"
              className="w-full lg:w-[34vw]"
              Icon={IconSearch}
            />
          </Form>

          {isFiltering && !actions?.length ? (
            <div className="col-span-12 mb-10">
              <NoResults />
            </div>
          ) : (
            actions?.map((action) => (
              <div key={action.id} className="col-span-12 lg:col-span-6">
                <CardAction
                  size="extended"
                  className="h-full"
                  action={{
                    slug: action.slug,
                    title: action.title,
                    image: action.image.url,
                    date: new Date(action.date),
                  }}
                />
              </div>
            ))
          )}

          {!!actions?.length && (
            <div className="col-span-12 flex justify-center mt-8 mb-10">
              <Paginator {...metaPaginated} />
            </div>
          )}

          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
