import { Link, NavLink } from "@remix-run/react";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="container mx-auto flex flex-row items-center justify-between h-20">
      <Link to="./">
        <img src="" alt="Logo" />
      </Link>

      <nav>
        <ul className="flex flex-row items-center gap-8">
          {navLinks.map((navLink) => (
            <li key={navLink.href}>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "text-primary" : isPending ? "pending" : ""
                }
                to={navLink.href}
              >
                {navLink.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav>
        <ul className="flex flex-row items-center gap-2">
          <li>
            <Button>search</Button>
          </li>
          <li>
            <Button>lang</Button>
          </li>
        </ul>
      </nav>
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
    href: "./",
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
