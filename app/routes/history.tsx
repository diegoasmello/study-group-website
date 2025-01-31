import { MetaFunction } from "@remix-run/react";
import { CardTeamMember } from "~/components/CardTeamMember";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { Link } from "~/components/Link";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import data from "~/data";

import { IconArrowForward } from "~/components/icons";

export const meta: MetaFunction = () => {
  return [
    { title: data.history.title + " | " + data.site.title },
    { name: "description", content: data.history.description },
  ];
};

export default function History() {
  return (
    <main className="pb-20 bg-page">
      <div className="bg-primary-lighter pt-14 pb-16 mb-12 relative overflow-hidden">
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
          src="/assets/illustrations/history.svg"
          alt=""
          className="h-[574px] max-w-max absolute top-[-110px] left-[-66px]"
        />
      </div>

      <Container className="grid gap-y-20">
        {historySections.map((historySection, index) => (
          <HistorySection
            key={index}
            section={historySection}
            align={index % 2 === 0 ? "right" : "left"}
            isLastItem={index === historySections.length - 1}
          />
        ))}
      </Container>

      <Container className="grid gap-8">
        <div className="flex flex-col gap-6 mt-20 mb-10">
          <div className="grid gap-x-8 gap-y-6">
            <div className="flex flex-col gap-8 mb-8">
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
                              image: "/assets/card-image.png",
                              link: "/",
                            }}
                          />
                        </div>
                      ))
                  }
                </Carousel>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Link to="/team">
                Veja toda a equipe <IconArrowForward className="size-5" />
              </Link>
            </div>
          </div>
        </div>
        <NewsletterBanner />
      </Container>
    </main>
  );
}

interface HistorySection {
  title: string;
  description: string;
  illustration1: string;
  illustration2?: string;
}

const HistorySection = (props: {
  section: HistorySection;
  align: "left" | "right";
  isLastItem: boolean;
}) => {
  const { section, align, isLastItem } = props;

  if (isLastItem)
    return (
      <div className="grid grid-cols-12 gap-x-8">
        <div className="col-span-3 flex items-center justify-center">
          <img src={section.illustration1} alt={section.title + " - 1"} />
        </div>
        <div className="col-span-6 flex flex-col gap-6">
          <h2 className="text-h2 text-gray-950 text-center">{section.title}</h2>
          <p className="text-gray-800 text-center">{section.description}</p>
        </div>
        <div className="col-span-3 flex items-center justify-center">
          <img src={section.illustration1} alt={section.title + " - 2"} />
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-12 gap-x-4">
      {align === "left" && (
        <div className="col-span-6 flex items-center justify-center">
          <img
            src={section.illustration1}
            alt={section.title}
            className="h-[260px]"
          />
        </div>
      )}
      <div className="col-span-6 flex flex-col justify-center gap-6 py-4">
        <h2 className="text-h2 text-gray-950">{section.title}</h2>
        <p className="text-gray-800">{section.description}</p>
      </div>
      {align === "right" && (
        <div className="col-span-6 flex items-center justify-center">
          <img
            src={section.illustration1}
            alt={section.title}
            className="h-[260px]"
          />
        </div>
      )}
    </div>
  );
};

const historySections: HistorySection[] = [
  {
    title: "Origens inspiradoras",
    description:
      "O GELT teve seu início a partir de uma visão compartilhada entre um grupo entusiasmado de acadêmicos. Unidos pela paixão à literatura e pelo fascínio que as múltiplas línguas e culturas exercem sobre a palavra escrita, esse grupo visionário decidiu criar um espaço acadêmico dedicado a explorar tais interações complexas.",
    illustration1: "/assets/illustrations/history.svg",
  },
  {
    title: "Os primeiros passos",
    description:
      "Nos primeiros encontros informais do GELT, a troca intensa de ideias e a devoção à literatura eram evidentes. À medida que essas reuniões evoluíram e ganharam estrutura, ficou claro que a investigação aprofundada em literatura, multilinguismo e transculturalidade seria o propósito central do grupo.",
    illustration1: "/assets/illustrations/history.svg",
  },
  {
    title: "Compromisso com a profundidade",
    description:
      "Ao longo dos anos, o GELT investiu esforços incansáveis para investigar a fundo esses temas. Desde análises críticas de obras literárias traduzidas até estudos sobre a influência da cultura de origem na produção literária, cada pesquisa representou um mergulho mais profundo no vasto oceano da literatura, multilinguismo e transculturalidade.",
    illustration1: "/assets/illustrations/history.svg",
  },
  {
    title: "Colaboração e crescimento",
    description:
      "O GELT se tornou um espaço de colaboração intelectual e aprendizado mútuo. Reunindo pesquisadores, estudantes e entusiastas, o grupo valoriza a diversidade de experiências e perspectivas que cada membro traz consigo. As discussões enriquecedoras e a partilha de conhecimento moldaram a identidade única do GELT.",
    illustration1: "/assets/illustrations/history.svg",
  },
  {
    title: "Vislumbrando o futuro",
    description:
      "A história do GELT continua a ser escrita, o grupo está ansioso para o que o futuro reserva, enquanto continuamos a trilhar o caminho da exploração e descobrimento no mundo vasto e enriquecedor da literatura, multilinguismo e transculturalidade. Estamos comprometidos em expandir nossas fronteiras acadêmicas e, através disso, contribuir para um diálogo global mais rico e informado sobre esses temas fundamentais.",
    illustration1: "/assets/illustrations/history.svg",
    illustration2: "/assets/illustrations/history.svg",
  },
];
