import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { CardEvent } from "~/components/CardEvent";
import { Container } from "~/components/Container";
import { TextInput } from "~/components/form-fields/TextInput";
import { IconSearch } from "~/components/icons";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import data from "~/data";
import { prisma } from "~/lib/prisma.server";

export const meta: MetaFunction = () => {
  return [
    { title: data.events.title + " | " + data.site.title },
    { name: "description", content: data.events.description },
  ];
};

export async function loader() {
  const events = await prisma.event.findMany({
    where: {
      published: true,
    },
  });
  return json({ events });
}

export default function Events() {
  const { events } = useLoaderData<typeof loader>();

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={data.events.title}
        text={data.events.description}
        illustration={
          <img
            src="/assets/illustrations/events.svg"
            alt=""
            className="h-[472px] max-w-max absolute top-[-58px] right-[-100px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12 flex gap-8">
            <TextInput
              name="a"
              placeholder="Pesquise por título, data ou palavras-chave"
              className="w-full lg:w-[34vw]"
              Icon={IconSearch}
            />
          </div>

          {events.map((event) => (
            <div key={event.id} className="col-span-12 lg:col-span-6">
              <CardEvent
                size="extended"
                className="h-full"
                event={{
                  slug: event.slug,
                  title: event.title,
                  image: event.image,
                  date: new Date(event.date),
                  locale: event.locale,
                }}
              />
            </div>
          ))}

          <div className="col-span-12 flex justify-center mt-8 mb-10">
            <Paginator />
          </div>

          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
