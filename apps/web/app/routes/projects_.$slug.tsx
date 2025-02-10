import { json, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/Button";
import { ButtonShare } from "~/components/ButtonShare";
import { CardContainer } from "~/components/Card";
import { CardProject } from "~/components/CardProject";
import { CardResearch } from "~/components/CardResearch";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { IconArrowForward } from "~/components/icons";
import { Link } from "~/components/Link";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { prisma } from "~/lib/prisma.server";
import { listFormat, getRelatedTerms } from "~/util";

export async function loader({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      researchers: true,
    },
  });

  const { terms } = getRelatedTerms(project?.title, project?.keywords);

  const related = await prisma.project.findMany({
    where: {
      published: true,
      id: {
        not: project?.id,
      },
      OR: terms.map((term) => ({
        OR: [
          {
            title: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            keywords: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      })),
    },
  });

  return json({ project, related });
}

export default function ViewProject() {
  const { project, related } = useLoaderData<typeof loader>();

  if (!project) return null;

  return (
    <main className="pt-12 pb-20 bg-page">
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <img
              src={project.image}
              alt=""
              className="size-[11.25rem] rounded-3xl object-cover mb-6"
            />
            <h1 className="text-h1 text-gray-950 mb-6">{project.title}</h1>
            <div
              className="mb-6 text-gray-950 grid gap-2"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
            <nav className="flex gap-4 lg:mb-6">
              <Button>Visitar projeto</Button>
              <ButtonShare skin="ghost">Compartilhar</ButtonShare>
            </nav>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <CardContainer className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Pesquisador(es)
                  </span>
                  <span className="text-gray-950">
                    {project.researchers.length
                      ? listFormat(
                          project.researchers.map(
                            (researcher) => researcher.name
                          )
                        )
                      : "-"}
                  </span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Período
                  </span>
                  <span className="text-gray-950">
                    De {new Date(project.startDate).toLocaleDateString()} até{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <Link to="/">
                  <IconArrowForward className="size-5" /> Visitar projeto
                </Link>
              </div>
            </CardContainer>
            <CardResearch />
          </div>
          {!!related.length && (
            <div className="col-span-12 flex flex-col gap-6 ">
              <h2 className="text-h3 text-gray-950">Outros projetos</h2>
              <div className="w-full">
                <Carousel>
                  {(isSlideInView) =>
                    related.map((relatedProject, index) => (
                      <div
                        key={relatedProject.id}
                        className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                      >
                        <CardProject
                          project={{
                            slug: relatedProject.slug,
                            title: relatedProject.title,
                            image: relatedProject.image,
                            link: relatedProject.link,
                          }}
                          hideShadow={!isSlideInView(index)}
                        />
                      </div>
                    ))
                  }
                </Carousel>
              </div>
            </div>
          )}
          <div className="col-span-12 mt-8">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
