import { Link } from "@remix-run/react";
import { Container } from "./Container";
import { IconYoutube } from "./icons/IconYoutube";
import { IconInstagram } from "./icons/IconInstagram";
import { IconFacebook } from "./icons/IconFacebook";
import { ExternalLink } from "./Link";
import { RootQuery } from "~/graphql/generated";
import { useTranslation } from "react-i18next";

interface FooterProps {
  company?: RootQuery["company"];
}

export function Footer(props: FooterProps) {
  const { company } = props;

  const { t } = useTranslation();

  return (
    <footer className="bg-primary-light text-white py-12 lg:pt-20 lg:pb-24">
      <Container>
        <div className="flex items-start flex-col lg:flex-row justify-between">
          <div className="flex flex-col gap-10 items-start mb-12 lg:mb-0">
            <Link to="./">
              <img
                src="/assets/logo-light.png"
                alt="Logo"
                className="h-auto w-[60%] lg:h-[5.75rem] lg:w-auto"
              />
            </Link>
            {company && (
              <nav>
                <ul className="flex gap-6">
                  <li>
                    <ExternalLink to={company.facebookUrl} className="group">
                      <IconFacebook className="size-9 fill-white group-hover:fill-gray-200 transition-all" />
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink to={company.instagramUrl} className="group">
                      <IconInstagram className="size-9 fill-white group-hover:fill-gray-200 transition-all" />
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink to={company.youtubeUrl} className="group">
                      <IconYoutube className="size-9 fill-white group-hover:fill-gray-200 transition-all" />
                    </ExternalLink>
                  </li>
                </ul>
              </nav>
            )}
          </div>
          <div className="flex items-start gap-[7.5rem]">
            <nav className="flex-col items-start gap-6 hidden lg:flex">
              <span className="font-semibold">
                {t("Footer.aboutSectionLabel")}
              </span>
              <Link to="./history" className="underline">
                {t("Header.historyNavLinkLabel")}
              </Link>
              <Link to="./research" className="underline">
                {t("Header.researchNavLinkLabel")}
              </Link>
              <Link to="./team" className="underline">
                {t("Header.teamNavLinkLabel")}
              </Link>
            </nav>
            <nav className="flex-col items-start gap-6 hidden lg:flex">
              <span className="font-semibold">
                {t("Footer.contentSectionLabel")}
              </span>
              <Link to="./publications" className="underline">
                {t("Header.publicationsNavLinkLabel")}
              </Link>
              <Link to="./events" className="underline">
                {t("Header.eventsNavLinkLabel")}
              </Link>
              <Link to="./actions" className="underline">
                {t("Header.actionsNavLinkLabel")}
              </Link>
              <Link to="./projects" className="underline">
                {t("Header.projectsNavLinkLabel")}
              </Link>
            </nav>
            {company && (
              <nav className="flex flex-col items-start gap-6">
                <span className="font-semibold">
                  {t("Footer.contactSectionLabel")}
                </span>
                <span>{company.phone}</span>
                <span>{company.email}</span>
                <span>{company.address}</span>
              </nav>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
