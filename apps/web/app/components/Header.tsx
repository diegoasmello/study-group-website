import { Form, Link, NavLink, useLocation } from "@remix-run/react";
import { Button } from "./Button";
import { Container } from "./Container";
import { Fragment, useEffect, useRef, useState } from "react";
import { IconSearch, IconChevronDown, IconClose } from "./icons";
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
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { TextInput } from "./form-fields/TextInput";
import { IconMenu } from "./icons/IconMenu";
import clsx from "clsx";
import { getBreakpoint } from "~/util";

export function Header() {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isPageOnTop, setIsPageOnTop] = useState(true);
  const [breakpoint, setBreakpoint] = useState<number>();
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(
    checkIsAboutMenuOpen(location.pathname),
  );

  useEffect(() => {
    setBreakpoint(Number(getBreakpoint("lg").split("rem")[0]));
  }, []);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
    setIsAboutMenuOpen(checkIsAboutMenuOpen(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = navRef.current?.querySelector(
        ".active",
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
  }, [location.pathname, isAboutMenuOpen]);

  useEffect(() => {
    const updateSidebar = (event: UIEvent) => {
      const target = event?.target as Window;
      const widthInRem = Math.floor(target.innerWidth / 16);
      if (
        target &&
        breakpoint &&
        !isNaN(breakpoint) &&
        widthInRem > breakpoint
      ) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener("resize", updateSidebar);
    return () => window.removeEventListener("resize", updateSidebar);
  }, [breakpoint, isMobileSidebarOpen]);

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
          !isPageOnTop && "shadow-custom-1 transition-transform duration-300",
        ),
      )}
    >
      <Container>
        <div className="flex flex-row items-center justify-between">
          <button
            className="lg:hidden h-[5rem] w-[3.5rem] -ml-4 flex items-center justify-center"
            onClick={() => setIsMobileSidebarOpen((prevValue) => !prevValue)}
          >
            {isMobileSidebarOpen ? (
              <IconClose className="size-6" />
            ) : (
              <IconMenu />
            )}
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
                  {navLink.menu ? (
                    <Dropdown>
                      <DropdownButton
                        className={twMerge(
                          `inline-flex items-center gap-1 focus:outline-hidden data-hover:text-primary data-open:text-primary data-focus:outline-1 data-focus:outline-white`,
                          isAboutMenuOpen
                            ? "active text-primary border-primary"
                            : "text-gray-950 hover:text-primary",
                        )}
                      >
                        {navLink.label}
                        <IconChevronDown className="size-6 -mr-2" />
                      </DropdownButton>
                      <DropdownMenu anchorGap={18}>
                        {navLink.menu.map((item) => (
                          <DropdownItemLink key={item.href} to={item.href}>
                            {item.label}
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
                <Dropdown>
                  <DropdownButton as={Fragment}>
                    <Button size="md" skin="ghost" className="w-[2.75rem] px-0">
                      <IconSearch className="size-6" />
                    </Button>
                  </DropdownButton>
                  <DropdownMenu className="w-auto p-3" anchor="bottom end">
                    <Form action="/search" className="flex gap-2">
                      <TextInput
                        name="q"
                        Icon={IconSearch}
                        placeholder="Busque pelo site"
                        className="w-[14rem]"
                        required
                      />
                      <Button size="md" skin="ghost">
                        Buscar
                      </Button>
                    </Form>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
      <MobileSidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        isAboutMenuOpen={isAboutMenuOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />
    </header>
  );
}

function MobileSidebar({
  isMobileSidebarOpen,
  isAboutMenuOpen,
  setIsMobileSidebarOpen,
}: {
  isMobileSidebarOpen: boolean;
  isAboutMenuOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
}) {
  return (
    <Transition show={isMobileSidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className={"relative z-10 lg:hidden"}
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
            <DialogPanel className="w-[70vw] md:w-[40vw] h-full bg-white p-4 shadow-lg relative">
              <nav className="relative">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((navLink, index) => (
                    <li key={index} className="font-medium">
                      {navLink.menu ? (
                        <Disclosure defaultOpen={isAboutMenuOpen}>
                          {({ open }) => (
                            <Fragment>
                              <DisclosureButton
                                className={twMerge(
                                  "h-[2.75rem] w-full px-4 flex items-center gap-2 rounded-lg data-open:mb-2",
                                )}
                              >
                                {navLink.label}
                                <IconChevronDown
                                  className={clsx(
                                    "size-6 -mr-2 transition-all",
                                    open && "rotate-180",
                                  )}
                                />
                              </DisclosureButton>
                              <DisclosurePanel
                                className="grid gap-2 origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
                                transition
                              >
                                {navLink.menu.map((item) => (
                                  <NavLink
                                    key={item.href}
                                    to={item.href}
                                    className={({ isActive }) =>
                                      twMerge(
                                        "h-[2.75rem] w-full px-4 flex items-center rounded-lg",
                                        isActive
                                          ? "bg-primary-lighter text-primary"
                                          : "text-gray-950 hover:text-primary",
                                      )
                                    }
                                  >
                                    {item.label}
                                  </NavLink>
                                ))}
                              </DisclosurePanel>
                            </Fragment>
                          )}
                        </Disclosure>
                      ) : (
                        <NavLink
                          className={({ isActive }) =>
                            twMerge(
                              "h-[2.75rem] w-full px-4 flex items-center rounded-lg",
                              isActive
                                ? "bg-primary-lighter text-primary"
                                : "text-gray-950 hover:text-primary",
                            )
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
  );
}

function checkIsAboutMenuOpen(pathname: string) {
  return ["/history", "/research", "/team"].includes(pathname);
}

const navLinks = [
  {
    label: "Home",
    href: "./",
  },
  {
    label: "About",
    menu: [
      {
        label: "History",
        href: "./history",
      },
      {
        label: "Research",
        href: "./research",
      },
      {
        label: "Team",
        href: "./team",
      },
    ],
  },
  {
    label: "Publications",
    href: "./publications",
  },
  {
    label: "Events",
    href: "./events",
  },
  {
    label: "Actions",
    href: "./actions",
  },
  {
    label: "Projects",
    href: "./projects",
  },
];
