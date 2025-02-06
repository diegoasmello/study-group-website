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

export async function loader({ params }: { params: { slug: string } }) {
  const event = await prisma.event.findUnique({
    where: {
      slug: params.slug,
    },
  });
  return json({ event });
}

export default function ViewEvent() {
  const { event } = useLoaderData<typeof loader>();

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
            <div className="mb-6">
              <p className="text-gray-950">{event.content}</p>
            </div>
            <nav className="flex gap-4 mb-6">
              <Button>Inscrever-se</Button>
              <ButtonShare urlToShare="rwada" skin="ghost">
                Compartilhar
              </ButtonShare>
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
                    {new Date(event.date).toLocaleDateString("pt-BR")}
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
          <div className="col-span-12 flex flex-col gap-6 mb-8">
            <h2 className="text-h3 text-gray-950">Outros eventos</h2>
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
                        <CardEvent
                          size="default"
                          hideShadow={!isSlideInView(index)}
                          hideLocale
                          event={{
                            id: 1,
                            slug: "",
                            title:
                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            image: "/assets/card-image.png",
                            date: new Date(),
                            locale: "Online",
                          }}
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
