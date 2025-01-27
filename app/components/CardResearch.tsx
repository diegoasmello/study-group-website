import { Link } from "@remix-run/react";
import { Button } from "./Button";
import { CardContainer } from "./Card";
import researchCardIllustration from "~/images/illustrations/research-card.svg";

export function CardResearch() {
  return (
    <CardContainer className="p-6 relative">
      <img
        src={researchCardIllustration}
        alt=""
        className="h-[296px] max-w-max absolute bottom-[-120px] right-[-100px]"
      />
      <section className="grid grid-cols-12">
        <div className="col-span-8 flex flex-col items-start gap-4">
          <span className="text-h4 text-gray-950">Nossa pesquisa</span>
          <p className="mb-2">
            Saiba mais sobre a nossa pesquisa e aprofunde-se no mundo de
            descobertas e conhecimento!
          </p>
          <Link to="/research">
            <Button skin="ghost" size="md">
              Saiba mais
            </Button>
          </Link>
        </div>
      </section>
    </CardContainer>
  );
}
