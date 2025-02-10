import { json, useLoaderData } from "@remix-run/react";
import { ButtonShare } from "~/components/ButtonShare";
import { CardAction } from "~/components/CardAction";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { prisma } from "~/lib/prisma.server";
import { getRelatedTerms } from "~/util";

export async function loader({ params }: { params: { slug: string } }) {
  const action = await prisma.action.findUnique({
    where: {
      slug: params.slug,
    },
  });

  const { terms } = getRelatedTerms(action?.title, action?.keywords);

  const related = await prisma.action.findMany({
    where: {
      published: true,
      id: {
        not: action?.id,
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

  return json({ action, related });
}

export default function ViewAction() {
  const { action, related } = useLoaderData<typeof loader>();

  if (!action) return null;

  return (
    <main className="pb-20  bg-page">
      <img
        src={action.image}
        alt=""
        className="h-[340px] lg:h-[600px] w-full object-cover mb-12"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <h1 className="text-h1 text-gray-950 mb-6">{action.title}</h1>
            <div
              className="mb-6 text-gray-950 grid gap-2"
              dangerouslySetInnerHTML={{ __html: action.content }}
            />
            <nav className="flex gap-4 mb-6">
              <ButtonShare>Compartilhar</ButtonShare>
            </nav>
          </div>
          {!!related.length && (
            <div className="col-span-12 flex flex-col gap-6">
              <h2 className="text-h3 text-gray-950">Outras ações</h2>
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
                            image: relatedAction.image,
                            date: new Date(relatedAction.date),
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
