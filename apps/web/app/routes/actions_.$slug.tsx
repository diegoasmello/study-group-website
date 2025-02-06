import { json, useLoaderData } from "@remix-run/react";
import { ButtonShare } from "~/components/ButtonShare";
import { CardAction } from "~/components/CardAction";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { prisma } from "~/lib/prisma.server";

export async function loader({ params }: { params: { slug: string } }) {
  const action = await prisma.action.findUnique({
    where: {
      slug: params.slug,
    },
  });
  return json({ action });
}

export default function ViewAction() {
  const { action } = useLoaderData<typeof loader>();

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
            <div className="mb-6">
              <p className="text-gray-950">{action.content}</p>
            </div>
            <nav className="flex gap-4 mb-6">
              <ButtonShare urlToShare="rwada">Compartilhar</ButtonShare>
            </nav>
          </div>
          <div className="col-span-12 flex flex-col gap-6 mb-8">
            <h2 className="text-h3 text-gray-950">Outras ações</h2>
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
                        <CardAction
                          size="default"
                          action={{
                            slug: "",
                            title:
                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            image: "/assets/card-image.png",
                            date: new Date(),
                          }}
                          hideShadow={!isSlideInView(index)}
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
