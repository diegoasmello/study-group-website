import { CardAction } from "~/components/CardAction";
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
                <CardAction
                  key={index}
                  size="extended"
                  action={{
                    title:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    image: cardImage,
                    date: new Date(),
                  }}
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
