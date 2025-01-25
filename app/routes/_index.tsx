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
        <span>Ação</span>
        <span className="text-5xl">
          Curso de Letras realiza palestras e encontros on-line
        </span>
        <p>
          Confira a programação de atividades já prevista para o mês de dezembro
          e outros encontros que ainda estão sendo preparados.{" "}
        </p>
        <Button>Saiba mais</Button>
        <Button size="md">prev</Button>
        <Button size="md">next</Button>
      </section>

      {/* about section */}
      <section className="container mx-auto">
        <div className="grid grid-cols-2 gap-8">
          <img src="" alt="Sobre o grupo" />

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span>Sobre o grupo</span>
              <span>
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

            <nav>
              <Button>História</Button>
              <Button skin="outline">Equipe</Button>
            </nav>
          </div>
        </div>
      </section>

      {/* research section */}
      <section className="container mx-auto flex flex-col gap-8">
        <h2 className="text-3xl	text-center">Áreas de pesquisa</h2>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3>Leitura e Escrita</h3>
            <p>Lorem ipsum</p>
          </div>
          <div>
            <h3>Multilinguismo</h3>
            <p>Lorem ipsum</p>
          </div>
          <div>
            <h3>Transculturalidade</h3>
            <p>Lorem ipsum</p>
          </div>
        </div>
      </section>

      {/* events carousel */}
      <section className="container mx-auto flex flex-col gap-8">
        <h2 className="text-3xl	text-center">Eventos e Cursos</h2>
        <div className="grid grid-cols-3 gap-8">
          <Card
            type="float"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            actions={<Button>Saiba mais</Button>}
            titleMaxLines={3}
          />
          <Card
            type="float"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            actions={<Button>Saiba mais</Button>}
            titleMaxLines={3}
          />
          <Card
            type="float"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            actions={<Button>Saiba mais</Button>}
            titleMaxLines={3}
          />
        </div>
        <Link to={`/events`} className="text-center text-primary underline">
          Ver todos eventos
        </Link>
      </section>

      {/* last publications */}
      <section className="container mx-auto flex flex-col gap-8">
        <h2 className="text-3xl	text-center">Últimas publicações</h2>
        <div className="grid grid-cols-4 grid-rows-2 gap-8">
          <div className="col-span-2 row-span-2">
            <Card
              size="extended"
              type="float"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              actions={<Button>Ver mais</Button>}
              titleMaxLines={2}
            />
          </div>
          <div className="col-start-3">
            <Card
              type="float"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              actions={<Button>Ver mais</Button>}
              titleMaxLines={3}
            />
          </div>
          <div className="col-start-3 row-start-2">
            <Card
              type="float"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              actions={<Button>Ver mais</Button>}
              titleMaxLines={3}
            />
          </div>
          <div className="col-start-4 row-start-1">
            <Card
              type="float"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              actions={<Button>Ver mais</Button>}
              titleMaxLines={3}
            />
          </div>
          <div className="col-start-4 row-start-2">
            <Card
              type="float"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              actions={<Button>Ver mais</Button>}
              titleMaxLines={3}
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
      <section className="container mx-auto flex flex-col gap-8">
        <h2 className="text-3xl	text-center">Últimas ações</h2>
        <div className="grid grid-cols-3 gap-8">
          <Card
            type="float"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            actions={<Button>Saiba mais</Button>}
            titleMaxLines={3}
          />
          <Card
            type="float"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            actions={<Button>Saiba mais</Button>}
            titleMaxLines={3}
          />
          <Card
            type="float"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            actions={<Button>Saiba mais</Button>}
            titleMaxLines={3}
          />
        </div>
        <Link to={`/actions`} className="text-center text-primary underline">
          Ver todas ações
        </Link>
      </section>

      {/* newsletter section */}
      <section className="container mx-auto">
        <span>Participe do nosso grupo!</span>
        <input type="text" placeholder="Digite seu e-mail" />
        <Button>Enviar</Button>
      </section>

      {/* footer */}
    </main>
  );
}
