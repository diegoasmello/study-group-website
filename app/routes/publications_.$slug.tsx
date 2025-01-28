import { Button } from "~/components/Button";
import { CardContainer } from "~/components/Card";
import { CardPublication } from "~/components/CardPublication";
import { CardResearch } from "~/components/CardResearch";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";

export default function ViewPublication() {
  return (
    <main className="pt-12 pb-20">
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-8">
            <h1 className="text-h2 text-gray-950 mb-6">
              Práticas translíngues como recurso no acolhimento de migrantes
              venezuelanos em sala de aula de língua portuguesa
            </h1>
            <ul className="flex flex-col gap-2 mb-8">
              <li className="flex gap-4">
                i <span>item</span>
              </li>
              <li className="flex gap-4">
                i <span>item</span>
              </li>
            </ul>
            <h2 className="text-h4 text-gray-950 mb-2">Resumo</h2>
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
            <nav className="flex gap-4 mb-6">
              <Button>Ler</Button>
              <Button skin="ghost">Compartilhar</Button>
            </nav>
          </div>
          <div className="col-span-4 flex flex-col gap-6">
            <CardContainer className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Revista
                  </span>
                  <span className="text-gray-950">Lorem Ipsum.</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    DOI
                  </span>
                  <span className="text-gray-950">Lorem Ipsum.</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <div className="flex flex-col gap-2">
                  <span className="text-h5 uppercase font-medium text-gray-600">
                    Licença
                  </span>
                  <span className="text-gray-950">Lorem Ipsum.</span>
                </div>
                <hr className="w-full border-primary-lighter" />
                <Button skin="ghost" size="md">
                  Citar
                </Button>
              </div>
            </CardContainer>
            <CardResearch />
          </div>
          <div className="col-span-12 flex flex-col gap-6 mb-8">
            <h2 className="text-h3 text-gray-950">Publicações relacionadas</h2>
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
                        <CardPublication
                          size="default"
                          hideShadow={!isSlideInView(index)}
                          publication={{
                            title:
                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            description:
                              "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                            author:
                              "Velit Esse, Cillum Dolore e Fugiat Nulla Pariatur.",
                            date: new Date(),
                          }}
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
