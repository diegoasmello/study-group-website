import { Link, NavLink, useLocation } from "@remix-run/react";
import { Button } from "./Button";
import { Container } from "./Container";
import logo from "~/images/logo-dark.png";
import { useEffect, useRef, useState } from "react";
import { IconSearch, IconChevronDown } from "./icons";

export function Header() {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isPageOnTop, setIsPageOnTop] = useState(true);
  const navRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = navRef.current?.querySelector(
        ".active"
      ) as HTMLElement;

      if (activeLink) {
        setIndicatorStyle({
          width: `${activeLink.offsetWidth}px`,
          left: `${activeLink.offsetLeft}px`,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsPageOnTop(currentScrollY === 0);

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex items-center justify-center w-full h-20 z-10 fixed top-0 left-0 bg-white
        ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}
        ${
          !isPageOnTop
            ? "shadow-custom-1 transition-transform duration-300"
            : ""
        }
      `}
    >
      <Container>
        <div className="flex flex-row items-center justify-between">
          <Link to="./">
            <img src={logo} alt="Logo" className="h-[40px]" />
          </Link>

          <nav className="relative" ref={navRef}>
            <ul className="flex flex-row items-center gap-8">
              {navLinks.map((navLink) => (
                <li key={navLink.href} className="font-medium">
                  {navLink.isButton ? (
                    <button>{navLink.label}</button>
                  ) : (
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "active text-primary border-primary"
                          : "text-gray-950 hover:text-primary"
                      }
                      to={navLink.href!}
                    >
                      {navLink.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
            <div
              className={`absolute bottom-[-6px] h-[2px] bg-primary transition-all duration-300 ease-in-out `}
              style={indicatorStyle}
            />
          </nav>

          <nav>
            <ul className="flex flex-row items-center gap-2">
              <li>
                <Button size="md" skin="ghost" className="gap-2 px-3">
                  <span>PT</span>
                  <IconChevronDown width={24} height={24} />
                </Button>
              </li>
              <li>
                <Button size="md" skin="ghost" className="w-[44px] px-0">
                  <IconSearch width={24} height={24} />
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
