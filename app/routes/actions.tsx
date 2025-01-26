import { Button } from "~/components/Button";
import { Card } from "~/components/Card";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import cardImage from "~/images/card-image.png";

export default function Actions() {
  return (
    <main className="pb-20">
      <PageBanner
        title="Ações"
        text="Confira as publicações do nosso grupo e mergulhe em um oceano de conhecimento."
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">{/* filters */}</div>

          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="col-span-6">
                <Card
                  size="extended"
                  image={cardImage}
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
              </div>
            ))}

          <div className="col-span-12">{/* pagination */}</div>

          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
