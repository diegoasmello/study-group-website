import { Button } from "~/components/Button";
import { CardContainer } from "~/components/Card";
import { CardPublication } from "~/components/CardPublication";
import { Container } from "~/components/Container";
import { FormControl } from "~/components/form-fields/FormControl";
import { TextInput } from "~/components/form-fields/TextInput";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";

export default function Publications() {
  return (
    <main className="pb-20">
      <PageBanner
        title="Publicações"
        text="Confira as publicações do nosso grupo e mergulhe em um oceano de conhecimento."
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-8 flex flex-col gap-6">
            {Array(5)
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
              ))}
          </div>
          <div className="col-span-4 flex flex-col gap-6">
            <CardContainer className="p-6 flex flex-col gap-6">
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
            <CardContainer className="p-6 flex flex-col items-start gap-4">
              <span className="text-h4 text-gray-950">Nossa pesquisa</span>
              <p className="mb-2">
                Saiba mais sobre a nossa pesquisa e aprofunde-se no mundo de
                descobertas e conhecimento!
              </p>
              <Button skin="ghost" size="md">
                Saiba mais
              </Button>
            </CardContainer>
          </div>
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
