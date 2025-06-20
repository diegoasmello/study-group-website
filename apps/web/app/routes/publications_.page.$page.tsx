import { LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  MetaFunction,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { parseISO } from "date-fns";
import { CardContainer } from "~/components/Card";
import { CardPublication } from "~/components/CardPublication";
import { CardResearch } from "~/components/CardResearch";
import { Container } from "~/components/Container";
import { ComboboxItem } from "~/components/ComboboxInput";
import { IconChevronDown } from "~/components/icons";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import { NoResults } from "~/components/NoResults";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import clsx from "clsx";
import { checkPageNotFound, getRootMatch, metaTags } from "~/utils";
import { FilterForm } from "~/components/FilterForm";
import { useTranslation } from "react-i18next";
import {
  getPublicationPage,
  getPublicationPaginated,
} from "~/api/publications";

export type PublicationParams = {
  query: string | undefined;
  researchAreas: string[] | undefined;
  researcher: ComboboxItem;
  startDate: string | undefined;
  endDate: string | undefined;
};

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

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams);
  const page = params.page ? Number(params.page) : 1;

  const paginatedPublications = await getPublicationPaginated(
    page,
    searchParams,
  );

  const { publicationsSection, researchAreas, researchers } =
    await getPublicationPage();

  checkPageNotFound({ page, lastPage: paginatedPublications.meta.lastPage });

  return json({
    heroSection: publicationsSection,
    researchAreas: researchAreas,
    researchers: researchers,
    paginatedPublications: paginatedPublications,
    url: request.url,
  });
}

export default function PublicationsPage() {
  const {
    heroSection,
    researchAreas,
    researchers,
    paginatedPublications: { data: publications, meta: paginatedMeta },
  } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const parsedSearchParams = parseSearchParams(searchParams);

  const isFiltering = !!Object.values(parsedSearchParams).filter((i) => i)
    .length;

  if (!heroSection)
    return (
      <div className="py-20">
        <NoResults text={t("PublicationList.empty")} />
      </div>
    );

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={heroSection.title}
        text={heroSection.content}
        illustration={
          <img
            src="/assets/illustrations/publications.svg"
            alt=""
            className="h-[605px] max-w-max absolute top-[-160px] right-[-120px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 grid lg:hidden">
            <CardContainer className="p-6">
              <Disclosure defaultOpen={isFiltering}>
                {({ open }) => (
                  <Fragment>
                    <DisclosureButton className="flex justify-between">
                      <span className="text-h5 text-primary uppercase font-medium">
                        {t("PublicationList.filterTitle")}
                      </span>
                      <IconChevronDown
                        className={clsx(
                          "size-6 -mr-2 transition-all text-primary",
                          open && "rotate-180",
                        )}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-4">
                      <FilterForm
                        action="/publications"
                        className="flex flex-col items-start gap-6"
                        researchAreas={researchAreas ?? []}
                        researchers={researchers ?? []}
                        defaultValues={parsedSearchParams}
                      />
                    </DisclosurePanel>
                  </Fragment>
                )}
              </Disclosure>
            </CardContainer>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {!publications?.length ? (
              <NoResults
                className="pt-5"
                text={
                  isFiltering
                    ? t("PublicationList.emptySearch")
                    : t("PublicationList.empty")
                }
              />
            ) : (
              publications.map((publication) => (
                <CardPublication
                  key={publication.id}
                  size="extended"
                  hideText
                  publication={{
                    slug: publication.slug,
                    title: publication.title,
                    description: publication.resume,
                    researchers: publication.researchers ?? [],
                    date: parseISO(publication.date),
                    link: publication.link,
                  }}
                />
              ))
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 flex-col gap-6 hidden lg:flex">
            <CardContainer className="p-6">
              <FilterForm
                action="/publications"
                className="flex flex-col items-start gap-6"
                researchAreas={researchAreas ?? []}
                researchers={researchers ?? []}
                defaultValues={parsedSearchParams}
              />
            </CardContainer>
            <CardResearch />
          </div>
        </section>
        <section className="grid grid-cols-12 gap-6">
          {!!publications?.length && (
            <div className="col-span-12 flex justify-center mt-8">
              <Paginator {...paginatedMeta} />
            </div>
          )}
          <div className="col-span-12 mt-10">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}

function parseSearchParams(searchParams: URLSearchParams): PublicationParams {
  const researcher: ComboboxItem = JSON.parse(
    decodeURIComponent(searchParams.get("researcher")!),
  );
  const startDate = searchParams.get("startDate") ?? undefined;
  const endDate = searchParams.get("endDate") ?? undefined;
  const researchAreas = searchParams.getAll("researchAreas[]");

  return {
    query: searchParams.get("q") ?? undefined,
    researchAreas: researchAreas.length ? researchAreas : undefined,
    researcher: researcher,
    startDate: startDate,
    endDate: endDate,
  };
}
