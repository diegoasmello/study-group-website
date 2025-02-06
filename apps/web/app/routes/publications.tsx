import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/Button";
import { CardContainer } from "~/components/Card";
import { CardPublication } from "~/components/CardPublication";
import { CardResearch } from "~/components/CardResearch";
import { Container } from "~/components/Container";
import { CheckboxInput } from "~/components/form-fields/CheckboxInput";
import { ComboboxInput } from "~/components/form-fields/ComboboxInput";
import { DateRangeInput } from "~/components/form-fields/DateRangeInput";
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

export async function loader() {
  const publications = await prisma.publication.findMany({
    include: {
      researchers: true,
      researchArea: true,
    },
    where: {
      published: true,
    },
  });

  return json({ publications });
}

export default function Publications() {
  const { publications } = useLoaderData<typeof loader>();

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
            <CardContainer className="p-6 flex flex-col items-start gap-6">
              <TextInput
                name={"a"}
                placeholder="Pesquisa por título ou autor"
                Icon={IconSearch}
                className="w-full"
              />
              <FormControl label="Áreas de pesquisa">
                <div className="flex flex-col gap-2">
                  <CheckboxInput label="Leitura e Escrita" />
                  <CheckboxInput label="Multilinguismo" />
                  <CheckboxInput label="Transculturalidade" />
                </div>
              </FormControl>
              <ComboboxInput
                name="b"
                label="Autores"
                immediate
                items={[
                  { label: "Harry Potter", value: "hp" },
                  { label: "Hermione Granger", value: "hg" },
                  { label: "Rony Weasley", value: "rw" },
                ]}
              />
              <DateRangeInput label="Período da publicação" />
              <Button size="md">Buscar</Button>
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
