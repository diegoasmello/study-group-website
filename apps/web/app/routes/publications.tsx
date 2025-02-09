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
import { IconSearch } from "~/components/icons";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import { prisma } from "~/lib/prisma.server";
import { Prisma, Publication, Sections } from "@prisma/client";
import { NoResults } from "~/components/NoResults";
import { createPaginator } from "~/util/createPaginator";

const PAGE_SIZE = 5;

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  const rootMetaTitle = matches[0].meta[0].title;
  return [
    { title: data?.heroSection?.title + " | " + rootMetaTitle },
    { name: "description", content: data?.heroSection?.content },
  ];
};

const paginate = createPaginator({ perPage: PAGE_SIZE });

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams);
  const page = Number(url.searchParams.get("page") ?? "1");

  const heroSection = await prisma.sectionsContent.findFirst({
    where: {
      section: Sections.PUBLICATIONS_HERO,
    },
  });
  const researchAreas = await prisma.researchArea.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  const researchers = await prisma.researcher.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      publications: {
        every: {
          published: true,
        },
      },
    },
  });
  const paginatedPublications = await paginate<
    Publication,
    Prisma.PublicationFindManyArgs
  >(
    prisma.publication,
    {
      include: {
        researchers: true,
        researchArea: true,
      },
      where: {
        published: true,
        researchers: {
          some: {
            id: searchParams.researcher
              ? Number(searchParams.researcher.value)
              : undefined,
          },
        },
        title: {
          contains: searchParams.query,
          mode: "insensitive",
        },
        researchAreaId: {
          in: searchParams.researchAreas,
        },
        date: {
          gte: searchParams.startDate,
          lte: searchParams.endDate,
        },
      },
      orderBy: {
        date: "desc",
      },
    },
    {
      page: page,
    }
  );

  return json({
    heroSection,
    researchAreas,
    researchers,
    paginatedPublications,
    currentPage: page,
    searchParams,
  });
}

export default function Publications() {
  const {
    heroSection,
    researchAreas,
    researchers,
    paginatedPublications: { data: publications, meta: paginatedMeta },
    currentPage,
  } = useLoaderData<typeof loader>();

  const [searchParams] = useSearchParams();
  const parsedSearchParams = parseSearchParams(searchParams);

  const researchersInputItems = [
    { label: "Todos", value: "" },
    ...researchers.map((researcher) => ({
      label: researcher.name,
      value: researcher.id.toString(),
    })),
  ];

  const dateRangeDefaultValue: DateRange = {
    endDate: parsedSearchParams.endDate,
    startDate: parsedSearchParams.startDate,
  };

  const isFiltering = !!Object.values(parsedSearchParams).filter((i) => i)
    .length;

  // const clearFilters = () => {
  //   // setSearchParams("", { flushSync: true });
  //   // navigate(".");
  //   submit(null)
  // };

  if (!heroSection) return null;

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
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {isFiltering && !publications.length ? (
              <NoResults className="pt-5" />
            ) : (
              publications.map((publication) => (
                <CardPublication
                  key={publication.id}
                  size="extended"
                  hideText
                  publication={{
                    slug: publication.slug,
                    title: publication.title,
                    description: publication.content,
                    researchers: publication.researchers,
                    date: new Date(publication.date),
                  }}
                />
              ))
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <CardContainer className="p-6 ">
              <Form
                className="flex flex-col items-start gap-6"
                id="publication-filter"
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
                    {researchAreas.map((researchArea) => (
                      <CheckboxInput
                        name="researchAreas[]"
                        key={researchArea.id}
                        label={researchArea.title}
                        value={researchArea.id}
                        defaultChecked={parsedSearchParams.researchAreas?.includes(
                          researchArea.id
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
                  {/* {isFiltering && (
                    <Button
                      size="md"
                      skin="ghost"
                      type="button"
                      onClick={resetFilters}
                    >
                      Limpar filtros
                    </Button>
                  )} */}
                </nav>
              </Form>
            </CardContainer>
            <CardResearch />
          </div>
          {!!publications.length && (
            <div className="col-span-12 flex justify-center mt-8 mb-10">
              <Paginator {...paginatedMeta} />
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

function parseSearchParams(searchParams: URLSearchParams) {
  const researcher: ComboboxItem = JSON.parse(
    decodeURIComponent(searchParams.get("researcher")!)
  );
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("startDate");
  const researchAreas = searchParams
    .getAll("researchAreas[]")
    .map((i) => Number(i));

  return {
    query: searchParams.get("q") ?? undefined,
    researchAreas: researchAreas.length ? researchAreas : undefined,
    researcher: researcher,
    startDate: startDate ? parseISO(startDate) : undefined,
    endDate: endDate ? parseISO(endDate) : undefined,
  };
}
