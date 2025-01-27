import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import searchIllustration from "~/images/illustrations/search.svg";

export default function Search() {
  return (
    <main className="pb-20">
      <PageBanner
        title="Busca"
        text="Exibindo 3 resultados para “aprendizado”:"
        illustration={
          <img
            src={searchIllustration}
            alt=""
            className="h-[445px] max-w-max absolute top-[-56px] right-[-78px]"
          />
        }
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
