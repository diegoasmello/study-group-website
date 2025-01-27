import { CardTeamMember } from "~/components/CardTeamMember";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import cardImage from "~/images/card-image.png";

export default function Team() {
  return (
    <main className="pb-20">
      <PageBanner
        title="Nossa equipe"
        text="Conheça nossa equipe e as mentes apaixonadas por trás do nosso trabalho!"
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          {Array(9)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="col-span-4">
                <CardTeamMember
                  teamMember={{
                    name: "Harry Potter",
                    label: "Auror",
                    image: cardImage,
                    link: "/",
                  }}
                />
              </div>
            ))}
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
