import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";

export default function Research() {
  return (
    <main className="pb-20">
      <PageBanner
        title="Nossa pesquisa"
        text="Saiba mais sobre a nossa pesquisa e aprofunde-se nesse mundo de conhecimento e descobertas!"
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
