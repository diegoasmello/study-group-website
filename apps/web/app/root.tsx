import {
  json,
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { DefaultErrorBoundary } from "./components/DefaultErrorBoundary";
import { metaTags } from "./utils";
import { gql } from "graphql-request";
import { client } from "./lib/graphql-client.server";
import { RootQuery } from "./graphql/generated";
import i18next from "./lib/i18next.server";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const query = gql`
  query Root {
    homeSection {
      id
      title
      content
    }
    company(where: { id: 1 }) {
      id
      title
      address
      email
      phone
      facebookUrl
      instagramUrl
      youtubeUrl
    }
  }
`;

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  return metaTags({
    title: data?.company?.title,
    description: data?.heroSection?.content,
    pathname: location.pathname,
    url: data?.url,
  });
};

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);

  const { homeSection, company } = await client.request<RootQuery>(query);

  return json({
    company,
    heroSection: homeSection,
    url: request.url,
    locale,
  });
}

export const handle = {
  i18n: "translation",
};

export default function App() {
  const { company, locale } = useLoaderData<typeof loader>();

  const { i18n } = useTranslation();
  useChangeLanguage(locale);

  return (
    <Document company={company} lang={locale} dir={i18n.dir()}>
      <Outlet />
    </Document>
  );
}

function Document({
  children,
  company,
  lang = "en",
  dir,
}: {
  children: React.ReactNode;
  company?: RootQuery["company"];
  lang: string;
  dir: string;
}) {
  return (
    <html lang={lang} dir={dir}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="pt-20">
        <Header />
        {children}
        <Footer company={company} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const { i18n } = useTranslation();

  return (
    <Document lang={i18n.language} dir={i18n.dir()}>
      <DefaultErrorBoundary />
    </Document>
  );
}

function useChangeLanguage(locale: string) {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
  }, [locale, i18n]);
}
