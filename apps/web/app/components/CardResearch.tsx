import { CardContainer, CardProps } from "./Card";
import { ButtonLink } from "./ButtonLink";
import { twMerge } from "tailwind-merge";

interface CardResearchProps extends Pick<CardProps, "className"> {}

export function CardResearch({ className }: CardResearchProps) {
  return (
    <CardContainer className={twMerge("p-6 relative", className)}>
      <img
        src="/assets/illustrations/research-card.svg"
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
          <ButtonLink to="/research" skin="ghost" size="md">
            Saiba mais
          </ButtonLink>
        </div>
      </section>
    </CardContainer>
  );
}
