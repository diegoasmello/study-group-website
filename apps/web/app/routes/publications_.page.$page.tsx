import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  MetaFunction,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { parseISO } from "date-fns";
import { Button } from "~/components/Button";
import { CardContainer } from "~/components/Card";
import { CardPublication } from "~/components/CardPublication";
import { CardResearch } from "~/components/CardResearch";
import { Container } from "~/components/Container";
import { CheckboxInput } from "~/components/form-fields/CheckboxInput";
import {
  ComboboxInput,
  ComboboxItem,
} from "~/components/form-fields/ComboboxInput";
import {
  DateRange,
  DateRangeInput,
} from "~/components/form-fields/DateRangeInput";
import { FormControl } from "~/components/form-fields/FormControl";
import { TextInput } from "~/components/form-fields/TextInput";
import { IconChevronDown, IconSearch } from "~/components/icons";
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
import { getRootMatch, handleNotFound, metaTags, paginate } from "~/utils";
import { gql } from "graphql-request";
import { client } from "~/lib/graphql-client";
import {
  PublicationsPageHeroQuery,
  PublicationsPageQuery,
  PublicationsPageQueryVariables,
  PublicationStatusType,
  QueryMode,
  ResearchAreasQuery,
  ResearchersQuery,
} from "~/graphql/generated";
import { flags } from "flags";

const pageQuery = gql`
  query PublicationsPage(
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
    count: publicationsCount(where: { status: { equals: published } })
  }
`;

const researchAreasQuery = gql`
  query ResearchAreas {
    researchAreas(where: { status: { equals: published } }) {
      id
      title
    }
  }
`;

const researchersQuery = gql`
  query Researchers {
    researchers(
      where: { publications: { every: { status: { equals: published } } } }
    ) {
      id
      name
    }
  }
`;

const heroQuery = gql`
  query PublicationsPageHero {
    sectionContents(where: { section: { equals: EVENTS_HERO } }) {
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
  const searchParams = parseSearchParams(url.searchParams);
  const page = params.page ? Number(params.page) : 1;

  const paginatedPublications = await paginate<
    PublicationsPageQuery["data"],
    PublicationsPageQueryVariables
  >(
    pageQuery,
    {
      currentPage: page,
      perPage: 6,
    },
    {
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
          gte: searchParams.startDate,
          lte: searchParams.endDate,
        },
      },
    },
  );

  const { sectionContents } =
    await client.request<PublicationsPageHeroQuery>(heroQuery);
  const { researchAreas } =
    await client.request<ResearchAreasQuery>(researchAreasQuery);
  const { researchers } =
    await client.request<ResearchersQuery>(researchersQuery);

  handleNotFound(
    paginatedPublications?.data?.length,
    ...Object.values(searchParams),
  );

  return json({
    heroSection: sectionContents?.[0],
    researchAreas: researchAreas,
    researchers: researchers,
    paginatedPublications: paginatedPublications,
    searchParams,
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

  const [searchParams] = useSearchParams();
  const parsedSearchParams = parseSearchParams(searchParams);

  const researchersInputItems = [
    { label: "Todos", value: "" },
    ...(researchers?.map((researcher) => ({
      label: researcher.name,
      value: researcher.id.toString(),
    })) ?? []),
  ];

  const dateRangeDefaultValue: DateRange = {
    endDate: parsedSearchParams.endDate,
    startDate: parsedSearchParams.startDate,
  };

  const isFiltering = !!Object.values(parsedSearchParams).filter((i) => i)
    .length;

  if (!heroSection) return null;

  function FilterForm() {
    return (
      <Form
        className="flex flex-col items-start gap-6"
        id="publication-filter"
        action="/publications"
      >
        <TextInput
          id="q"
          name="q"
          placeholder="Pesquisa por título ou autor"
          Icon={IconSearch}
          className="w-full"
          defaultValue={parsedSearchParams.query}
        />
        <FormControl label="Áreas de pesquisa">
          <div className="flex flex-col gap-2">
            {researchAreas?.map((researchArea) => (
              <CheckboxInput
                name="researchAreas[]"
                key={researchArea.id}
                label={researchArea.title}
                value={researchArea.id}
                defaultChecked={parsedSearchParams.researchAreas?.includes(
                  researchArea.id,
                )}
              />
            ))}
          </div>
        </FormControl>
        <ComboboxInput
          name="researcher"
          label="Autor(a)"
          immediate
          items={researchersInputItems}
          defaultValue={
            parsedSearchParams.researcher ?? researchersInputItems[0]
          }
        />
        <DateRangeInput
          label="Período da publicação"
          defaultValue={dateRangeDefaultValue}
        />
        <nav className="flex gap-2">
          <Button size="md">Buscar</Button>
          {flags.CLEAR_FILTERS_ENABLED && isFiltering && (
            <Button size="md" skin="ghost" type="button">
              Limpar filtros
            </Button>
          )}
        </nav>
      </Form>
    );
  }

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
                        Filtros
                      </span>
                      <IconChevronDown
                        className={clsx(
                          "size-6 -mr-2 transition-all text-primary",
                          open && "rotate-180",
                        )}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-4">
                      <FilterForm />
                    </DisclosurePanel>
                  </Fragment>
                )}
              </Disclosure>
            </CardContainer>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {isFiltering && !publications?.length ? (
              <NoResults className="pt-5" />
            ) : (
              publications?.map((publication) => (
                <CardPublication
                  key={publication.id}
                  size="extended"
                  hideText
                  publication={{
                    slug: publication.slug,
                    title: publication.title,
                    description: publication.resume,
                    researchers: publication.researchers ?? [],
                    date: new Date(publication.date),
                    link: publication.link,
                  }}
                />
              ))
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 flex-col gap-6 hidden lg:flex">
            <CardContainer className="p-6">
              <FilterForm />
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
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("startDate");
  const researchAreas = searchParams.getAll("researchAreas[]");

  return {
    query: searchParams.get("q") ?? undefined,
    researchAreas: researchAreas.length ? researchAreas : undefined,
    researcher: researcher,
    startDate: startDate ? parseISO(startDate) : undefined,
    endDate: endDate ? parseISO(endDate) : undefined,
  };
}
