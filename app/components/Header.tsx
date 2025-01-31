import { Link, NavLink, useLocation } from "@remix-run/react";
import { Button } from "./Button";
import { Container } from "./Container";
import { useEffect, useRef, useState } from "react";
import { IconSearch, IconChevronDown } from "./icons";
import {
  Dropdown,
  DropdownButton,
  DropdownItemButton,
  DropdownItemLink,
  DropdownMenu,
} from "./Dropdown";
import { twMerge } from "tailwind-merge";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { TextInput } from "./form-fields/TextInput";

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
            <img src="/assets/logo-dark.png" alt="Logo" className="h-[40px]" />
          </Link>

          <nav className="relative" ref={navRef}>
            <ul className="flex flex-row items-center gap-8">
              {navLinks.map((navLink) => (
                <li key={navLink.href} className="font-medium">
                  {navLink.dropdown ? (
                    <Dropdown>
                      <DropdownButton
                        className={twMerge(
                          `inline-flex items-center gap-1 focus:outline-none data-[hover]:text-primary data-[open]:text-primary data-[focus]:outline-1 data-[focus]:outline-white`,
                          isAboutNavLinkActive
                            ? "active text-primary border-primary"
                            : "text-gray-950 hover:text-primary"
                        )}
                      >
                        {navLink.label}
                        <IconChevronDown className="size-6 -mr-2" />
                      </DropdownButton>
                      <DropdownMenu anchorGap={18}>
                        {navLink.dropdown.map((dropdown) => (
                          <DropdownItemLink
                            key={dropdown.href}
                            to={dropdown.href}
                          >
                            {dropdown.label}
                          </DropdownItemLink>
                        ))}
                      </DropdownMenu>
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
                <Dropdown>
                  <DropdownButton>
                    {/* {({ active }) => ( */}
                    <Button size="md" skin="ghost" className="gap-2 px-3">
                      <span>PT</span>
                      <IconChevronDown className="size-6" />
                    </Button>
                    {/* )} */}
                  </DropdownButton>
                  <DropdownMenu>
                    <DropdownItemButton>Português</DropdownItemButton>
                    <DropdownItemButton>English</DropdownItemButton>
                    <DropdownItemButton>Español</DropdownItemButton>
                  </DropdownMenu>
                </Dropdown>
              </li>
              <li>
                <Popover className="relative">
                  <PopoverButton>
                    <Button size="md" skin="ghost" className="w-[44px] px-0">
                      <IconSearch className="size-6" />
                    </Button>
                  </PopoverButton>
                  <PopoverPanel
                    anchor="bottom end"
                    className={`z-20 rounded-xl p-4 bg-white shadow-custom-2 flex transition duration-100 ease-out [--anchor-gap:8px]`}
                  >
                    <TextInput
                      name="a"
                      Icon={IconSearch}
                      placeholder="Busque pelo site"
                    />
                  </PopoverPanel>
                </Popover>
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
