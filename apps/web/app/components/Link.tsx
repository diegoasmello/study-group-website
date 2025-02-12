import {
  LinkProps as RemixLinkProps,
  Link as RemixLink,
} from "@remix-run/react";
import {} from "@remix-run/react/dist/components";
import { twMerge } from "tailwind-merge";

interface LinkProps extends RemixLinkProps {}

export function Link(props: LinkProps) {
  const { className, ...rest } = props;

  return <RemixLink className={twMerge(linkStyles, className)} {...rest} />;
}

interface ExternalLinkProps
  extends Omit<React.ComponentProps<"a">, "target" | "rel" | "href"> {
  to: string;
  children: React.ReactNode;
}

export function ExternalLink(props: ExternalLinkProps) {
  const { to, children, className, ...rest } = props;

  return (
    <a
      target="_blank"
      rel="noreferrer"
      className={twMerge(linkStyles, className)}
      href={to}
      {...rest}
    >
      {children}
    </a>
  );
}

const linkStyles =
  "flex items-center gap-1 rounded-lg underline text-primary fill-primary-100 hover:text-primary-dark hover:fill-primary-dark active:text-primary-darker active:fill-primary-darker focus:outline-hidden focus:shadow-focus";
