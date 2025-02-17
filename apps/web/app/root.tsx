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
import { Sections } from "@prisma/client";
import { prisma } from "~/lib/prisma.server";
import { metaTags } from "./utils";

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
  const heroSection = await prisma.sectionsContent.findFirst({
    where: {
      section: Sections.HOME_HERO,
    },
  });
  const company = await prisma.company.findFirst({
    where: {
      id: 1,
    },
  });
  return json({ company, heroSection, url: request.url });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { company } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
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

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return <DefaultErrorBoundary />;
}
