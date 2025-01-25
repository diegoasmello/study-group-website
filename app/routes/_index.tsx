import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/Button";
import { Card } from "~/components/Card";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";

import cardImage from "~/images/card-image.png";

export const meta: MetaFunction = () => {
  return [
    { title: "study-group-site" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main className="pt-8 pb-20">
      {/* carousel */}
      <section className="w-full relative">
        <Container>
          <section className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <div className="flex flex-col gap-8 items-start">
                <div className="flex flex-col gap-4">
                  <span className="text-primary font-medium">Ação</span>
                  <span className="text-h1-display">
                    Curso de Letras realiza palestras e encontros on-line
                  </span>
                  <p className="text-lead-1 text-gray-800">
                    Confira a programação de atividades já prevista para o mês
                    de dezembro e outros encontros que ainda estão sendo
                    preparados.{" "}
                  </p>
                </div>
                <Button>Saiba mais</Button>
                <nav className="flex flex-row gap-4">
                  <Button size="md">prev</Button>
                  <Button size="md">next</Button>
                </nav>
              </div>
            </div>
          </section>
        </Container>
        <img
          src={cardImage}
          alt={"dawdwa"}
          className="h-[506px] w-[50vw] object-cover absolute top-0 right-0 rounded-l-[56px]"
        />
      </section>

      {/* about section */}
      <Container className="pt-14 pb-20">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-6">
            <img
              src={cardImage}
              alt="Sobre o grupo"
              className="w-full rounded-3xl"
            />
          </div>

          <div className="col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-primary font-medium">Sobre o grupo</span>
              <span className="text-h2">
                Novos rumos para o ensino de língua em tempos de globalização
              </span>
              <p className="text-gray-800">
                Unimos pesquisadores e entusiastas para compreender como a
                diversidade linguística e a interculturalidade influenciam a
                criação, tradução e recepção das narrativas, enriquecendo a
                apreciação da riqueza literária global. Junte-se a nós nessa
                jornada de descobertas e análises, conectando-se com a essência
                da palavra escrita em suas variadas formas e manifestações.{" "}
              </p>
            </div>

            <nav className="flex flex-row gap-4">
              <Button>História</Button>
              <Button skin="outline">Equipe</Button>
            </nav>
          </div>
        </div>
      </Container>

      {/* research section */}
      <Container className="flex flex-col gap-8 pb-16">
        <h2 className="text-h3 text-center">Áreas de pesquisa</h2>
        <div className="grid grid-cols-3 gap-8">
          <Card
            type="flat"
            title="Leitura e Escrita"
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            icon={"a"}
          />
          <Card
            type="flat"
            title="Multilinguismo"
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            icon={"a"}
          />
          <Card
            type="flat"
            title="Transculturalidade"
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            icon={"a"}
          />
        </div>
        <Link to={`/events`} className="text-center text-primary underline">
          Saiba mais sobre nossa pesquisa
        </Link>
      </Container>

      {/* events carousel */}
      <Container className="flex flex-col gap-8 pb-16">
        <h2 className="text-h3 text-center">Eventos e Cursos</h2>
        <div className="grid grid-cols-3 gap-8">
          <Card
            image={cardImage}
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            titleMaxLines={3}
            actions={
              <Button skin="ghost" size="md">
                Saiba mais
              </Button>
            }
          />
          <Card
            image={cardImage}
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            titleMaxLines={3}
            actions={
              <Button skin="ghost" size="md">
                Saiba mais
              </Button>
            }
          />
          <Card
            image={cardImage}
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            titleMaxLines={3}
            actions={
              <Button skin="ghost" size="md">
                Saiba mais
              </Button>
            }
          />
        </div>
        <Link to={`/events`} className="text-center text-primary underline">
          Ver todos eventos
        </Link>
      </Container>

      {/* last publications */}
      <Container className="flex flex-col gap-8 pb-16">
        <h2 className="text-h3 text-left">Últimas publicações</h2>
        <div className="grid grid-cols-4 grid-rows-2 gap-8">
          <div className="col-span-2 row-span-2">
            <Card
              size="extended"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              titleMaxLines={2}
              actions={
                <nav className="flex items-start gap-2">
                  <Button size="md">Ver mais</Button>
                  <Button skin="ghost" size="md">
                    Ler
                  </Button>
                </nav>
              }
            />
          </div>
          <div className="col-start-3">
            <Card
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              titleMaxLines={3}
              actions={
                <Button skin="ghost" size="md">
                  Ver mais
                </Button>
              }
            />
          </div>
          <div className="col-start-3 row-start-2">
            <Card
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              titleMaxLines={3}
              actions={
                <Button skin="ghost" size="md">
                  Ver mais
                </Button>
              }
            />
          </div>
          <div className="col-start-4 row-start-1">
            <Card
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              titleMaxLines={3}
              actions={
                <Button skin="ghost" size="md">
                  Ver mais
                </Button>
              }
            />
          </div>
          <div className="col-start-4 row-start-2">
            <Card
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              titleMaxLines={3}
              actions={
                <Button skin="ghost" size="md">
                  Ver mais
                </Button>
              }
            />
          </div>
        </div>
        <Link
          to={`/publications`}
          className="text-center text-primary underline"
        >
          Ver todas publicações
        </Link>
      </Container>

      {/* actions carousel */}
      <Container className="flex flex-col gap-8 pb-16">
        <h2 className="text-h3 text-center">Últimas ações</h2>
        <div className="grid grid-cols-3 gap-8">
          <Card
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            image={cardImage}
            titleMaxLines={3}
            actions={
              <Button skin="ghost" size="md">
                Saiba mais
              </Button>
            }
          />
          <Card
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            image={cardImage}
            titleMaxLines={3}
            actions={
              <Button skin="ghost" size="md">
                Saiba mais
              </Button>
            }
          />
          <Card
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            image={cardImage}
            titleMaxLines={3}
            actions={
              <Button skin="ghost" size="md">
                Saiba mais
              </Button>
            }
          />
        </div>
        <Link to={`/actions`} className="text-center text-primary underline">
          Ver todas ações
        </Link>
      </Container>

      <Container>
        <NewsletterBanner />
      </Container>
    </main>
  );
}
