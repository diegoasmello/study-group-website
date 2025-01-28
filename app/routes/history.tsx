import { MetaFunction } from "@remix-run/react";
import { MdArrowForward } from "react-icons/md";
import { CardTeamMember } from "~/components/CardTeamMember";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { Link } from "~/components/Link";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import data from "~/data";
import historyIllustration from "~/images/illustrations/history.svg";
import cardImage from "~/images/card-image.png";

export const meta: MetaFunction = () => {
  return [
    { title: data.history.title + " | " + data.site.title },
    { name: "description", content: data.history.description },
  ];
};

export default function History() {
  return (
    <main className="pb-20">
      <div className="bg-primary-lighter pt-14 pb-16 mb-8 relative overflow-hidden">
        <Container className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-6" />
          <div className="flex flex-col gap-2 col-span-4">
            <h1 className="text-primary font-medium">{data.history.title}</h1>
            <span className="text-h2">
              Novos rumos para o ensino de língua em tempos de globalização
            </span>
            <p className="text-lead-1 text-gray-800">
              {data.history.description}
            </p>
          </div>
        </Container>
        <img
          src={historyIllustration}
          alt=""
          className="h-[574px] max-w-max absolute top-[-110px] left-[-66px]"
        />
      </div>
      <Container className="grid grid-cols-12 gap-x-8 gap-y-6">
        <div className="flex flex-col gap-6 col-span-6">
          <h2 className="text-h2 text-gray-950">Origens inspiradoras</h2>
          <p className="text-gray-800">
            O GELT teve seu início a partir de uma visão compartilhada entre um
            grupo entusiasmado de acadêmicos. Unidos pela paixão à literatura e
            pelo fascínio que as múltiplas línguas e culturas exercem sobre a
            palavra escrita, esse grupo visionário decidiu criar um espaço
            acadêmico dedicado a explorar tais interações complexas.
          </p>
        </div>
        <div className="flex flex-col col-span-6"></div>
        <div className="flex flex-col col-span-6"></div>
        <div className="flex flex-col gap-6 col-span-6">
          <h2 className="text-h2 text-gray-950">Os primeiros passos</h2>
          <p className="text-gray-800">
            O GELT teve seu início a partir de uma visão compartilhada entre um
            grupo entusiasmado de acadêmicos. Unidos pela paixão à literatura e
            pelo fascínio que as múltiplas línguas e culturas exercem sobre a
            palavra escrita, esse grupo visionário decidiu criar um espaço
            acadêmico dedicado a explorar tais interações complexas.
          </p>
        </div>
        <div className="flex flex-col gap-6 col-span-6">
          <h2 className="text-h2 text-gray-950">
            Compromisso com a profundidade
          </h2>
          <p className="text-gray-800">
            O GELT teve seu início a partir de uma visão compartilhada entre um
            grupo entusiasmado de acadêmicos. Unidos pela paixão à literatura e
            pelo fascínio que as múltiplas línguas e culturas exercem sobre a
            palavra escrita, esse grupo visionário decidiu criar um espaço
            acadêmico dedicado a explorar tais interações complexas.
          </p>
        </div>
        <div className="flex flex-col gap-6 col-span-12 mt-20 mb-10">
          <div className="grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 flex flex-col gap-8 mb-8">
              <h2 className="text-h3 text-gray-950">Conheça nossa equipe</h2>
              <div className="w-full">
                <Carousel>
                  {(isSlideInView) =>
                    Array(9)
                      .fill(null)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="embla__slide flex flex-[0_0_33.3333%] pl-[32px] min-w-0 "
                        >
                          <CardTeamMember
                            type="float"
                            hideShadow={!isSlideInView(index)}
                            teamMember={{
                              name: "Harry Potter",
                              label: "Auror",
                              image: cardImage,
                              link: "/",
                            }}
                          />
                        </div>
                      ))
                  }
                </Carousel>
              </div>
            </div>
            <div className="flex flex-col items-center col-span-12">
              <Link to="/team">
                Veja toda a equipe <MdArrowForward size={18} />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <NewsletterBanner />
        </div>
      </Container>
    </main>
  );
}
