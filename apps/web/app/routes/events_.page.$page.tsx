import { Event, Prisma, Sections } from "@prisma/client";
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
import {
  createPaginator,
  getRootMatch,
  handleNotFound,
  metaTags,
} from "~/utils";

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

const paginate = createPaginator({ perPage: 6 });

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || undefined;
  const page = params.page ? Number(params.page) : 1;

  /* const heroSection = await prisma.sectionsContent.findFirst({
    where: {
      section: Sections.EVENTS_HERO,
    },
  });
  const paginatedEvents = await paginate<Event, Prisma.EventFindManyArgs>(
    prisma.event,
    {
      where: {
        published: true,
        title: {
          contains: q,
          mode: "insensitive",
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    },
    {
      page: page,
    },
  );

  handleNotFound(paginatedEvents.data.length, q); */

  return json({ heroSection: {}, paginatedEvents: {}, q, url: request.url });
}

export default function EventsPage() {
  const {
    heroSection,
    paginatedEvents: { data: events, meta: metaPaginated },
    q,
  } = useLoaderData<typeof loader>();

  const submit = useSubmit();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  if (!heroSection) return null;
  const isFiltering = !!q?.length;

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={heroSection.title}
        text={heroSection.content}
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
            action="/events"
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
                    link: event.link,
                  }}
                />
              </div>
            ))
          )}

          {!!events.length && (
            <div className="col-span-12 flex justify-center mt-8 mb-10">
              <Paginator {...metaPaginated} />
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
