import type { MetaFunction } from "@remix-run/node";
import { MdArrowForward, MdArrowRightAlt } from "react-icons/md";
import { Button } from "~/components/Button";
import { Card } from "~/components/Card";
import { CardAction } from "~/components/CardAction";
import { CardEvent } from "~/components/CardEvent";
import { CardPublication } from "~/components/CardPublication";
import { Container } from "~/components/Container";
import { IconMultilinguism } from "~/components/icons/IconMultilinguism";
import { IconReadinWriting } from "~/components/icons/IconReadinWriting";
import { IconTranculturality } from "~/components/icons/IconTranculturality";
import { Link } from "~/components/Link";
import { Link as RemixLink } from "@remix-run/react";

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
                  <button>
                    <MdArrowRightAlt size={32} />
                  </button>
                  <button>
                    <MdArrowRightAlt size={32} />
                  </button>
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
              <RemixLink to={"/history"}>
                <Button>História</Button>
              </RemixLink>
              <RemixLink to={"/team"}>
                <Button skin="outline">Equipe</Button>
              </RemixLink>
            </nav>
          </div>
        </div>
      </Container>

      {/* research section */}
      <Container className="flex flex-col gap-8 pb-16 items-center">
        <h2 className="text-h3">Áreas de pesquisa</h2>
        <div className="grid grid-cols-3 gap-8">
          <Card
            type="flat"
            title="Leitura e Escrita"
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            icon={<IconReadinWriting className="fill-primary" />}
          />
          <Card
            type="flat"
            title="Multilinguismo"
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            icon={<IconMultilinguism className="fill-primary" />}
          />
          <Card
            type="flat"
            title="Transculturalidade"
            text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            icon={<IconTranculturality className="fill-primary" />}
          />
        </div>
        <Link to={`/research`} className="text-center">
          Saiba mais sobre nossa pesquisa <MdArrowForward size={18} />
        </Link>
      </Container>

      {/* events carousel */}
      <Container className="flex flex-col gap-8 pb-16 items-center">
        <h2 className="text-h3">Eventos e Cursos</h2>
        <div className="grid grid-cols-3 gap-8">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <CardEvent
                key={index}
                size="default"
                event={{
                  title:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  image: cardImage,
                  date: new Date(),
                  locale: "Online",
                }}
              />
            ))}
        </div>
        <Link to={`/events`} className="text-center">
          Ver todos eventos <MdArrowForward size={18} />
        </Link>
      </Container>

      {/* last publications */}
      <Container className="flex flex-col gap-8 pb-16 items-center">
        <h2 className="text-h3 text-left w-full">Últimas publicações</h2>
        <div className="grid grid-cols-4 grid-rows-2 gap-8">
          <div className="col-span-2 row-span-2">
            <CardPublication
              className="h-full"
              size="extended"
              publication={{
                title:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                description:
                  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                author: "Velit Esse, Cillum Dolore e Fugiat Nulla Pariatur.",
                date: new Date(),
              }}
            />
          </div>
          <div className="col-start-3">
            <CardPublication
              size="default"
              publication={{
                title:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                description:
                  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                author: "Velit Esse, Cillum Dolore e Fugiat Nulla Pariatur.",
                date: new Date(),
              }}
            />
          </div>
          <div className="col-start-3 row-start-2">
            <CardPublication
              size="default"
              publication={{
                title:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                description:
                  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                author: "Velit Esse, Cillum Dolore e Fugiat Nulla Pariatur.",
                date: new Date(),
              }}
            />
          </div>
          <div className="col-start-4 row-start-1">
            <CardPublication
              size="default"
              publication={{
                title:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                description:
                  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                author: "Velit Esse, Cillum Dolore e Fugiat Nulla Pariatur.",
                date: new Date(),
              }}
            />
          </div>
          <div className="col-start-4 row-start-2">
            <CardPublication
              size="default"
              publication={{
                title:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                description:
                  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                author: "Velit Esse, Cillum Dolore e Fugiat Nulla Pariatur.",
                date: new Date(),
              }}
            />
          </div>
        </div>
        <Link to={`/publications`} className="text-center">
          Ver todas publicações <MdArrowForward size={18} />
        </Link>
      </Container>

      {/* actions carousel */}
      <Container className="flex flex-col gap-8 pb-16 items-center">
        <h2 className="text-h3">Últimas ações</h2>
        <div className="grid grid-cols-3 gap-8">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <CardAction
                key={index}
                size="default"
                action={{
                  title:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  image: cardImage,
                  date: new Date(),
                }}
              />
            ))}
        </div>
        <Link to={`/actions`} className="text-center">
          Ver todas ações <MdArrowForward size={18} />
        </Link>
      </Container>

      <Container>
        <NewsletterBanner />
      </Container>
    </main>
  );
}
