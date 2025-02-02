import { Link, NavLink, useLocation } from "@remix-run/react";
import { Button } from "./Button";
import { Container } from "./Container";
import { Fragment, useEffect, useRef, useState } from "react";
import { IconSearch, IconChevronDown } from "./icons";
import {
  Dropdown,
  DropdownButton,
  DropdownItemButton,
  DropdownItemLink,
  DropdownMenu,
} from "./Dropdown";
import { twMerge } from "tailwind-merge";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { TextInput } from "./form-fields/TextInput";
import { IconMenu } from "./icons/IconMenu";
import clsx from "clsx";

export function Header() {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isPageOnTop, setIsPageOnTop] = useState(true);
  const [isAboutNavLinkActive, setIsAboutNavLinkActive] = useState(
    checkIsAboutNavLinkActive(location.pathname)
  );
  const navRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
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
      className={twMerge(
        clsx(
          "flex items-center justify-center w-full h-20 z-10 fixed top-0 left-0 bg-white",
          isHeaderVisible ? "translate-y-0" : "-translate-y-full",
          !isPageOnTop && "shadow-custom-1 transition-transform duration-300"
        )
      )}
    >
      <Container>
        <div className="flex flex-row items-center justify-between">
          <button
            className="lg:hidden h-[5rem] w-[3.5rem] -ml-4 flex items-center justify-center"
            onClick={() => setIsMobileSidebarOpen((prevValue) => !prevValue)}
          >
            <IconMenu />
          </button>

          <Link to="./">
            <img
              src="/assets/logo-dark.png"
              alt="Logo"
              className="h-[2.5rem]"
            />
          </Link>

          <div className="w-[3.5rem] lg:hidden" />

          <nav className="relative hidden lg:block" ref={navRef}>
            <ul className="flex flex-row items-center gap-8">
              {navLinks.map((navLink, index) => (
                <li key={index} className="font-medium">
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

          <nav className="hidden lg:block">
            <ul className="flex flex-row items-center gap-2">
              <li>
                <Dropdown>
                  <DropdownButton as={Fragment}>
                    <Button size="md" skin="ghost" hasIcon>
                      <span>PT</span>
                      <IconChevronDown className="size-6" />
                    </Button>
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
                  <PopoverButton as={Fragment}>
                    <Button size="md" skin="ghost" className="w-[2.75rem] px-0">
                      <IconSearch className="size-6" />
                    </Button>
                  </PopoverButton>
                  <PopoverPanel
                    anchor="bottom end"
                    className={`z-20 rounded-xl p-4 bg-white shadow-custom-2 flex transition duration-100 ease-out [--anchor-gap:1rem]`}
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

      <Transition show={isMobileSidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className={"relative z-10"}
          onClose={() => setIsMobileSidebarOpen(false)}
        >
          <DialogBackdrop className="fixed top-[5rem] inset-0 bg-black/30" />

          <div className="fixed inset-y-0 top-[5rem] left-0 flex items-start">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="-translate-x-full opacity-0"
              enterTo="translate-x-0 opacity-100"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-x-0 opacity-100"
              leaveTo="-translate-x-full opacity-0"
            >
              <DialogPanel className="w-[70vw] h-full bg-white p-6 shadow-lg relative">
                <nav className="relative">
                  <ul className="flex flex-col gap-8">
                    {navLinks.map((navLink, index) => (
                      <li key={index} className="font-medium">
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
                </nav>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
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
