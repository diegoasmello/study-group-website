import { Prisma, Project, Sections } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { CardProject } from "~/components/CardProject";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import { createPaginator } from "~/util/createPaginator";

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  const rootMetaTitle = matches[0].meta[0].title;
  return [
    { title: data?.heroSection?.title + " | " + rootMetaTitle },
    { name: "description", content: data?.heroSection?.content },
  ];
};

const paginate = createPaginator({ perPage: 9 });

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1");

  const heroSection = await prisma.sectionsContent.findFirst({
    where: {
      section: Sections.PROJECTS_HERO,
    },
  });
  const paginatedProjects = await paginate<Project, Prisma.ProjectFindManyArgs>(
    prisma.project,
    {
      include: {
        researchers: true,
      },
      where: {
        published: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    },
    {
      page: page,
    },
  );
  return json({ paginatedProjects, heroSection });
}

export default function Projects() {
  const {
    paginatedProjects: { data: projects, meta: paginatedMeta },
    heroSection,
  } = useLoaderData<typeof loader>();

  if (!heroSection) return null;

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={heroSection.title}
        text={heroSection.content}
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
            <Paginator {...paginatedMeta} />
          </div>
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
