import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  MetaFunction,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";
import { CardEvent } from "~/components/CardEvent";
import { Container } from "~/components/Container";
import { TextInput } from "~/components/form-fields/TextInput";
import { IconSearch } from "~/components/icons";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { NoResults } from "~/components/NoResults";
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

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || undefined;
  const events = await prisma.event.findMany({
    where: {
      published: true,
      title: {
        contains: q,
        mode: "insensitive",
      },
    },
  });
  return json({ events, q });
}

export default function Events() {
  const { events, q } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  const isFiltering = !!q?.length;

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
          <Form
            role="search"
            className="col-span-12 flex gap-8"
            onChange={(event) => {
              const isFirstSearch = q === null;
              submit(event.currentTarget, {
                replace: !isFirstSearch,
              });
            }}
          >
            <TextInput
              name="q"
              id="q"
              type="search"
              defaultValue={q || ""}
              placeholder="Pesquise por título, data ou palavras-chave"
              className="w-full lg:w-[34vw]"
              Icon={IconSearch}
            />
          </Form>

          {isFiltering && !events.length ? (
            <div className="col-span-12 mb-10">
              <NoResults />
            </div>
          ) : (
            events.map((event) => (
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
            ))
          )}

          {!!events.length && (
            <div className="col-span-12 flex justify-center mt-8 mb-10">
              <Paginator />
            </div>
          )}

          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
