import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { CardProject } from "~/components/CardProject";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import data from "~/data";

export const meta: MetaFunction = () => {
  return [
    { title: data.projects.title + " | " + data.site.title },
    { name: "description", content: data.projects.description },
  ];
};

export async function loader() {
  const projects = await prisma.project.findMany({
    include: {
      researchers: true,
    },
    where: {
      published: true,
    },
  });
  return json({ projects });
}

export default function Projects() {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={data.projects.title}
        text={data.projects.description}
        illustration={
          <img
            src="/assets/illustrations/projects.svg"
            alt=""
            className="h-[502px] max-w-max absolute top-[-120px] right-[-54px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          {projects.map((project) => (
            <div key={project.id} className="col-span-12 lg:col-span-4">
              <CardProject
                className="h-full"
                project={{
                  slug: project.slug,
                  title: project.title,
                  image: project.image,
                  link: project.link,
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
