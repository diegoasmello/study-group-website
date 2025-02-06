import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, MetaFunction, useLoaderData } from "@remix-run/react";
import { parseISO } from "date-fns";
import { Button } from "~/components/Button";
import { CardContainer } from "~/components/Card";
import { CardPublication } from "~/components/CardPublication";
import { CardResearch } from "~/components/CardResearch";
import { Container } from "~/components/Container";
import { CheckboxInput } from "~/components/form-fields/CheckboxInput";
import { ComboboxInput } from "~/components/form-fields/ComboboxInput";
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

export const meta: MetaFunction = () => {
  return [
    { title: data.publications.title + " | " + data.site.title },
    { name: "description", content: data.publications.description },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const searchParams = {
    query: url.searchParams.get("q"),
    researchAreas: url.searchParams.get("researchAreas"),
    researcher: decodeURI(url.searchParams.get("researcher") ?? ""),
    startDate: url.searchParams.get("startDate"),
    endDate: url.searchParams.get("endDate"),
  };

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
  const publications = await prisma.publication.findMany({
    include: {
      researchers: true,
      researchArea: true,
    },
    where: {
      published: true,
      researchers: {
        some: {
          id: searchParams.researcher
            ? Number(searchParams.researcher)
            : undefined,
        },
      },
      title: {
        contains: searchParams.query ?? undefined,
        mode: "insensitive",
      },
      researchAreaId: {
        equals: searchParams.researchAreas
          ? Number(searchParams.researchAreas)
          : undefined,
      },
      date: {
        gte: searchParams.startDate
          ? parseISO(searchParams.startDate)
          : undefined,
        lte: searchParams.endDate ? parseISO(searchParams.endDate) : undefined,
      },
    },
  });

  return json({ researchAreas, researchers, publications, searchParams });
}

export default function Publications() {
  const { researchAreas, researchers, publications, searchParams } =
    useLoaderData<typeof loader>();

  const researchersInputItems = [
    { label: "Todos", value: "" },
    ...researchers.map((researcher) => ({
      label: researcher.name,
      value: researcher.id.toString(),
    })),
  ];

  const dateRangeDefaultValue: DateRange = {
    endDate: searchParams?.endDate ?? undefined,
    startDate: searchParams?.startDate ?? undefined,
  };

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
              <Form className="flex flex-col items-start gap-6">
                <TextInput
                  name="q"
                  placeholder="Pesquisa por título ou autor"
                  Icon={IconSearch}
                  className="w-full"
                  defaultValue={searchParams.query ?? undefined}
                />
                <FormControl label="Áreas de pesquisa">
                  <div className="flex flex-col gap-2">
                    {researchAreas.map((researchArea) => (
                      <CheckboxInput
                        name="researchAreas"
                        key={researchArea.id}
                        label={researchArea.title}
                        value={researchArea.id}
                      />
                    ))}
                  </div>
                </FormControl>
                <ComboboxInput
                  name="researcher"
                  label="Autor(a)"
                  immediate
                  items={researchersInputItems}
                  defaultValue={searchParams.researcher}
                />
                <DateRangeInput
                  label="Período da publicação"
                  defaultValue={dateRangeDefaultValue}
                />
                <Button size="md">Buscar</Button>
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
