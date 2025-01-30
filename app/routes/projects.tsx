import { MetaFunction } from "@remix-run/react";
import { CardProject } from "~/components/CardProject";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import data from "~/data";
import cardImage from "~/images/card-image.png";
import projectsIllustration from "~/images/illustrations/projects.svg";

export const meta: MetaFunction = () => {
  return [
    { title: data.projects.title + " | " + data.site.title },
    { name: "description", content: data.projects.description },
  ];
};

export default function Projects() {
  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={data.projects.title}
        text={data.projects.description}
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
                    link: "/projects/1",
                  }}
                />
              </div>
            ))}
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
