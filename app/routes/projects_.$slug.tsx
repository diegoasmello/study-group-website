import { Button } from "~/components/Button";
import { ButtonShare } from "~/components/ButtonShare";
import { CardContainer } from "~/components/Card";
import { CardProject } from "~/components/CardProject";
import { CardResearch } from "~/components/CardResearch";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { IconArrowForward } from "~/components/icons";
import { Link } from "~/components/Link";
import { NewsletterBanner } from "~/components/NewsletterBanner";

export default function ViewProject() {
  return (
    <main className="pt-12 pb-20 bg-page">
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <img
              src="/assets/card-image.png"
              alt=""
              className="w-[180px] h-[180px] rounded-3xl object-cover mb-6"
            />
            <h1 className="text-h1 text-gray-950 mb-6">Conexões Literárias</h1>
            <div className="mb-6">
              <p className="text-gray-950 mb-6">
                O presente artigo resgata uma das primeiras ações promovidas
                pelo Grupo de Estudos em Linguagem e Transculturalidade
                (GELT-CNPq) e pelo Programa de Educação Tutorial
                (PET-Letras-UFGD) para o acolhimento de crianças venezuelanas
                que se encontram em situação de migração forçada no Brasil,
                estudantes em escolas públicas na cidade de Dourados-MS.
                Provenientes de uma pesquisa-ação, os dados discutidos são
                resultados de um projeto piloto em que integrantes dos dois
                grupos elaboraram ações de intervenção escolar por meio de
                práticas translíngues em aulas de Língua Portuguesa na educação
                básica. Destaca-se um momento significativo da intervenção em
                que uma estudante (filha de migrantes venezuelanos) desloca-se
                do lugar de quem não sabe para o lugar daquela que tem o
                conhecimento importante para a situação construída
                pedagogicamente. Inspiradas na proposta de uma educação
                linguística ampliada, desenvolvida por Marilda Calvalcanti,
                problematizamos na prática o conceito de translinguagem/práticas
                translíngues em articulação com o pensamento decolonial. Nosso
                objetivo é ‘tornar visíveis’ resultados de ações que, por meio
                de uma perspectiva decolonial dos estudos sobre
                bi/multilinguismo, contribuem na formação de professores para a
                diversidade e a pluralidade cultural, social e linguística,
                assim como na elaboração de políticas linguísticas de
                acolhimento de sujeitos bilinguajantes em aulas de Língua
                Portuguesa.
              </p>
            </div>
            <nav className="flex gap-4 lg:mb-6">
              <Button>Visitar projeto</Button>
              <ButtonShare urlToShare="rwada" skin="ghost">
                Compartilhar
              </ButtonShare>
            </nav>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <CardContainer className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Pesquisador(es)
                  </span>
                  <span className="text-gray-950">Lorem Ipsum.</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Período
                  </span>
                  <span className="text-gray-950">Lorem Ipsum.</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <Link to="/">
                  <IconArrowForward className="size-5" /> Visitar projeto
                </Link>
              </div>
            </CardContainer>
            <CardResearch />
          </div>
          <div className="col-span-12 flex flex-col gap-6 mb-8">
            <h2 className="text-h3 text-gray-950">Outros projetos</h2>
            <div className="w-full">
              <Carousel>
                {(isSlideInView) =>
                  Array(9)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[32px] min-w-0 "
                      >
                        <CardProject
                          project={{
                            title: "Lorem ipsum",
                            image: "/assets/card-image.png",
                            link: "/projects/1",
                          }}
                          hideShadow={!isSlideInView(index)}
                        />
                      </div>
                    ))
                }
              </Carousel>
            </div>
          </div>
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
