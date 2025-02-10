import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/Button";
import { ButtonShare } from "~/components/ButtonShare";
import { CardContainer } from "~/components/Card";
import { CardEvent } from "~/components/CardEvent";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { IconArrowForward } from "~/components/icons";
import { Link } from "~/components/Link";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { prisma } from "~/lib/prisma.server";
import { getRelatedTerms, handleNotFound } from "~/util";

export async function loader({ params }: LoaderFunctionArgs) {
  const event = await prisma.event.findUnique({
    where: {
      slug: params.slug,
    },
  });

  handleNotFound(event);

  const { terms } = getRelatedTerms(event?.title, event?.keywords);

  const related = await prisma.event.findMany({
    where: {
      published: true,
      id: {
        not: event?.id,
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

  return json({ event, related });
}

export default function ViewEvent() {
  const { event, related } = useLoaderData<typeof loader>();

  if (!event) return null;

  return (
    <main className="pb-20  bg-page">
      <img
        src={event.image}
        alt=""
        className="h-[340px] lg:h-[600px] w-full object-cover mb-12"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-h1 text-gray-950 mb-6">{event.title}</h1>
            <div
              className="mb-6 text-gray-950 grid gap-2"
              dangerouslySetInnerHTML={{ __html: event.content }}
            />
            <nav className="flex gap-4 mb-6">
              <Button>Inscrever-se</Button>
              <ButtonShare skin="ghost">Compartilhar</ButtonShare>
            </nav>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <CardContainer className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Carga horária
                  </span>
                  <span className="text-gray-950">{event.workload} horas</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Data e hora
                  </span>
                  <p className="text-gray-950">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Local
                  </span>
                  <span className="text-gray-950">{event.locale}</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <Link to="/">
                  <IconArrowForward className="size-5" /> Clique aqui para se
                  inscrever
                </Link>
              </div>
            </CardContainer>
          </div>
          {!!related.length && (
            <div className="col-span-12 flex flex-col gap-6">
              <h2 className="text-h3 text-gray-950">Outros eventos</h2>
              <div className="w-full">
                <Carousel>
                  {(isSlideInView) =>
                    related.map((relatedEvent, index) => (
                      <div
                        key={index}
                        className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                      >
                        <CardEvent
                          size="default"
                          hideShadow={!isSlideInView(index)}
                          hideLocale
                          event={{
                            slug: relatedEvent.slug,
                            title: relatedEvent.title,
                            image: relatedEvent.image,
                            date: new Date(relatedEvent.date),
                            locale: relatedEvent.locale,
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
