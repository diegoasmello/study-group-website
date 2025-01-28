import { MetaFunction } from "@remix-run/react";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import data from "~/data";
import researchIllustration from "~/images/illustrations/research.svg";
import cardImage from "~/images/card-image.png";
import { IconReadinWriting } from "~/components/icons/IconReadinWriting";
import { Carousel } from "~/components/Carousel";
import { CardProject } from "~/components/CardProject";
import { IconTranculturality } from "~/components/icons/IconTranculturality";
import { IconMultilinguism } from "~/components/icons/IconMultilinguism";

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
        className="mb-12"
      />

      <div className="flex flex-col gap-16 mb-20">
        {researchAreas.map((researchArea, index) => (
          <ResearchItemSection key={index} item={researchArea} index={index} />
        ))}
      </div>

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

const IconWrapper = ({ children }: { children: JSX.Element }) => (
  <div className="w-[64px] h-[64px] bg-primary-lighter flex items-center justify-center rounded-3xl">
    {children}
  </div>
);

interface Project {
  title: string;
  image: string;
  link: string;
}

interface ResearchArea {
  title: string;
  text: string;
  icon: JSX.Element;
  projects: Project[];
}

const researchAreas: ResearchArea[] = [
  {
    title: "Leitura e Escrita",
    text: "Essa área se dedica ao estudo dos processos cognitivos e sociais envolvidos na habilidade de ler e escrever. Engloba uma ampla gama de investigações, desde a análise das habilidades de decodificação de letras e palavras até a compreensão e interpretação de textos complexos. Explora como os indivíduos adquirem competências linguísticas ao longo do desenvolvimento, como a leitura e a escrita são ensinadas e aprendidas em diferentes contextos educacionais, e como fatores sociais, culturais e psicológicos influenciam a proficiência nesses aspectos. Além disso, busca entender como a tecnologia e as mudanças sociais impactam a leitura e escrita, bem como desenvolver estratégias eficazes para promover a alfabetização e a expressão escrita.",
    icon: <IconReadinWriting className="fill-primary" />,
    projects: Array(9)
      .fill(null)
      .map(() => ({
        title: "Lorem ipsum",
        image: cardImage,
        link: "/projects/1",
      })),
  },
  {
    title: "Multilinguismo",
    text: "Essa área se dedica ao estudo dos processos cognitivos e sociais envolvidos na habilidade de ler e escrever. Engloba uma ampla gama de investigações, desde a análise das habilidades de decodificação de letras e palavras até a compreensão e interpretação de textos complexos. Explora como os indivíduos adquirem competências linguísticas ao longo do desenvolvimento, como a leitura e a escrita são ensinadas e aprendidas em diferentes contextos educacionais, e como fatores sociais, culturais e psicológicos influenciam a proficiência nesses aspectos. Além disso, busca entender como a tecnologia e as mudanças sociais impactam a leitura e escrita, bem como desenvolver estratégias eficazes para promover a alfabetização e a expressão escrita.",
    icon: <IconMultilinguism className="fill-primary" />,
    projects: Array(9)
      .fill(null)
      .map(() => ({
        title: "Lorem ipsum",
        image: cardImage,
        link: "/projects/1",
      })),
  },
  {
    title: "Transculturalidade",
    text: "Essa área se dedica ao estudo dos processos cognitivos e sociais envolvidos na habilidade de ler e escrever. Engloba uma ampla gama de investigações, desde a análise das habilidades de decodificação de letras e palavras até a compreensão e interpretação de textos complexos. Explora como os indivíduos adquirem competências linguísticas ao longo do desenvolvimento, como a leitura e a escrita são ensinadas e aprendidas em diferentes contextos educacionais, e como fatores sociais, culturais e psicológicos influenciam a proficiência nesses aspectos. Além disso, busca entender como a tecnologia e as mudanças sociais impactam a leitura e escrita, bem como desenvolver estratégias eficazes para promover a alfabetização e a expressão escrita.",
    icon: <IconTranculturality className="fill-primary" />,
    projects: Array(9)
      .fill(null)
      .map(() => ({
        title: "Lorem ipsum",
        image: cardImage,
        link: "/projects/1",
      })),
  },
];

const ResearchItemSection = ({
  item,
  index,
}: {
  item: ResearchArea;
  index: number;
}) => {
  const isOdd = index % 2 === 0;

  return (
    <div className="flex flex-col gap-14">
      <div className="relative">
        <img
          src={cardImage}
          alt=""
          className={`h-full w-[calc(50vw-4rem)] rounded-${
            isOdd ? "r" : "l"
          }-[32px] object-cover absolute ${isOdd ? "left" : "right"}-0`}
        />
        <Container>
          <section className="grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 grid grid-cols-12">
              <div
                className={`col-span-6 col-start-${
                  isOdd ? "7" : "1"
                } flex flex-col gap-y-4 py-4`}
              >
                <IconWrapper>
                  <IconTranculturality className="fill-primary" />
                </IconWrapper>
                <h2 className="text-h3 text-gray-950">{item.title}</h2>
                <p className="text-gray-800">{item.text}</p>
              </div>
            </div>
          </section>
        </Container>
      </div>
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <h3 className="text-h4 mb-6">Projetos relacionados</h3>
            <div className="w-full">
              <Carousel>
                {() =>
                  item.projects.map((_, index) => (
                    <div
                      key={index}
                      className="embla__slide flex flex-[0_0_33.3333%] pl-[32px] min-w-0 "
                    >
                      <CardProject
                        project={{
                          title: "Lorem ipsum",
                          image: cardImage,
                          link: "/projects/1",
                        }}
                        type="flat"
                      />
                    </div>
                  ))
                }
              </Carousel>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};
