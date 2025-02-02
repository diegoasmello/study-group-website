import { Link } from "@remix-run/react";
import { Container } from "./Container";
import { IconYoutube } from "./icons/IconYoutube";
import { IconInstagram } from "./icons/IconInstagram";
import { IconFacebook } from "./icons/IconFacebook";

export function Footer() {
  return (
    <footer className="bg-primary-light text-white py-12 lg:pt-20 lg:pb-24">
      <Container>
        <div className="flex items-start flex-col lg:flex-row justify-between">
          <div className="flex flex-col gap-10 items-start mb-12 lg:mb-0">
            <Link to="./">
              <img
                src="/assets/logo-light.png"
                alt="Logo"
                className="h-[92px]"
              />
            </Link>
            <nav>
              <ul className="flex gap-6">
                <li>
                  <a href="./" className="group">
                    <IconFacebook className="size-9 fill-white group-hover:fill-gray-200 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="./" className="group">
                    <IconInstagram className="size-9 fill-white group-hover:fill-gray-200 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="./" className="group">
                    <IconYoutube className="size-9 fill-white group-hover:fill-gray-200 transition-all" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-start gap-[7.5rem]">
            <nav className="flex-col items-start gap-6 hidden lg:flex">
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
            <nav className="flex-col items-start gap-6 hidden lg:flex">
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
