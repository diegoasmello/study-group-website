import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { ButtonLink } from "~/components/ButtonLink";
import { ButtonShare } from "~/components/ButtonShare";
import { CardContainer } from "~/components/Card";
import { CardProject } from "~/components/CardProject";
import { CardResearch } from "~/components/CardResearch";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { IconArrowForward } from "~/components/icons";
import { ExternalLink } from "~/components/Link";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { DocumentRenderer } from "~/components/DocumentRenderer";
import { ProjectStatusType } from "~/graphql/generated";
import { listFormat, getRelatedTerms, handleNotFound, metaTags } from "~/utils";
import { parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { useLocale } from "~/hooks/useLocale";
import { getProject, getProjectRelated } from "~/api/projects";

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  return metaTags({
    title: data?.project?.title,
    description: undefined,
    url: data?.url,
    pathname: location.pathname,
  });
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const project = await getProject(params.slug!);

  handleNotFound(project, project?.status === ProjectStatusType.Published);

  const related = await getProjectRelated(
    project!.id,
    getRelatedTerms(project?.title, project?.keywords),
  );

  return json({ project, related, url: request.url });
}

export default function ViewProject() {
  const { project, related } = useLoaderData<typeof loader>();

  const locale = useLocale();
  const { t } = useTranslation();

  if (!project) return null;

  return (
    <main className="pt-12 pb-20 bg-page">
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <img
              src={project.image.url}
              alt={project.title}
              className="size-[11.25rem] rounded-3xl object-cover mb-6"
            />
            <h1 className="text-h1 text-gray-950 mb-6">{project.title}</h1>
            <div className="mb-6 text-gray-950">
              <DocumentRenderer document={project.content.document} />
            </div>
            <nav className="flex gap-4 lg:mb-6">
              <ButtonLink to={project.link} external>
                {t("Project.viewButtonLabel")}
              </ButtonLink>
              <ButtonShare skin="ghost">
                {t("Project.shareButtonLabel")}
              </ButtonShare>
            </nav>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <CardContainer className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    {t("Project.researchersTitle")}
                  </span>
                  <span className="text-gray-950">
                    {project.researchers?.length
                      ? listFormat(
                          project.researchers.map(
                            (researcher) => researcher.name,
                          ),
                        )
                      : "-"}
                  </span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    {t("Project.periodTitle")}
                  </span>
                  <span className="text-gray-950">
                    <span className="capitalize">
                      {t("Project.periodFromLabel")}{" "}
                    </span>
                    <span className="lowercase">
                      {parseISO(project.startDate).toLocaleDateString(locale)}{" "}
                      {t("Project.periodToLabel")}{" "}
                      {parseISO(project.endDate).toLocaleDateString(locale)}
                    </span>
                  </span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <ExternalLink to={project.link}>
                  <IconArrowForward className="size-5" />{" "}
                  {t("Project.viewButtonLabel")}
                </ExternalLink>
              </div>
            </CardContainer>
            <CardResearch />
          </div>
          {!!related?.length && (
            <div className="col-span-12 flex flex-col gap-6 ">
              <h2 className="text-h3 text-gray-950">
                {t("Project.relatedTitle")}
              </h2>
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
                            image: relatedProject.image.url,
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
