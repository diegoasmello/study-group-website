import { Link } from "@remix-run/react";
import { Container } from "./Container";
import logo from "~/images/logo-light.png";
import { IconYoutube } from "./icons/IconYoutube";
import { IconInstagram } from "./icons/IconInstagram";
import { IconFacebook } from "./icons/IconFacebook";

export function Footer() {
  return (
    <footer className="bg-primary-light text-white pt-20 pb-24">
      <Container>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-10 items-start">
            <Link to="./">
              <img src={logo} alt="Logo" className="h-[92px]" />
            </Link>
            <nav>
              <ul className="flex gap-6">
                <li>
                  <a href="./" className="group">
                    <IconFacebook
                      width={36}
                      height={36}
                      className="fill-white group-hover:fill-gray-200 transition-all"
                    />
                  </a>
                </li>
                <li>
                  <a href="./" className="group">
                    <IconInstagram
                      width={36}
                      height={36}
                      className="fill-white group-hover:fill-gray-200 transition-all"
                    />
                  </a>
                </li>
                <li>
                  <a href="./" className="group">
                    <IconYoutube
                      width={36}
                      height={36}
                      className="fill-white group-hover:fill-gray-200 transition-all"
                    />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-start gap-[7.5rem]">
            <nav className="flex flex-col items-start gap-6">
              <span className="font-semibold">Sobre</span>
              <Link to="./" className="underline">
                História
              </Link>
              <Link to="./" className="underline">
                Pesquisa
              </Link>
              <Link to="./" className="underline">
                Equipe
              </Link>
            </nav>
            <nav className="flex flex-col items-start gap-6">
              <span className="font-semibold">Conteúdos</span>
              <Link to="./" className="underline">
                Publicações
              </Link>
              <Link to="./" className="underline">
                Eventos e Cursos
              </Link>
              <Link to="./" className="underline">
                Ações
              </Link>
              <Link to="./" className="underline">
                Projetos
              </Link>
            </nav>
            <nav className="flex flex-col items-start gap-6">
              <span className="font-semibold">Contato</span>
              <span>(51) 99999-9999</span>
              <span>email@email.com</span>
              <span>
                The Cupboard under the Stair,
                <br />4 Privet Drive, Little Whinging
                <br />
                Surrey.
              </span>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}
