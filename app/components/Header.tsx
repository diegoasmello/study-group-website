import { Link, NavLink, useLocation } from "@remix-run/react";
import { Button } from "./Button";
import { Container } from "./Container";
import logo from "~/images/logo-dark.png";
import { useEffect, useRef, useState } from "react";
import { IconSearch, IconChevronDown } from "./icons";
import { Dropdown, DropdownItemLink } from "./Dropdown";

export function Header() {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isPageOnTop, setIsPageOnTop] = useState(true);
  const navRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const [isAboutNavLinkActive, setIsAboutNavLinkActive] = useState(
    checkIsAboutNavLinkActive(location.pathname)
  );

  useEffect(() => {
    setIsAboutNavLinkActive(checkIsAboutNavLinkActive(location.pathname));
  }, [location.pathname]);

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
  }, [location.pathname, isAboutNavLinkActive]);

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
                  {navLink.dropdown ? (
                    <Dropdown
                      label={navLink.label}
                      className={
                        isAboutNavLinkActive
                          ? "active text-primary border-primary"
                          : "text-gray-950 hover:text-primary"
                      }
                    >
                      {navLink.dropdown.map((dropdown) => (
                        <DropdownItemLink
                          key={dropdown.href}
                          to={dropdown.href}
                        >
                          {dropdown.label}
                        </DropdownItemLink>
                      ))}
                    </Dropdown>
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

function checkIsAboutNavLinkActive(pathname: string) {
  return ["/history", "/research", "/team"].includes(pathname);
}

const navLinks = [
  {
    label: "Início",
    href: "./",
  },
  {
    label: "Sobre",
    dropdown: [
      {
        label: "História",
        href: "./history",
      },
      {
        label: "Pesquisa",
        href: "./research",
      },
      {
        label: "Equipe",
        href: "./team",
      },
    ],
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
