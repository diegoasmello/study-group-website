import { LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  MetaFunction,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { parseISO } from "date-fns";
import { CardContainer } from "~/components/Card";
import { CardPublication } from "~/components/CardPublication";
import { CardResearch } from "~/components/CardResearch";
import { Container } from "~/components/Container";
import { ComboboxItem } from "~/components/form-fields/ComboboxInput";
import { IconChevronDown } from "~/components/icons";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import { NoResults } from "~/components/NoResults";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import clsx from "clsx";
import { checkPageNotFound, getRootMatch, metaTags } from "~/utils";
import { gql } from "graphql-request";
import { client } from "~/lib/graphql-client.server";
import {
  PublicationsPageQuery,
  PublicationsPaginatedQuery,
  PublicationsPaginatedQueryVariables,
  PublicationStatusType,
  QueryMode,
} from "~/graphql/generated";
import { paginate } from "~/utils/paginator.server";
import { FilterForm } from "~/components/FilterForm";
import { useTranslation } from "react-i18next";

const PUBLICATIONS_QUERY = gql`
  query PublicationsPaginated(
    $where: PublicationWhereInput
    $take: Int
    $skip: Int
  ) {
    data: publications(
      take: $take
      skip: $skip
      where: $where
      orderBy: { publishedAt: desc }
    ) {
      id
      slug
      title
      link
      date
      resume
      researchers {
        id
        name
      }
    }
    count: publicationsCount(where: $where)
  }
`;

const PAGE_QUERY = gql`
  query PublicationsPage {
    publicationsSection {
      id
      title
      content
    }
    researchAreas(where: { status: { equals: published } }) {
      id
      title
    }
    researchers(
      where: { publications: { every: { status: { equals: published } } } }
    ) {
      id
      name
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
  const searchParams = parseSearchParams(url.searchParams);
  const page = params.page ? Number(params.page) : 1;

  const paginatedPublications = await paginate<
    PublicationsPaginatedQuery["data"],
    PublicationsPaginatedQueryVariables
  >({
    query: PUBLICATIONS_QUERY,
    pageInfo: {
      currentPage: page,
      perPage: 6,
    },
    variables: {
      where: {
        status: {
          equals: PublicationStatusType.Published,
        },
        researchers: {
          some: searchParams.researcher?.value
            ? {
                id: {
                  equals: searchParams.researcher
                    ? searchParams.researcher.value
                    : undefined,
                },
              }
            : undefined,
        },
        title: {
          contains: searchParams.query ?? "",
          mode: QueryMode.Insensitive,
        },
        researchArea: {
          id: {
            in: searchParams.researchAreas,
          },
        },
        date: {
          ...(searchParams.startDate ? { gte: searchParams.startDate } : {}),
          ...(searchParams.endDate ? { lte: searchParams.endDate } : {}),
        },
      },
    },
  });

  const { publicationsSection, researchAreas, researchers } =
    await client.request<PublicationsPageQuery>(PAGE_QUERY);

  checkPageNotFound({ page, lastPage: paginatedPublications.meta.lastPage });

  return json({
    heroSection: publicationsSection,
    researchAreas: researchAreas,
    researchers: researchers,
    paginatedPublications: paginatedPublications,
    url: request.url,
  });
}

export default function PublicationsPage() {
  const {
    heroSection,
    researchAreas,
    researchers,
    paginatedPublications: { data: publications, meta: paginatedMeta },
  } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const parsedSearchParams = parseSearchParams(searchParams);

  const isFiltering = !!Object.values(parsedSearchParams).filter((i) => i)
    .length;

  if (!heroSection)
    return (
      <div className="py-20">
        <NoResults text={t("PublicationList.empty")} />
      </div>
    );

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={heroSection.title}
        text={heroSection.content}
        illustration={
          <img
            src="/assets/illustrations/publications.svg"
            alt=""
            className="h-[605px] max-w-max absolute top-[-160px] right-[-120px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 grid lg:hidden">
            <CardContainer className="p-6">
              <Disclosure defaultOpen={isFiltering}>
                {({ open }) => (
                  <Fragment>
                    <DisclosureButton className="flex justify-between">
                      <span className="text-h5 text-primary uppercase font-medium">
                        {t("PublicationList.filterTitle")}
                      </span>
                      <IconChevronDown
                        className={clsx(
                          "size-6 -mr-2 transition-all text-primary",
                          open && "rotate-180",
                        )}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-4">
                      <FilterForm
                        action="/publications"
                        className="flex flex-col items-start gap-6"
                        researchAreas={researchAreas ?? []}
                        researchers={researchers ?? []}
                        defaultValues={parsedSearchParams}
                      />
                    </DisclosurePanel>
                  </Fragment>
                )}
              </Disclosure>
            </CardContainer>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {!publications?.length ? (
              <NoResults
                className="pt-5"
                text={
                  isFiltering
                    ? t("PublicationList.emptySearch")
                    : t("PublicationList.empty")
                }
              />
            ) : (
              publications.map((publication) => (
                <CardPublication
                  key={publication.id}
                  size="extended"
                  hideText
                  publication={{
                    slug: publication.slug,
                    title: publication.title,
                    description: publication.resume,
                    researchers: publication.researchers ?? [],
                    date: parseISO(publication.date),
                    link: publication.link,
                  }}
                />
              ))
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 flex-col gap-6 hidden lg:flex">
            <CardContainer className="p-6">
              <FilterForm
                action="/publications"
                className="flex flex-col items-start gap-6"
                researchAreas={researchAreas ?? []}
                researchers={researchers ?? []}
                defaultValues={parsedSearchParams}
              />
            </CardContainer>
            <CardResearch />
          </div>
        </section>
        <section className="grid grid-cols-12 gap-6">
          {!!publications?.length && (
            <div className="col-span-12 flex justify-center mt-8">
              <Paginator {...paginatedMeta} />
            </div>
          )}
          <div className="col-span-12 mt-10">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}

function parseSearchParams(searchParams: URLSearchParams) {
  const researcher: ComboboxItem = JSON.parse(
    decodeURIComponent(searchParams.get("researcher")!),
  );
  const startDate = searchParams.get("startDate") ?? undefined;
  const endDate = searchParams.get("endDate") ?? undefined;
  const researchAreas = searchParams.getAll("researchAreas[]");

  return {
    query: searchParams.get("q") ?? undefined,
    researchAreas: researchAreas.length ? researchAreas : undefined,
    researcher: researcher,
    startDate: startDate,
    endDate: endDate,
  };
}
