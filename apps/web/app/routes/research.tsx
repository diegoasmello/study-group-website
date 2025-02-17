import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { prisma } from "~/lib/prisma.server";

import { Carousel } from "~/components/Carousel";
import { CardProject } from "~/components/CardProject";
import clsx from "clsx";
import { twJoin } from "tailwind-merge";
import { Prisma, Sections } from "@prisma/client";
import { getRootMatch, metaTags } from "~/utils";
import { LoaderFunctionArgs } from "@remix-run/node";

export const meta: MetaFunction<typeof loader> = ({
  data,
  matches,
  location,
}) => {
  const {
    data: { company },
  } = getRootMatch(matches);

  return metaTags({
    title: data?.heroSection?.title + " | " + company?.title,
    description: data?.heroSection?.content,
    pathname: location.pathname,
    url: data?.url,
  });
};

export async function loader({ request }: LoaderFunctionArgs) {
  const heroSection = await prisma.sectionsContent.findFirst({
    where: {
      section: Sections.RESEARCH_HERO,
    },
  });
  const researchAreas = await prisma.researchArea.findMany({
    omit: {
      updatedAt: true,
      createdAt: true,
    },
    include: {
      projects: {
        select: {
          id: true,
          slug: true,
          title: true,
          image: true,
        },
      },
    },
  });

  return json({ heroSection, researchAreas, url: request.url });
}

export default function Research() {
  const { heroSection, researchAreas } = useLoaderData<typeof loader>();

  if (!heroSection) return null;

  return (
    <main className="pb-20">
      <PageBanner
        title={heroSection.title}
        text={heroSection.content}
        illustration={
          <img
            src="/assets/illustrations/research.svg"
            alt=""
            className="h-[515px] max-w-max absolute top-[-65px] right-[-78px]"
          />
        }
        className="mb-12"
      />

      <div className="flex flex-col gap-16 mb-20">
        {researchAreas.map((researchArea, index) => (
          <ResearchItemSection key={index} item={researchArea} index={index} />
        ))}
      </div>

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

const IconWrapper = ({ children }: { children: JSX.Element }) => (
  <div className="size-[4rem] bg-primary-lighter flex items-center justify-center rounded-2xl">
    {children}
  </div>
);

const ResearchItemSection = ({
  item,
  index,
}: {
  item: Prisma.ResearchAreaGetPayload<{
    omit: {
      updatedAt: true;
      createdAt: true;
    };
    include: {
      projects: {
        select: {
          id: true;
          slug: true;
          title: true;
          image: true;
        };
      };
    };
  }>;
  index: number;
}) => {
  const isOdd = index % 2 === 0;

  return (
    <div className="flex flex-col gap-6 lg:gap-14">
      <div className="relative">
        <img
          src={item.image}
          alt=""
          className={twJoin(
            "hidden lg:block h-full w-[calc(50vw-4rem)] object-cover absolute",
            isOdd ? "rounded-r-[2rem] left-0" : "rounded-l-[2rem] right-0",
          )}
        />
        <Container>
          <section className="grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 grid grid-cols-12">
              <div
                className={clsx(
                  "col-span-12 lg:col-span-6 flex flex-col gap-y-4 lg:py-10",
                  isOdd && "lg:col-start-7",
                )}
              >
                <IconWrapper>
                  <img src={item.icon} alt="" />
                </IconWrapper>
                <h2 className="text-h3 text-gray-950">{item.title}</h2>
                <div
                  className="text-gray-800 grid gap-2"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          </section>
        </Container>
      </div>
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <h3 className="text-h4 mb-6">Projetos relacionados</h3>
            <div className="w-full">
              <Carousel>
                {() =>
                  item.projects.map((project) => (
                    <div
                      key={project.id}
                      className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                    >
                      <CardProject
                        project={{
                          slug: project.slug,
                          title: project.title,
                          image: project.image,
                        }}
                        type="flat"
                      />
                    </div>
                  ))
                }
              </Carousel>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};
