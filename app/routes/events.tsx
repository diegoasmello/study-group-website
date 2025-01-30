import { MetaFunction } from "@remix-run/react";
import { CardEvent } from "~/components/CardEvent";
import { Container } from "~/components/Container";
import { TextInput } from "~/components/form-fields/TextInput";
import { IconSearch } from "~/components/icons";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import data from "~/data";
import cardImage from "~/images/card-image.png";
import eventsIllustration from "~/images/illustrations/events.svg";

export const meta: MetaFunction = () => {
  return [
    { title: data.events.title + " | " + data.site.title },
    { name: "description", content: data.events.description },
  ];
};

export default function Events() {
  return (
    <main className="pb-20">
      <PageBanner
        title={data.events.title}
        text={data.events.description}
        illustration={
          <img
            src={eventsIllustration}
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
              className="w-[34vw]"
              // icon={<IconSearch width={24} height={24} />}
              Icon={IconSearch}
            />
          </div>

          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="col-span-6">
                <CardEvent
                  key={index}
                  size="extended"
                  event={{
                    title:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    image: cardImage,
                    date: new Date(),
                    locale: "Online",
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
