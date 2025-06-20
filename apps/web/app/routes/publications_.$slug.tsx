import { DocumentRenderer } from "~/components/DocumentRenderer";
import { LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/Button";
import { ButtonLink } from "~/components/ButtonLink";
import { ButtonShare } from "~/components/ButtonShare";
import { CardContainer } from "~/components/Card";
import { CardPublication } from "~/components/CardPublication";
import { CardResearch } from "~/components/CardResearch";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { IconCalendar, IconContract, IconSignature } from "~/components/icons";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { Tooltip } from "~/components/Tooltip";
import { PublicationQuery, PublicationStatusType } from "~/graphql/generated";
import { listFormat, getRelatedTerms, handleNotFound, metaTags } from "~/utils";
import { parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { useLocale } from "~/hooks/use-locale";
import { getPublication, getPublicationRelated } from "~/api/publications";

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  return metaTags({
    title: data?.publication?.title,
    description: data?.publication?.resume,
    url: data?.url,
    pathname: location.pathname,
  });
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const publication = await getPublication(params.slug!);

  handleNotFound(
    publication,
    publication?.status === PublicationStatusType.Published,
  );

  const related = await getPublicationRelated(
    publication!.id,
    getRelatedTerms(publication?.title, publication?.keywords),
  );

  return json({ publication, related, url: request.url });
}

export default function ViewPublication() {
  const { publication, related } = useLoaderData<typeof loader>();

  const locale = useLocale();
  const { t } = useTranslation();

  if (!publication) return null;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(
      createCitation(publication as PublicationQuery["publication"]),
    );
  };

  return (
    <main className="pt-12 pb-20 bg-page">
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-h2 text-gray-950 mb-6">{publication.title}</h1>
            <ul className="flex flex-col gap-2 mb-8">
              <li className="flex items-center gap-4 text-gray-800 fill-gray-800">
                <IconCalendar className="size-4" />
                <span>
                  {parseISO(publication.date).toLocaleDateString(locale)}
                </span>
              </li>
              {publication.researchers?.length && (
                <li className="flex items-center gap-4 text-gray-800 fill-gray-800">
                  <IconSignature className="size-4" />
                  <span>
                    {listFormat(
                      publication?.researchers?.map(
                        (research) => research.name,
                      ) ?? [],
                    )}
                  </span>
                </li>
              )}
            </ul>
            <h2 className="text-h4 text-gray-950 mb-2">
              {t("Publication.resumeTitle")}
            </h2>
            <div className="mb-6 text-gray-950">
              <DocumentRenderer document={publication.content.document} />
            </div>
            <nav className="flex gap-4 lg:mb-6">
              <ButtonLink to={publication.link} external>
                {t("Publication.readButtonLabel")}
              </ButtonLink>
              <ButtonShare skin="ghost">
                {t("Publication.shareButtonLabel")}
              </ButtonShare>
            </nav>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <CardContainer className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    {t("Publication.magazineTitle")}
                  </span>
                  <span className="text-gray-950">{publication.magazine}.</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    {t("Publication.doiTitle")}
                  </span>
                  <span className="text-gray-950">{publication.doi}</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    {t("Publication.licenseTitle")}
                  </span>
                  <span className="text-gray-950">{publication.license}</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <Tooltip text={t("Publication.quoteTooltipText")}>
                  <Button
                    skin="ghost"
                    size="md"
                    hasIcon
                    onClick={handleCopyCitation}
                  >
                    <IconContract className="size-4" />
                    {t("Publication.quoteButtonLabel")}
                  </Button>
                </Tooltip>
              </div>
            </CardContainer>
            <CardResearch />
          </div>
          {!!related?.length && (
            <div className="col-span-12 flex flex-col gap-6">
              <h2 className="text-h3 text-gray-950">
                {t("Publication.relatedTitle")}
              </h2>
              <div className="w-full">
                <Carousel>
                  {(isSlideInView) =>
                    related.map((relatedPublication, index) => (
                      <div
                        key={relatedPublication.id}
                        className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                      >
                        <CardPublication
                          size="default"
                          hideShadow={!isSlideInView(index)}
                          publication={{
                            slug: relatedPublication.slug,
                            title: relatedPublication.title,
                            description: relatedPublication.resume,
                            researchers: relatedPublication.researchers ?? [],
                            date: parseISO(relatedPublication.date),
                            link: relatedPublication.link,
                          }}
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

function createCitation(publication: PublicationQuery["publication"]): string {
  if (!publication) return "";

  const { title, researchers, magazine, date } = publication;
  const authors = listFormat(
    researchers?.map((author) => formatAuthor(author.name)) ?? [],
  );

  return `${authors} ${title} ${magazine}. ${parseISO(date).getFullYear()}.`;
}

function formatAuthor(fullName: string) {
  const nameParts = fullName.split(" ");
  const lastName = nameParts.pop()?.toUpperCase();
  const initials =
    nameParts.map((part) => part[0].toUpperCase()).join(". ") + ".";
  return `${lastName} ${initials}`;
}
