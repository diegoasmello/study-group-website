import { LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { getProjectPaginated, getProjectSection } from "~/api/projects";
import { CardProject } from "~/components/CardProject";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { NoResults } from "~/components/NoResults";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import { checkPageNotFound, getRootMatch, metaTags } from "~/utils";

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

export async function loader({ params, request }: LoaderFunctionArgs) {
  const page = params.page ? Number(params.page) : 1;
  const paginatedProjects = await getProjectPaginated(page);
  const heroSection = await getProjectSection();

  checkPageNotFound({ page, lastPage: paginatedProjects.meta.lastPage });

  return json({
    paginatedProjects: paginatedProjects,
    heroSection,
    url: request.url,
  });
}

export default function Projects() {
  const {
    paginatedProjects: { data: projects, meta: paginatedMeta },
    heroSection,
  } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  if (!heroSection)
    return (
      <div className="py-20">
        <NoResults text={t("ProjectList.empty")} />
      </div>
    );

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
          {!projects?.length ? (
            <div className="col-span-12">
              <NoResults text={t("ProjectList.empty")} />
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="col-span-12 lg:col-span-4">
                <CardProject
                  className="h-full"
                  project={{
                    slug: project.slug,
                    title: project.title,
                    image: project.image.url,
                  }}
                />
              </div>
            ))
          )}
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
