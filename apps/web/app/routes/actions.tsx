import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { CardAction } from "~/components/CardAction";
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
    { title: data.actions.title + " | " + data.site.title },
    { name: "description", content: data.actions.description },
  ];
};

export async function loader() {
  const actions = await prisma.action.findMany({
    where: {
      published: true,
    },
  });
  return json({ actions });
}

export default function Actions() {
  const { actions } = useLoaderData<typeof loader>();

  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={data.actions.title}
        text={data.actions.description}
        illustration={
          <img
            src="/assets/illustrations/actions.svg"
            alt=""
            className="h-[552px] max-w-max absolute top-[-74px] right-[-120px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <TextInput
              name="a"
              placeholder="Pesquise por título, data ou palavras-chave"
              className="w-full lg:w-[34vw]"
              Icon={IconSearch}
            />
          </div>

          {actions.map((action) => (
            <div key={action.id} className="col-span-12 lg:col-span-6">
              <CardAction
                size="extended"
                className="h-full"
                action={{
                  slug: action.slug,
                  title: action.title,
                  image: action.image,
                  date: new Date(action.date),
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
