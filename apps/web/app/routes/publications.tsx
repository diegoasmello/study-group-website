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
import data from "~/data";
import { prisma } from "~/lib/prisma.server";
import { Prisma } from "@prisma/client";

const PAGE_SIZE = 5;

export const meta: MetaFunction = () => {
  return [
    { title: data.publications.title + " | " + data.site.title },
    { name: "description", content: data.publications.description },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const searchParams = clearSearchParams(url.searchParams);

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

  const query: Prisma.PublicationFindManyArgs = {
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
  };

  const publicationsCount = await prisma.publication.count({
    where: query.where,
  });
  const publications = await prisma.publication.findMany({
    include: {
      researchers: true,
      researchArea: true,
    },
    where: query.where,
    take: 5,
    skip: 0,
  });

  return json({
    researchAreas,
    researchers,
    publications,
    searchParams,
    publicationsCount,
  });
}

export default function Publications() {
  const { researchAreas, researchers, publications } =
    useLoaderData<typeof loader>();

  const [searchParams] = useSearchParams();
  const clearedSearchParams = clearSearchParams(searchParams);

  const researchersInputItems = [
    { label: "Todos", value: "" },
    ...researchers.map((researcher) => ({
      label: researcher.name,
      value: researcher.id.toString(),
    })),
  ];

  const dateRangeDefaultValue: DateRange = {
    endDate: clearedSearchParams.endDate,
    startDate: clearedSearchParams.startDate,
  };

  const hasFilterApplied = !!Object.values(clearedSearchParams).filter((i) => i)
    .length;

  // const resetFilters = () => {
  //   // setSearchParams("", { flushSync: true });
  //   navigate(".");
  // };

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={data.publications.title}
        text={data.publications.description}
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
            {publications.map((publication) => (
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
            ))}
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
                  defaultValue={clearedSearchParams.query}
                />
                <FormControl label="Áreas de pesquisa">
                  <div className="flex flex-col gap-2">
                    {researchAreas.map((researchArea) => (
                      <CheckboxInput
                        name="researchAreas[]"
                        key={researchArea.id}
                        label={researchArea.title}
                        value={researchArea.id}
                        defaultChecked={clearedSearchParams.researchAreas?.includes(
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
                    clearedSearchParams.researcher ?? researchersInputItems[0]
                  }
                />
                <DateRangeInput
                  label="Período da publicação"
                  defaultValue={dateRangeDefaultValue}
                />
                <nav className="flex gap-2">
                  <Button size="md">Buscar</Button>
                  {/* {hasFilterApplied && (
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
          <div className="col-span-12 flex justify-center mt-8 mb-10">
            <Paginator />
          </div>
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}

function clearSearchParams(searchParams: URLSearchParams) {
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
