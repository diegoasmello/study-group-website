import { Button } from "~/components/Button";
import { CardAction } from "~/components/CardAction";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import cardImage from "~/images/card-image.png";

export default function ViewAction() {
  return (
    <main className="pb-20  bg-page">
      <img
        src={cardImage}
        alt=""
        className="h-[600px] w-full object-cover mb-12"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12">
            <h1 className="text-h1 text-gray-950 mb-6">
              Línguas e políticas linguísticas no atendimento à saúde
            </h1>
            <div className="mb-6">
              <p className="text-gray-950">
                O curso de extensão “Línguas e políticas linguísticas no
                atendimento à saúde” nasce da parceria entre o Instituto de
                Investigação e Desenvolvimento em Políticas Linguísticas (IPOL),
                o Grupo de Estudos em Linguagem e Transculturalidade
                (GELT/CNPq/UFGD), a Cátedra UNESCO de Políticas Linguísticas
                para o Multilinguismo, para contribuir com algumas necessidades
                urgentes que envolvem o uso das línguas e o sistema de saúde
                brasileiro, em especial nas regiões fronteiriças. Dados do
                relatório consolidado do Observatório das Migrações
                Internacionais (OBMigra - 2023) revelam tendência de crescimento
                dos processos migratórios internacionais e a consolidação do
                eixo migratório do Sul Global em direção ao Brasil. Em 2022, a
                principal nacionalidade a buscar residência no país foi a
                venezuelana, seguida de boliviana, colombiana, argentina, cubana
                e haitiana. Os dados disponibilizados mostram o aumento e a
                capilaridade dos imigrantes nas diferentes regiões do país, com
                um número estimado de 1,5 milhão de imigrantes entre 2011 e
                2022, somando os de registros migratórios para solicitantes de
                refúgio e refugiados. Tal situação geopolítica têm impacto
                direto nos repertórios e nas práticas linguísticas locais, bem
                como produzem tensões, hierarquias e desigualdades em diversos
                setores da sociedade, como é o caso do atendimento à saúde.
                Acrescenta-se a esse cenário, a diversidade das comunidades
                indígenas, das populações transfronteiriças e das comunidades
                surdas que vivem e se deslocam no território nacional. Diante do
                exposto, o curso visa a formação de profissionais da saúde
                oferecendo uma abordagem do multilinguismo que caracteriza a
                sociedade brasileira, análises de contextos específicos e
                discussão sobre possíveis encaminhamentos que possam viabilizar
                a garantia da acessibilidade linguística no atendimento à saúde.
              </p>
            </div>
            <nav className="flex gap-4 mb-6">
              <Button>Compartilhar</Button>
            </nav>
          </div>
          <div className="col-span-12 flex flex-col gap-6 mb-8">
            <h2 className="text-h3 text-gray-950">Outras ações</h2>
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
                        <CardAction
                          size="default"
                          action={{
                            title:
                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            image: cardImage,
                            date: new Date(),
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
