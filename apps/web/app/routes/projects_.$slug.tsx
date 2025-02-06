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
import { customJoin } from "~/util";

export async function loader({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      researchers: true,
    },
  });
  return json({ project });
}

export default function ViewProject() {
  const { project } = useLoaderData<typeof loader>();

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
            <div className="mb-6">
              <p className="text-gray-950 mb-6">{project.content}</p>
            </div>
            <nav className="flex gap-4 lg:mb-6">
              <Button>Visitar projeto</Button>
              <ButtonShare urlToShare="rwada" skin="ghost">
                Compartilhar
              </ButtonShare>
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
                      ? customJoin(
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
                    De {new Date(project.startDate).toLocaleDateString("pt-BR")}{" "}
                    até {new Date(project.endDate).toLocaleDateString("pt-BR")}
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
          <div className="col-span-12 flex flex-col gap-6 mb-8">
            <h2 className="text-h3 text-gray-950">Outros projetos</h2>
            <div className="w-full">
              <Carousel>
                {(isSlideInView) =>
                  Array(9)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                      >
                        <CardProject
                          project={{
                            slug: "1",
                            title: "Lorem ipsum",
                            image: "/assets/card-image.png",
                            link: "/projects/1",
                          }}
                          hideShadow={!isSlideInView(index)}
                        />
                      </div>
                    ))
                }
              </Carousel>
            </div>
          </div>
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
