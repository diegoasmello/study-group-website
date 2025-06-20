import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { getAction, getActionRelated } from "~/api/actions";
import { ButtonShare } from "~/components/ButtonShare";
import { CardAction } from "~/components/CardAction";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { DocumentRenderer } from "~/components/DocumentRenderer";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { ActionStatusType } from "~/graphql/generated";

import { getRelatedTerms, handleNotFound, metaTags } from "~/utils";

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  return metaTags({
    title: data?.action?.title,
    description: data?.action?.resume,
    url: data?.url,
    pathname: location.pathname,
  });
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const action = await getAction(params.slug!);

  handleNotFound(action, action?.status === ActionStatusType.Published);

  const related = await getActionRelated(
    action!.id,
    getRelatedTerms(action?.title, action?.keywords),
  );

  return json({ action, related, url: request.url });
}

export default function ViewAction() {
  const { action, related } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  if (!action) return null;

  return (
    <main className="pb-20  bg-page">
      <img
        src={action.image.url}
        alt=""
        className="h-[340px] lg:h-[600px] w-full object-cover mb-12"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <h1 className="text-h1 text-gray-950 mb-6">{action.title}</h1>
            <div className="mb-6 text-gray-950">
              <DocumentRenderer document={action.content.document} />
            </div>
            <nav className="flex gap-4 mb-6">
              <ButtonShare>{t("Action.shareButtonLabel")}</ButtonShare>
            </nav>
          </div>
          {!!related?.length && (
            <div className="col-span-12 flex flex-col gap-6">
              <h2 className="text-h3 text-gray-950">
                {t("Action.relatedTitle")}
              </h2>
              <div className="w-full">
                <Carousel>
                  {(isSlideInView) =>
                    related.map((relatedAction, index) => (
                      <div
                        key={relatedAction.id}
                        className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                      >
                        <CardAction
                          size="default"
                          action={{
                            slug: relatedAction.slug,
                            title: relatedAction.title,
                            image: relatedAction.image.url,
                            date: parseISO(relatedAction.date),
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
