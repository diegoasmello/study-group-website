import { Button } from "~/components/Button";
import { Card, CardContainer } from "~/components/Card";
import { Container } from "~/components/Container";
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
                <Card
                  key={index}
                  size="extended"
                  title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                  titleMaxLines={3}
                  actions={
                    <nav className="flex gap-2">
                      <Button size="md">Saiba mais</Button>
                      <Button skin="ghost" size="md">
                        Ler
                      </Button>
                    </nav>
                  }
                />
              ))}
          </div>
          <div className="col-span-4 flex flex-col gap-6">
            <CardContainer>teste</CardContainer>
            <CardContainer>teste</CardContainer>
          </div>
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
