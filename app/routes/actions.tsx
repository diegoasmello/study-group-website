import { CardAction } from "~/components/CardAction";
import { Container } from "~/components/Container";
import { TextInput } from "~/components/form-fields/TextInput";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import cardImage from "~/images/card-image.png";
import actionsIllustration from "~/images/illustrations/actions.svg";

export default function Actions() {
  return (
    <main className="pb-20">
      <PageBanner
        title="Ações"
        text="Confira as publicações do nosso grupo e mergulhe em um oceano de conhecimento."
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
