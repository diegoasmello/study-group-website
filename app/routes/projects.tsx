import { CardProject } from "~/components/CardProject";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import cardImage from "~/images/card-image.png";
import projectsIllustration from "~/images/illustrations/projects.svg";

export default function Projects() {
  return (
    <main className="pb-20">
      <PageBanner
        title="Projetos"
        text="Confira as publicações do nosso grupo e mergulhe em um oceano de conhecimento."
        illustration={
          <img
            src={projectsIllustration}
            alt=""
            className="h-[502px] max-w-max absolute top-[-120px] right-[-54px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          {Array(9)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="col-span-4">
                <CardProject
                  project={{
                    title: "Lorem ipsum",
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
