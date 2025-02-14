import { LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction, redirect, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/Button";
import { CardContainer } from "~/components/Card";
import { CardResearch } from "~/components/CardResearch";
import { Container } from "~/components/Container";
import { FormControl } from "~/components/form-fields/FormControl";
import { TextInput } from "~/components/form-fields/TextInput";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import data from "~/data";

export const meta: MetaFunction = () => {
  return [{ title: data.search.title + " | " + data.site.title }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  if (!q) return redirect("/");

  return json({ q });
}

export default function Search() {
  const { q } = useLoaderData<typeof loader>();

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={data.search.title}
        text={`Exibindo 3 resultados para “${q}”:`}
        illustration={
          <img
            src="/assets/illustrations/search.svg"
            alt=""
            className="h-[445px] max-w-max absolute top-[-56px] right-[-78px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-8 flex flex-col gap-6">
            {/* {Array(5)
              .fill(null)
              .map((_, index) => (
                <CardPublication
                  key={index}
                  size="extended"
                  publication={{
                    title:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    description:
                      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    author:
                      "Velit Esse, Cillum Dolore e Fugiat Nulla Pariatur.",
                    date: new Date(),
                  }}
                />
              ))} */}
          </div>
          <div className="col-span-4 flex flex-col gap-6">
            <CardContainer className="p-6 flex flex-col items-start gap-6">
              <TextInput
                name={"a"}
                placeholder="Pesquisa por título ou autor"
              />
              <FormControl label="Áreas de pesquisa">
                <div className="flex flex-col gap-2">
                  <input type="checkbox" />
                  <input type="checkbox" />
                  <input type="checkbox" />
                </div>
              </FormControl>
              <FormControl label="Autores">
                <div className="flex flex-col gap-2">
                  <select>
                    <option>Todos</option>
                  </select>
                </div>
              </FormControl>
              <TextInput
                label="Período de publicação"
                name={"a"}
                placeholder="Pesquisa por título ou autor"
              />
              <Button size="md">Buscar</Button>
            </CardContainer>
            <CardResearch />
          </div>
          <div className="col-span-12 flex justify-center mt-8 mb-10">
            {/* <Paginator /> */}
          </div>
        </section>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
