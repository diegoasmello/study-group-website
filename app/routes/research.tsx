import { MetaFunction } from "@remix-run/react";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import data from "~/data";
import researchIllustration from "~/images/illustrations/research.svg";

export const meta: MetaFunction = () => {
  return [
    { title: data.research.title + " | " + data.site.title },
    { name: "description", content: data.research.description },
  ];
};

export default function Research() {
  return (
    <main className="pb-20">
      <PageBanner
        title={data.research.title}
        text={data.research.description}
        illustration={
          <img
            src={researchIllustration}
            alt=""
            className="h-[515px] max-w-max absolute top-[-65px] right-[-78px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
