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

const query = gql`
  query Root {
    sectionContents(where: { section: { equals: HOME_HERO } }) {
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
  const { sectionContents, company } = await client.request<RootQuery>(query);

  return json({ company, heroSection: sectionContents?.[0], url: request.url });
}

export default function App() {
  const { company } = useLoaderData<typeof loader>();

  return (
    <Document company={company}>
      <Outlet />
    </Document>
  );
}

function Document({
  children,
  company,
}: {
  children: React.ReactNode;
  company?: RootQuery["company"];
}) {
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

export function ErrorBoundary() {
  return (
    <Document>
      <DefaultErrorBoundary />;
    </Document>
  );
}
