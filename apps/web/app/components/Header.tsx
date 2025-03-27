import {
  Form,
  Link,
  NavLink,
  useLocation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
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
import { flags } from "~/flags";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "~/utils/use-mobile";

export function Header() {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const submit = useSubmit();
  const [indicatorStyle, setIndicatorStyle] = useState<{
    width?: string;
    left?: string;
  }>({});
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isPageOnTop, setIsPageOnTop] = useState(true);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(
    checkIsAboutMenuOpen(location.pathname),
  );
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const searchInputDefaultValue =
    location.pathname === "/search" ? (searchParams.get("q") ?? "") : "";

  const onSearchButton = () => {
    setTimeout(() => {
      document.getElementById("search-input")?.focus();
    });
  };

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
      } else {
        setIndicatorStyle((prev) => ({
          width: `0px`,
          left: prev.left,
        }));
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [location.pathname, isAboutMenuOpen]);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [isMobile]);

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
        <div className="grid grid-cols-[1fr_2fr_1fr] items-center justify-between">
          <Button
            size="md"
            skin="ghost"
            className="w-[2.75rem] px-0 lg:hidden"
            onClick={() => setIsMobileSidebarOpen((prevValue) => !prevValue)}
          >
            {isMobileSidebarOpen ? (
              <IconClose className="size-6" />
            ) : (
              <IconMenu />
            )}
          </Button>

          <Link to="./" className="flex justify-center lg:justify-start">
            <img
              src="/assets/logo-dark.png"
              alt="Logo"
              className="w-[8.75rem]"
            />
          </Link>

          <nav className="relative hidden lg:flex justify-center" ref={navRef}>
            <ul className="flex flex-row items-center gap-8">
              {navLinks.map((navLink, index) => (
                <li key={index} className="font-medium">
                  {navLink.menu ? (
                    <Dropdown>
                      <DropdownButton
                        className={twMerge(
                          `cursor-pointer inline-flex items-center gap-1 focus:outline-hidden data-hover:text-primary data-open:text-primary data-focus:outline-1 data-focus:outline-white`,
                          isAboutMenuOpen
                            ? "active text-primary border-primary"
                            : "text-gray-950 hover:text-primary",
                        )}
                      >
                        {t(`Header.${navLink.localeMessageKey}`)}
                        <IconChevronDown className="size-6 -mr-2" />
                      </DropdownButton>
                      <DropdownMenu anchorGap={18}>
                        {navLink.menu.map((item) => (
                          <DropdownItemLink key={item.href} to={item.href}>
                            {t("Header." + item.localeMessageKey)}
                          </DropdownItemLink>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <NavLink
                      className={({ isActive }) =>
                        isActive && location.pathname !== "/search"
                          ? "active text-primary border-primary"
                          : "text-gray-950 hover:text-primary"
                      }
                      to={navLink.href!}
                    >
                      {t(`Header.${navLink.localeMessageKey}`)}
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

          <nav className="flex justify-end">
            <ul className="flex flex-row items-center gap-2">
              {flags.INTERNATIONALIZATION_ENABLED && (
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
              )}
              <li>
                <Dropdown>
                  <DropdownButton as={Fragment}>
                    <Button
                      size="md"
                      skin="ghost"
                      className="w-[2.75rem] px-0"
                      onClick={onSearchButton}
                      onKeyDown={(e) =>
                        (e.code === "Enter" || e.code === "Space") &&
                        onSearchButton()
                      }
                    >
                      <IconSearch className="size-6" />
                    </Button>
                  </DropdownButton>
                  <DropdownMenu className="w-auto p-3" anchor="bottom end">
                    <Form
                      id="search-form"
                      action="/search"
                      className="flex gap-2"
                      onKeyDown={(e) =>
                        e.code === "Enter" && submit(e.currentTarget)
                      }
                    >
                      <TextInput
                        name="q"
                        id="search-input"
                        Icon={IconSearch}
                        placeholder={t("Header." + "searchInputPlaceholder")}
                        className="w-[14rem]"
                        required
                        defaultValue={searchInputDefaultValue}
                      />
                      <Button type="submit" size="md" skin="ghost">
                        {t("Header." + "searchButtonLabel")}
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
  const { t } = useTranslation();
  // const location = useLocation();
  // const [prevLocation, setPrevLocation] = useState(location.pathname);
  const [navigated, setNavigated] = useState(false);

  // useEffect(() => {});

  // const onClose = () => {
  //   setIsMobileSidebarOpen(false);
  // };

  // const onMobileNavLinkClick = () => {
  //   setTimeout(() => {
  //     window.scrollTo(0, 0);
  //   }, 400);
  // };

  const onMobileNavLinkClick = () => {
    setNavigated(true);
  };

  const afterLeave = () => {
    if (navigated) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 400);
      setNavigated(false);
    }
  };

  return (
    <Transition
      show={isMobileSidebarOpen}
      as={Fragment}
      afterLeave={afterLeave}
    >
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
                                {t(`Header.${navLink.localeMessageKey}`)}
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
                                    onClick={onMobileNavLinkClick}
                                    className={({ isActive }) =>
                                      twMerge(
                                        "h-[2.75rem] w-full px-4 flex items-center rounded-lg",
                                        isActive
                                          ? "bg-primary-lighter text-primary"
                                          : "text-gray-950 hover:text-primary",
                                      )
                                    }
                                  >
                                    {t("Header." + item.localeMessageKey)}
                                  </NavLink>
                                ))}
                              </DisclosurePanel>
                            </Fragment>
                          )}
                        </Disclosure>
                      ) : (
                        <NavLink
                          onClick={onMobileNavLinkClick}
                          preventScrollReset
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
                          {t(`Header.${navLink.localeMessageKey}`)}
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
    href: "./",
    localeMessageKey: "homeNavLinkLabel",
  },
  {
    localeMessageKey: "aboutNavLinkLabel",
    menu: [
      {
        href: "./history",
        localeMessageKey: "historyNavLinkLabel",
      },
      {
        href: "./research",
        localeMessageKey: "researchNavLinkLabel",
      },
      {
        href: "./team",
        localeMessageKey: "teamNavLinkLabel",
      },
    ],
  },
  {
    href: "./publications",
    localeMessageKey: "publicationsNavLinkLabel",
  },
  {
    href: "./events",
    localeMessageKey: "eventsNavLinkLabel",
  },
  {
    href: "./actions",
    localeMessageKey: "actionsNavLinkLabel",
  },
  {
    href: "./projects",
    localeMessageKey: "projectsNavLinkLabel",
  },
];
