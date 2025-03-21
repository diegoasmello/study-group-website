import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";

import { Carousel } from "~/components/Carousel";
import { CardProject } from "~/components/CardProject";
import clsx from "clsx";
import { twJoin } from "tailwind-merge";
import { getRootMatch, metaTags } from "~/utils";
import { LoaderFunctionArgs } from "@remix-run/node";
import { gql } from "graphql-request";
import { client } from "~/lib/graphql-client.server";
import { ResearchPageQuery } from "~/graphql/generated";
import { ArrayElement } from "~/types";
import { DocumentRenderer } from "~/components/DocumentRenderer";
import { NoResults } from "~/components/NoResults";

const RESEARCH_QUERY = gql`
  query ResearchPage {
    sectionContents(where: { section: { equals: RESEARCH_HERO } }) {
      id
      title
      content
    }
    researchAreas {
      title
      image {
        url
      }
      icon {
        url
      }
      content {
        document
      }
      projects {
        id
        slug
        title
        image {
          url
        }
      }
    }
  }
`;

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
  const { researchAreas, sectionContents } =
    await client.request<ResearchPageQuery>(RESEARCH_QUERY);

  return json({
    heroSection: sectionContents?.[0],
    researchAreas: researchAreas ?? [],
    url: request.url,
  });
}

export default function Research() {
  const { heroSection, researchAreas } = useLoaderData<typeof loader>();

  if (!heroSection || !researchAreas.length)
    return (
      <div className="py-20">
        <NoResults text="No data found" />;
      </div>
    );

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
          <ResearchItemSection
            key={index}
            index={index}
            item={
              researchArea as ArrayElement<ResearchPageQuery["researchAreas"]>
            }
          />
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

const ResearchItemSection = ({
  item,
  index,
}: {
  item: ArrayElement<ResearchPageQuery["researchAreas"]>;
  index: number;
}) => {
  const isOdd = index % 2 === 0;

  return (
    <div className="flex flex-col gap-6 lg:gap-14">
      <div className="relative">
        <img
          src={item.image.url}
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
                <div className="size-[4rem] bg-primary-lighter flex items-center justify-center rounded-2xl">
                  <img src={item.icon.url} alt="" className="size-[3rem]" />
                </div>
                <h2 className="text-h3 text-gray-950">{item.title}</h2>
                <div className="text-gray-800">
                  <DocumentRenderer document={item.content.document} />
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <h3 className="text-h4 mb-6">Related projects</h3>
            <div className="w-full">
              <Carousel>
                {() =>
                  item.projects?.map((project) => (
                    <div
                      key={project.id}
                      className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                    >
                      <CardProject
                        project={{
                          slug: project.slug,
                          title: project.title,
                          image: project.image.url,
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
