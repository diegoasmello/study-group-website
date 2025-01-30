import { MetaFunction } from "@remix-run/react";
import { CardAction } from "~/components/CardAction";
import { Container } from "~/components/Container";
import { TextInput } from "~/components/form-fields/TextInput";
import { IconSearch } from "~/components/icons";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import data from "~/data";
import cardImage from "~/images/card-image.png";
import actionsIllustration from "~/images/illustrations/actions.svg";

export const meta: MetaFunction = () => {
  return [
    { title: data.actions.title + " | " + data.site.title },
    { name: "description", content: data.actions.description },
  ];
};

export default function Actions() {
  return (
    <main className="pb-20 bg-page">
      <PageBanner
        title={data.actions.title}
        text={data.actions.description}
        illustration={
          <img
            src={actionsIllustration}
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
              className="w-[34vw]"
              Icon={IconSearch}
            />
          </div>

          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="col-span-6">
                <CardAction
                  key={index}
                  size="extended"
                  action={{
                    title:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    image: cardImage,
                    date: new Date(),
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
