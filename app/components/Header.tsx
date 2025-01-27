import { Link, NavLink } from "@remix-run/react";
import { Button } from "./Button";
import { Container } from "./Container";
import logo from "~/images/logo-dark.png";
import { MdArrowForwardIos, MdSearch } from "react-icons/md";

export function Header() {
  return (
    <header className="flex items-center justify-center h-20">
      <Container>
        <div className="flex flex-row items-center justify-between">
          <Link to="./">
            <img src={logo} alt="Logo" className="h-[40px]" />
          </Link>

          <nav>
            <ul className="flex flex-row items-center gap-8">
              {navLinks.map((navLink) => (
                <li key={navLink.href} className="font-medium">
                  {navLink.isButton ? (
                    <button>{navLink.label}</button>
                  ) : (
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "text-primary border-primary border-b-2 pb-1"
                          : isPending
                          ? "pending"
                          : ""
                      }
                      to={navLink.href!}
                    >
                      {navLink.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <ul className="flex flex-row items-center gap-2">
              <li>
                <Button size="md" skin="ghost" className="gap-2 px-3">
                  <span>PT</span>
                  <MdArrowForwardIos className="rotate-90" size={16} />
                </Button>
              </li>
              <li>
                <Button size="md" skin="ghost" className="w-[44px] px-0">
                  <MdSearch size={24} />
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}

const navLinks = [
  {
    label: "Início",
    href: "./",
  },
  {
    label: "Sobre",
    isButton: true,
  },
  {
    label: "Publicações",
    href: "./publications",
  },
  {
    label: "Eventos e Cursos",
    href: "./events",
  },
  {
    label: "Ações",
    href: "./actions",
  },
  {
    label: "Projetos",
    href: "./projects",
  },
];
