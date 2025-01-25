import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/Button";
import { Card } from "~/components/Card";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      {/* carousel */}
      <section className="container mx-auto">
        <div className="flex flex-col gap-8 items-start">
          <div className="flex flex-col gap-4">
            <span>Ação</span>
            <span className="text-h1-display">
              Curso de Letras realiza palestras e encontros on-line
            </span>
            <p className="text-lead-1">
              Confira a programação de atividades já prevista para o mês de
              dezembro e outros encontros que ainda estão sendo preparados.{" "}
            </p>
          </div>
          <Button>Saiba mais</Button>
          <nav className="flex flex-row gap-4">
            <Button size="md">prev</Button>
            <Button size="md">next</Button>
          </nav>
        </div>
      </section>

      {/* about section */}
      <section className="container mx-auto">
        <div className="grid grid-cols-2 gap-8">
          <img src="" alt="Sobre o grupo" />

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-primary text-gray-">Sobre o grupo</span>
              <span className="text-h2">
                Novos rumos para o ensino de língua em tempos de globalização
              </span>
              <p>
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
      </section>

      {/* research section */}
      <section className="container mx-auto flex flex-col gap-8 pb-16">
        <h2 className="text-h3 text-center">Áreas de pesquisa</h2>
        <div className="grid grid-cols-3 gap-8">
          <Card
            type="flat"
            title="Leitura e Escrita"
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          />
          <Card
            type="flat"
            title="Multilinguismo"
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          />
          <Card
            type="flat"
            title="Transculturalidade"
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          />
        </div>
      </section>

      {/* events carousel */}
      <section className="container mx-auto flex flex-col gap-8 pb-16">
        <h2 className="text-h3 text-center">Eventos e Cursos</h2>
        <div className="grid grid-cols-3 gap-8">
          <Card
            type="float"
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
            type="float"
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
            type="float"
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
      </section>

      {/* last publications */}
      <section className="container mx-auto flex flex-col gap-8 pb-16">
        <h2 className="text-h3 text-center">Últimas publicações</h2>
        <div className="grid grid-cols-4 grid-rows-2 gap-8">
          <div className="col-span-2 row-span-2">
            <Card
              size="extended"
              type="float"
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
              type="float"
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
              type="float"
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
              type="float"
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
              type="float"
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
      </section>

      {/* actions carousel */}
      <section className="container mx-auto flex flex-col gap-8 pb-16">
        <h2 className="text-h3 text-center">Últimas ações</h2>
        <div className="grid grid-cols-3 gap-8">
          <Card
            type="float"
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
            type="float"
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
            type="float"
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
        <Link to={`/actions`} className="text-center text-primary underline">
          Ver todas ações
        </Link>
      </section>

      {/* newsletter section */}
      <section className="container mx-auto pb-20">
        <div className="flex flex-col gap-6 items-start">
          <span className="text-h3">Participe do nosso grupo!</span>
          <input type="text" placeholder="Digite seu e-mail" />
          <Button>Enviar</Button>
        </div>
      </section>
    </main>
  );
}
